import React from 'react';

const Results = ({ data }) => {
  return (
    <div className="results-card">
      <h2>Scan Report</h2>
      <p><strong>Status:</strong> {data.status}</p>
      <p><strong>URL:</strong> {data.url}</p>
      <h3>Vulnerabilities Detected:</h3>
      {data.vulnerabilities && data.vulnerabilities.length > 0 ? (
        <ul className="vulnerability-list">
          {data.vulnerabilities.map((vuln, index) => (
            <li key={index}>⚠️ {vuln}</li>
          ))}
        </ul>
      ) : (
        <p>No vulnerabilities detected 🎉</p>
      )}
    </div>
  );
};

export default Results;
