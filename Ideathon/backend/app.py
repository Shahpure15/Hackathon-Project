from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Function to calculate risk level dynamically
def get_risk_level(vulnerabilities):
    if not vulnerabilities:
        return "low"
    if len(vulnerabilities) < 3:
        return "medium"
    return "high"

@app.route('/scan', methods=['POST'])
def scan_website():
    data = request.get_json()
    url = data.get("url")

    # Example vulnerability detection logic
    vulnerabilities = []
    if "moodle" in url:
        vulnerabilities.append("SQL Injection")
        vulnerabilities.append("XSS")

    risk_level = get_risk_level(vulnerabilities)

    return jsonify({
        "status": "Scan Completed",
        "url": url,
        "vulnerabilities": vulnerabilities,
        "riskLevel": risk_level
    })

if __name__ == "__main__":
    app.run(debug=True)
