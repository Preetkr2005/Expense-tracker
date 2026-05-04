import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# Load dataset
df = pd.read_excel("final_expense_dataset.xlsx")

X = df["transaction_text"]
y = df["category"]

# Split data FIRST
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Vectorize
vectorizer = TfidfVectorizer(
    ngram_range=(1, 2),
    max_features=5000,
    stop_words='english'
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Train model
model = LogisticRegression(max_iter=1000)
model.fit(X_train_vec, y_train)

# ✅ ADD ACCURACY HERE
accuracy = model.score(X_test_vec, y_test)
print("🔥 Improved Accuracy:", accuracy)

# Save model
joblib.dump(model, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("✅ Model trained successfully!")

# Load model
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

while True:
    user_input = input("\nEnter transaction (or type 'exit'): ")

    if user_input.lower() == "exit":
        break

    input_vector = vectorizer.transform([user_input])

    # Prediction
    prediction = model.predict(input_vector)

    # Confidence
    prob = model.predict_proba(input_vector)

    print("👉 Category:", prediction[0])
    print("🔥 Confidence:", round(max(prob[0]) * 100, 2), "%")
