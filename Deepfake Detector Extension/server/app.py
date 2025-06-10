import os
import sys
from flask import Flask, request, jsonify

# Ensure Flask finds the 'models' directory
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(BASE_DIR)

from models.deepfake_model import detect_deepfake  # Import after fixing path

app = Flask(__name__)
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/analyze", methods=["POST"])
def analyze():
    if "content" in request.files:
        file = request.files["content"]
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        print(f"File saved at: {file_path}")  # Debugging output

        try:
            result = detect_deepfake(file_path)
            return jsonify({"video": file.filename, "deepfake_probability": result})
        except Exception as e:
            print(f"Error processing video: {str(e)}")  # Debugging output
            return jsonify({"error": f"Failed to process video: {str(e)}"}), 500

    return jsonify({"error": "Invalid request format"}), 400

if __name__ == "__main__":
    app.run(debug=True)
