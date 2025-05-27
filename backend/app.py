from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from tensorflow.keras.models import load_model
from tensorflow.keras import models, layers
from PIL import Image
import numpy as np
import io
from numpy.linalg import norm
import ast
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Get Mongo URI from .env
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client["jtp_task"]
users_collection = db["users"]
products_collection = db["product"]

MODEL_PATH = "model/encoder_model.keras"
INPUT_SHAPE = (32, 32, 3)

def build_encoder(input_shape):
    encoder = models.Sequential([
        layers.Input(shape=input_shape),
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2), padding='same'),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2), padding='same'),
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dense(64, activation='relu'),
        layers.Dense(32, activation='relu')
    ])
    return encoder

autoencoder = load_model(MODEL_PATH)
encoder = build_encoder(INPUT_SHAPE)
for i in range(len(encoder.layers)):
    encoder.layers[i].set_weights(autoencoder.layers[0].layers[i].get_weights())

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image = image.resize((32, 32))
    image_array = np.array(image) / 255.0
    return np.expand_dims(image_array, axis=0)

def extract_features(image_bytes):
    preprocessed = preprocess_image(image_bytes)
    features = encoder.predict(preprocessed, verbose=0)
    return features[0].tolist()

def find_similar_products(features, top_n=5):
    features = np.array(features)
    products = list(products_collection.find())
    similarities = []

    for product in products:
        product_features = product.get("image_features")
        if not product_features:
            continue
        if isinstance(product_features, str):
            try:
                product_features = ast.literal_eval(product_features)
            except Exception:
                continue
        product_features = np.array(product_features)
        if product_features.shape != features.shape:
            continue
        similarity = np.dot(features, product_features) / (norm(features) * norm(product_features) + 1e-10)
        similarities.append((similarity, product))

    similarities.sort(key=lambda x: x[0], reverse=True)
    return [item[1] for item in similarities[:top_n]]

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    username = data.get("username")
    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already exists"}), 400
    users_collection.insert_one({
        "email": email, "password": password,
        "username": username, "search_history": []
    })
    return jsonify({"message": "Signup successful"}), 200

@app.route("/get-username", methods=["GET"])
def get_username():
    email = request.args.get("email")
    user = users_collection.find_one({"email": email})
    if user:
        return jsonify({"username": user.get("username", "")}), 200
    return jsonify({"message": "User not found"}), 404

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    user = users_collection.find_one({"email": email, "password": password})
    if user:
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/recommend", methods=["POST"])
def recommend():
    email = request.form.get("email")
    image_file = request.files.get("image")
    if not image_file or not email:
        return jsonify({"message": "Missing email or image"}), 400

    try:
        image_bytes = image_file.read()
        features = extract_features(image_bytes)
        recommendations = find_similar_products(features, top_n=8)

        if not recommendations:
            return jsonify({"message": "No similar products found"}), 404

        # Prepare results to send to client
        result = [{"product_name": r["productDisplayName"], "image_url": r["link"]} for r in recommendations]

        # Update user's search history by pushing each recommended product separately
        users_collection.update_one(
            {"email": email},
            {"$push": {"search_history": {"$each": result}}}
        )

        return jsonify(result), 200

    except Exception as e:
        print("Error during recommendation:", e)
        return jsonify({"message": "Internal server error"}), 500

@app.route("/history", methods=["GET"])
def history():
    email = request.args.get("email")
    user = users_collection.find_one({"email": email})
    if user:
        return jsonify(user.get("search_history", [])), 200
    return jsonify({"message": "User not found"}), 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=False)