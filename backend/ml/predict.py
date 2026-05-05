import joblib

# Load trained model
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

def predict_category(text):
    input_vector = vectorizer.transform([text])
    
    prediction = model.predict(input_vector)[0]
    prob = model.predict_proba(input_vector)
    confidence = round(max(prob[0]) * 100, 2)

    return prediction, confidence


# Test
if __name__ == "__main__":
    text = input("Enter transaction: ")
    category, confidence = predict_category(text)
    
    print("Category:", category)
    print("Confidence:", confidence, "%")
