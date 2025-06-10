import React, { useState } from "react";
import "../styles/component.css";
import ScanForm from './scanform';
import Results from './results';
import '../styles/component.css';


const SecurityScanner = () => {
  const [url, setUrl] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const isValidUrl = (str) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,})" +
        "(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?(\\#[-a-zA-Z\\d_]*)?$",
      "i"
    );
    return pattern.test(str);
  };

  const handleScan = async () => {
    if (!isValidUrl(url)) {
      alert("❌ Please enter a valid website URL.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setScanResult(data);
    } catch (error) {
      alert("🚨 Error scanning website. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="scanner-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">🔍 SinnisterScan</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>

      {/* Scanner Section */}
      <div className="scanner-content">
        <h1>Website Security Scanner</h1>
        <p>Enter a website URL to check for vulnerabilities.</p>

        <div className="input-container">
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input"
          />
          <button onClick={handleScan} className="scan-button" disabled={loading}>
            {loading ? "Scanning..." : "Scan"}
          </button>
        </div>

        {/* Scan Results */}
        {scanResult && (
          <div className="results-card">
            <h2>📊 Scan Report</h2>
            <p><strong>Status:</strong> {scanResult.status}</p>
            <p><strong>URL:</strong> {scanResult.url}</p>
            <h3>Vulnerabilities:</h3>
            <ul>
              {scanResult.vulnerabilities.length > 0 ? (
                scanResult.vulnerabilities.map((vuln, index) => (
                  <li key={index}>⚠️ {vuln}</li>
                ))
              ) : (
                <p>✅ No vulnerabilities detected</p>
              )}
            </ul>

            <RiskMeter riskLevel={scanResult.riskLevel} />
          </div>
        )}
      </div>
    </div>
  );
};

const RiskMeter = ({ riskLevel }) => {
  const riskColors = {
    low: "🟢 Low",
    medium: "🟡 Medium",
    high: "🔴 High",
  };

  return (
    <div className="risk-meter">
      <h3>Risk Level: {riskColors[riskLevel]}</h3>
      <div className={`risk-bar ${riskLevel}`} />
    </div>
  );
};

export default SecurityScanner;
