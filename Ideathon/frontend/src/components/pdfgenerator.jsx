import React from "react";

const PDFGenerator = ({ reportUrl }) => {
  return (
    <div className="pdfgenerator">
      {reportUrl ? (
        <a href={reportUrl} download="Security_Report.pdf">
          Download PDF Report
        </a>
      ) : (
        <p>No report generated yet.</p>
      )}
    </div>
  );
};

export default PDFGenerator;
