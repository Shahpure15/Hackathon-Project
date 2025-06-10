import React, { useState } from 'react';

const ScanForm = ({ setScanResult, setLoading, loading }) => {
  const [url, setUrl] = useState('');

  const isValidUrl = (str) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,})' + // domain name
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*' + // port and path
      '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' + // query string
      '(\\#[-a-zA-Z\\d_]*)?$', // fragment locator
      'i'
    );
    return pattern.test(str);
  };

  const handleScan = async () => {
    if (!isValidUrl(url)) {
      alert('❌ Please enter a valid website URL (e.g., https://example.com).');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setScanResult(data);
    } catch (error) {
      console.error('Error scanning website:', error);
      alert('🚨 Error scanning website. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="input-group">
      <input
        type="text"
        className="url-input"
        placeholder="Enter website URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className="scan-button" onClick={handleScan} disabled={loading}>
        {loading ? 'Scanning...' : 'Scan'}
      </button>
    </div>
  );
};

export default ScanForm;
