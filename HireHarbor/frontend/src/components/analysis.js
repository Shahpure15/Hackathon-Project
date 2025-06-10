import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import JobList from './joblist';

const Analysis = ({ analysisData }) => {
  const {
    name,
    email,
    inputSkills,
    scannedSkills,
    combinedSkills,
    resumeText,
    jobs,
    allKnownSkills
  } = analysisData;
  
  // Prepare initial selected skills from the combined skills.
  const initialOptions = combinedSkills.map(skill => ({ value: skill, label: skill }));
  const [selectedSkills, setSelectedSkills] = useState(initialOptions);

  // Build dropdown options from all known skills.
  const dropdownOptions = allKnownSkills.map(skill => ({ value: skill, label: skill }));

  return (
    <div className="analysis-page">
      <h2>Resume Analysis</h2>
      
      <div>
        <h3>Candidate Details:</h3>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
      
      <div>
        <h3>Scanned Skills (from resume):</h3>
        {scannedSkills.length > 0 ? (
          <ul>
            {scannedSkills.map((skill, idx) => <li key={idx}>{skill}</li>)}
          </ul>
        ) : (
          <p>No skills could be extracted from your resume. Please add manually below.</p>
        )}
      </div>
      
      <div>
        <h3>Matched Jobs:</h3>
        {jobs.length === 0 ? (
          <p>No matching jobs found.</p>
        ) : (
          <JobList jobs={jobs} />
        )}
      </div>
      
      <div>
        <h3>Confirm or Add Additional Skills</h3>
        <p>
          The system has scanned your resume. You can now review the skills and add any missing ones.
        </p>
        <CreatableSelect
          isMulti
          options={dropdownOptions}
          value={selectedSkills}
          onChange={setSelectedSkills}
          placeholder="Select or create skills..."
        />
      </div>
      
      <div>
        <h3>Extracted Resume Text (for debugging):</h3>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{resumeText}</pre>
      </div>
    </div>
  );
};

export default Analysis;
