# Visual Summary
- Downloaded the dataset and performed preprocessing to split it into training and testing sets.

- Trained an AutoEncoder model on the training set and saved the model for future use.

- Used the saved AutoEncoder model to extract features from all images in the dataset.

- Saved the extracted features along with metadata (e.g., filename, product display name, etc.) into a CSV file.

- Uploaded the CSV file containing image features and metadata to a MongoDB Atlas database.

- Fields in the database include: \_id, filename, link, productDisplayName, and image_features.

- Developed a basic application using React (frontend) and Flask (backend).

- The app allows users to upload images after successful authentication.

- Upon upload, the saved AutoEncoder model extracts features from the uploaded image.

- Cosine similarity is calculated between the uploaded image's features and those stored in the database.

- The top N most similar images are displayed as recommendations, showing the product image and name.

- Each recommendation is saved as a history entry in the database.

- When the user logs in again, previously viewed recommendations are shown from the history.
