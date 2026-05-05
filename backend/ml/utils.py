import joblib
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load both model AND vectorizer
model = joblib.load(os.path.join(BASE_DIR, "model.pkl"))
vectorizer = joblib.load(os.path.join(BASE_DIR, "vectorizer.pkl"))

def predict_category(title):
    title = title.lower().strip()  # optional but good

    transformed = vectorizer.transform([title])  # now defined
    prediction = model.predict(transformed)[0]

    return prediction