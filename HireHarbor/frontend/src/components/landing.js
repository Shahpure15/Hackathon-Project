import React, { useState } from 'react';
import axios from 'axios';
import JobList from './joblist';

const LandingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert('Please upload a resume.');
      return;
    }

    // Prepare form data for backend upload
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('skills', formData.skills);
    data.append('resume', resumeFile);

    try {
      const response = await axios.post('http://localhost:5000/api/resume/upload', data);
      setJobs(response.data.jobs);
      setSubmitted(true);
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  if (submitted) {
    return (
      <div className="result">
        <h2>Matched Jobs</h2>
        <JobList jobs={jobs} />
      </div>
    );
  }

  return (
    <div className="landing-page">
      <h1>Job Seeker Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" type="text" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Skills (comma separated):</label>
          <input name="skills" type="text" value={formData.skills} onChange={handleChange} required />
        </div>
        <div>
          <label>Upload Resume:</label>
          <input name="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LandingPage;
