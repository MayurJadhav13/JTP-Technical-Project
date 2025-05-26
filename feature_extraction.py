import os
import pandas as pd
import numpy as np
from PIL import Image
from tensorflow.keras import models, layers
from tensorflow.keras.models import load_model

# === CONFIG ===
INPUT_CSV = "metadata.csv"
IMAGE_FOLDER = "fashion-dataset/images"
MODEL_PATH = "backend/model/encoder_model.keras"
OUTPUT_CSV = "backend/output_features.csv"
TARGET_SIZE = (32, 32)
INPUT_SHAPE = TARGET_SIZE + (3,)  # RGB

# === Step 1: Rebuild Encoder ===
def build_encoder(input_shape):
    encoder = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', padding='same', input_shape=input_shape),
        layers.MaxPooling2D((2, 2), padding='same'),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2), padding='same'),
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dense(64, activation='relu'),
        layers.Dense(32, activation='relu')  # Latent vector
    ])
    return encoder

# === Step 2: Load Autoencoder and Extract Encoder Weights ===
print("Loading trained autoencoder...")
autoencoder = load_model(MODEL_PATH)
encoder = build_encoder(INPUT_SHAPE)

print("Transferring encoder weights...")
for i in range(len(encoder.layers)):
    encoder.layers[i].set_weights(autoencoder.layers[0].layers[i].get_weights())

# === Step 3: Image Preprocessing ===
def preprocess_image(image_path, target_size=(32, 32)):
    try:
        img = Image.open(image_path).convert('RGB')
        img = img.resize(target_size)
        img_array = np.array(img) / 255.0
        return img_array
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        return None

# === Step 4: Load CSV & Extract Features ===
df = pd.read_csv(INPUT_CSV)
image_features = []

print("Extracting image features...")
for filename in df['filename']:
    local_path = os.path.join(IMAGE_FOLDER, filename)
    img = preprocess_image(local_path, target_size=TARGET_SIZE)
    if img is not None:
        img = np.expand_dims(img, axis=0)  # Add batch dim
        features = encoder.predict(img, verbose=0)[0].tolist()
        image_features.append(features)
    else:
        image_features.append(None)

df['image_features'] = image_features

# === Step 5: Save Output CSV ===
df.to_csv(OUTPUT_CSV, index=False)
print(f"Features saved to: {OUTPUT_CSV}")