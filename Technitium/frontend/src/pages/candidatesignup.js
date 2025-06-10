import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/auth.css';

const CandidateSignup = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    summary: '',
    skills: '',
    certifications: '',
    languages: '',
    jobTypePreference: '',
    locationPreference: '',
    salaryExpectation: '',
    industryPreference: '',
    resumeLink: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    workExperience: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
    education: [{ institution: '', degree: '', startYear: '', endYear: '' }]
  });
  const [error, setError] = useState('');

  const handleChange = (e, index, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const addSection = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], { ...template }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (!formData.termsAccepted) {
      setError('You must accept the terms and conditions!');
      return;
    }

    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map((s) => s.trim()),
        certifications: formData.certifications.split(',').map((c) => c.trim()),
        languages: formData.languages.split(',').map((l) => l.trim()),
        role: 'candidate',
      };

      const response = await fetch('http://localhost:5000/api/candidate/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      history.push('/auth');
    } catch (err) {
      console.error("Error submitting form:", err.response?.data || err.message);
  alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box long-form">
        <h1>Candidate Registration</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* BASIC INFO */}
          <input placeholder="First Name" value={formData.firstName} required
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
          <input placeholder="Last Name" value={formData.lastName} required
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
          <input type="email" placeholder="Email" value={formData.email} required
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input placeholder="Phone" value={formData.phone} required
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          <select value={formData.gender} required
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input type="date" placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} />
          <textarea placeholder="About You (Summary)"
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })} />

          {/* SKILLS / LANGUAGES / CERTIFICATIONS */}
          <input placeholder="Skills (comma separated)"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
          <input placeholder="Certifications (comma separated)"
            value={formData.certifications}
            onChange={(e) => setFormData({ ...formData, certifications: e.target.value })} />
          <input placeholder="Languages (comma separated)"
            value={formData.languages}
            onChange={(e) => setFormData({ ...formData, languages: e.target.value })} />

          {/* WORK EXPERIENCE */}
          <label>Work Experience:</label>
          {formData.workExperience.map((exp, i) => (
            <div key={i} className="nested-group">
              <input placeholder="Job Title" name="title" value={exp.title}
                onChange={(e) => handleChange(e, i, 'workExperience')} />
              <input placeholder="Company" name="company" value={exp.company}
                onChange={(e) => handleChange(e, i, 'workExperience')} />
              <input type="date" placeholder="Start Date" name="startDate" value={exp.startDate}
                onChange={(e) => handleChange(e, i, 'workExperience')} />
              <input type="date" placeholder="End Date" name="endDate" value={exp.endDate}
                onChange={(e) => handleChange(e, i, 'workExperience')} />
              <textarea placeholder="Description" name="description" value={exp.description}
                onChange={(e) => handleChange(e, i, 'workExperience')} />
            </div>
          ))}
          <button type="button" onClick={() => addSection('workExperience', {
            title: '', company: '', startDate: '', endDate: '', description: ''
          })}>+ Add More Experience</button>

          {/* EDUCATION */}
          <label>Education:</label>
          {formData.education.map((edu, i) => (
            <div key={i} className="nested-group">
              <input placeholder="Institution" name="institution" value={edu.institution}
                onChange={(e) => handleChange(e, i, 'education')} />
              <input placeholder="Degree" name="degree" value={edu.degree}
                onChange={(e) => handleChange(e, i, 'education')} />
              <input placeholder="Start Year" name="startYear" value={edu.startYear}
                onChange={(e) => handleChange(e, i, 'education')} />
              <input placeholder="End Year" name="endYear" value={edu.endYear}
                onChange={(e) => handleChange(e, i, 'education')} />
            </div>
          ))}
          <button type="button" onClick={() => addSection('education', {
            institution: '', degree: '', startYear: '', endYear: ''
          })}>+ Add More Education</button>

          {/* PREFERENCES */}
          <select value={formData.jobTypePreference}
            onChange={(e) => setFormData({ ...formData, jobTypePreference: e.target.value })}>
            <option value="">Select Job Type Preference</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Remote</option>
            <option>Contract</option>
          </select>
          <input placeholder="Location Preference"
            value={formData.locationPreference}
            onChange={(e) => setFormData({ ...formData, locationPreference: e.target.value })} />
          <input type="number" placeholder="Salary Expectation (in ₹)"
            value={formData.salaryExpectation}
            onChange={(e) => setFormData({ ...formData, salaryExpectation: e.target.value })} />
          <input placeholder="Industry Preference"
            value={formData.industryPreference}
            onChange={(e) => setFormData({ ...formData, industryPreference: e.target.value })} />
          <input placeholder="Resume Drive Link"
            value={formData.resumeLink}
            onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })} />

          {/* PASSWORD */}
          <input type="password" placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <input type="password" placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />

          {/* TERMS */}
          <label>
            <input type="checkbox"
              checked={formData.termsAccepted}
              onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })} />
            I accept the terms and conditions
          </label>

          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default CandidateSignup;
