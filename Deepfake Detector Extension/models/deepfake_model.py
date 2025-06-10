import torch
import cv2
import numpy as np

# Load the pretrained deepfake detection model
MODEL_PATH = "models/deepfake_model.pth"  # Ensure you have a trained model
model = torch.load(MODEL_PATH, map_location=torch.device('cpu'))
model.eval()

def detect_deepfake(video_path):
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        return {"error": f"Cannot open video {video_path}"}

    frames = []
    frame_count = 0

    while frame_count < 10:  # Analyze first 10 frames
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.resize(frame, (224, 224))  # Resize for model
        frame = np.transpose(frame, (2, 0, 1))  # Convert to CHW format
        frame = frame / 255.0  # Normalize
        frames.append(frame)
        frame_count += 1

    cap.release()

    if len(frames) == 0:
        return {"error": "No frames read from video"}

    # Convert to tensor
    input_tensor = torch.tensor([frames], dtype=torch.float32)

    # Predict deepfake probability
    with torch.no_grad():
        prediction = model(input_tensor)
        deepfake_prob = torch.sigmoid(prediction).item()

    return {"deepfake_score": round(deepfake_prob, 2)}
