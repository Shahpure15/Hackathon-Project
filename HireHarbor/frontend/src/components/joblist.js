import React from 'react';

const JobList = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return <p>No matching jobs found.</p>;
  }

  return (
    <ul>
      {jobs.map((job) => (
        <li key={job.id}>
          <h4>{job.title}</h4>
          <p>Required Skills: {job.requiredSkills.join(', ')}</p>
        </li>
      ))}
    </ul>
  );
};

export default JobList;
