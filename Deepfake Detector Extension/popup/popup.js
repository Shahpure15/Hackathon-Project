chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let container = document.getElementById("content-list");
    container.innerHTML = "";

    message.detectedElements.forEach((item) => {
        let btn = document.createElement("button");
        btn.innerText = `Analyze ${item.type}`;
        btn.onclick = () => analyzeContent(item.type, item.id);
        container.appendChild(btn);
    });
});

function analyzeContent(type, id) {
    document.getElementById("loading").style.display = "block";

    fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: type, id: id })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("result").innerText = `AI Likelihood: ${data.percentage}%`;
    });
}
document.getElementById('analyze-button').addEventListener('click', () => {
    // Simulate analysis (replace with actual deepfake analysis logic)
    const analysisResult = {
      isDeepfake: true,
      confidence: 85,
      details: "The content shows signs of manipulation with high confidence."
    };
  
    // Display the analysis report
    const reportDiv = document.getElementById('analysis-report');
    reportDiv.innerHTML = `
      <p><strong>Result:</strong> ${analysisResult.isDeepfake ? 'Deepfake Detected' : 'No Deepfake Detected'}</p>
      <p><strong>Confidence:</strong> ${analysisResult.confidence}%</p>
      <p><strong>Details:</strong> ${analysisResult.details}</p>
    `;
  
    // Enable the "View Full Analysis" button
    document.getElementById('details-button').disabled = false;
  });
  
  document.getElementById('details-button').addEventListener('click', () => {
    // Redirect to a full analysis page
    chrome.tabs.create({ url: 'https://your-website.com/full-analysis' });
  });
