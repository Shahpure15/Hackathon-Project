from transformers import pipeline

# Load the model once
classifier = pipeline("text-classification", model="microsoft/MiniLM-L12-H384-uncased")

def detect_social_engineering(text):
    result = classifier(text)
    confidence = result[0]['score']

    return {"social_engineering_risk": round(confidence, 2), "label": result[0]['label']}
