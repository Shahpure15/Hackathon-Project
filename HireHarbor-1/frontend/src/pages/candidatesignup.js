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
    jobTypePreference: 'Full-time',
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
  const [activeSection, setActiveSection] = useState('basic');

  const handleChange = (e, index, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const addSection = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], { ...template }] });
  };

  const removeSection = (section, index) => {
    const updatedSection = [...formData[section]];
    updatedSection.splice(index, 1);
    setFormData({ ...formData, [section]: updatedSection });
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
        role: 'candidate',
      };

      const response = await fetch('http://localhost:5000/api/auth/signup-candidate', {
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
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box2 signup-form">
        <h1 className="signup-title">Create Your Candidate Profile</h1>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-progress">
          <div 
            className={`progress-step ${activeSection === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveSection('basic')}
          >
            Basic Info
          </div>
          <div 
            className={`progress-step ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveSection('skills')}
          >
            Skills
          </div>
          <div 
            className={`progress-step ${activeSection === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveSection('experience')}
          >
            Experience
          </div>
          <div 
            className={`progress-step ${activeSection === 'education' ? 'active' : ''}`}
            onClick={() => setActiveSection('education')}
          >
            Education
          </div>
          <div 
            className={`progress-step ${activeSection === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveSection('preferences')}
          >
            Preferences
          </div>
          <div 
            className={`progress-step ${activeSection === 'account' ? 'active' : ''}`}
            onClick={() => setActiveSection('account')}
          >
            Account
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* BASIC INFO */}
          <div className={`form-section ${activeSection === 'basic' ? 'active' : ''}`}>
            <h2>Personal Information</h2>
            <div className="input-row">
              <div className="input-group">
                <label>First Name</label>
                <input 
                  placeholder="Enter your first name" 
                  value={formData.firstName} 
                  required
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} 
                />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input 
                  placeholder="Enter your last name" 
                  value={formData.lastName} 
                  required
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} 
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="your.email@example.com" 
                  value={formData.email} 
                  required
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                />
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input 
                  placeholder="Your contact number" 
                  value={formData.phone} 
                  required
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Gender</label>
                <select 
                  value={formData.gender} 
                  required
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="input-group">
                <label>Date of Birth</label>
                <input 
                  type="date" 
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} 
                />
              </div>
            </div>

            <div className="input-group full-width">
              <label>Professional Summary</label>
              <textarea 
                placeholder="Write a brief description about yourself, your experience and career goals"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })} 
              />
            </div>

            <div className="form-nav">
              <button type="button" className="next-btn" onClick={() => setActiveSection('skills')}>Next: Skills</button>
            </div>
          </div>

          {/* SKILLS / LANGUAGES / CERTIFICATIONS */}
          <div className={`form-section ${activeSection === 'skills' ? 'active' : ''}`}>
            <h2>Skills & Qualifications</h2>
            
            <div className="input-group full-width">
              <label>Skills</label>
              <input 
                placeholder="e.g. JavaScript, Project Management, SEO (comma separated)"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })} 
              />
              <small className="form-tip">List your most relevant skills separated by commas</small>
            </div>
            
            <div className="input-group full-width">
              <label>Certifications</label>
              <input 
                placeholder="e.g. AWS Certified, PMP, Google Analytics (comma separated)"
                value={formData.certifications}
                onChange={(e) => setFormData({ ...formData, certifications: e.target.value })} 
              />
            </div>

            <div className="form-nav">
              <button type="button" className="back-btn" onClick={() => setActiveSection('basic')}>Back</button>
              <button type="button" className="next-btn" onClick={() => setActiveSection('experience')}>Next: Experience</button>
            </div>
          </div>

          {/* WORK EXPERIENCE */}
          <div className={`form-section ${activeSection === 'experience' ? 'active' : ''}`}>
            <h2>Work Experience</h2>
            
            {formData.workExperience.map((exp, i) => (
              <div key={i} className="experience-card">
                <h3>Experience {i + 1}</h3>
                <div className="input-row">
                  <div className="input-group">
                    <label>Job Title</label>
                    <input 
                      placeholder="e.g. Software Developer" 
                      name="title" 
                      value={exp.title}
                      onChange={(e) => handleChange(e, i, 'workExperience')} 
                    />
                  </div>
                  <div className="input-group">
                    <label>Company</label>
                    <input 
                      placeholder="e.g. Microsoft" 
                      name="company" 
                      value={exp.company}
                      onChange={(e) => handleChange(e, i, 'workExperience')} 
                    />
                  </div>
                </div>
                
                <div className="input-row">
                  <div className="input-group">
                    <label>Start Date</label>
                    <input 
                      type="date" 
                      name="startDate" 
                      value={exp.startDate}
                      onChange={(e) => handleChange(e, i, 'workExperience')} 
                    />
                  </div>
                  <div className="input-group">
                    <label>End Date</label>
                    <input 
                      type="date" 
                      name="endDate" 
                      value={exp.endDate}
                      onChange={(e) => handleChange(e, i, 'workExperience')} 
                    />
                  </div>
                </div>
                
                <div className="input-group full-width">
                  <label>Job Description</label>
                  <textarea 
                    placeholder="Describe your responsibilities and achievements" 
                    name="description" 
                    value={exp.description}
                    onChange={(e) => handleChange(e, i, 'workExperience')} 
                  />
                </div>
                
                {formData.workExperience.length > 1 && (
                  <button type="button" className="remove-btn" onClick={() => removeSection('workExperience', i)}>
                    Remove this experience
                  </button>
                )}
              </div>
            ))}
            
            <button 
              type="button" 
              className="add-btn" 
              onClick={() => addSection('workExperience', {
                title: '', company: '', startDate: '', endDate: '', description: ''
              })}
            >
              + Add More Experience
            </button>

            <div className="form-nav">
              <button type="button" className="back-btn" onClick={() => setActiveSection('skills')}>Back</button>
              <button type="button" className="next-btn" onClick={() => setActiveSection('education')}>Next: Education</button>
            </div>
          </div>

          {/* EDUCATION */}
          <div className={`form-section ${activeSection === 'education' ? 'active' : ''}`}>
            <h2>Education</h2>
            
            {formData.education.map((edu, i) => (
              <div key={i} className="education-card">
                <h3>Education {i + 1}</h3>
                <div className="input-row">
                  <div className="input-group">
                    <label>Institution</label>
                    <input 
                      placeholder="e.g. Harvard University" 
                      name="institution" 
                      value={edu.institution}
                      onChange={(e) => handleChange(e, i, 'education')} 
                    />
                  </div>
                  <div className="input-group">
                    <label>Degree</label>
                    <input 
                      placeholder="e.g. Bachelor of Science in Computer Science" 
                      name="degree" 
                      value={edu.degree}
                      onChange={(e) => handleChange(e, i, 'education')} 
                    />
                  </div>
                </div>
                
                <div className="input-row">
                  <div className="input-group">
                    <label>Start Year</label>
                    <input 
                      placeholder="e.g. 2018" 
                      name="startYear" 
                      value={edu.startYear}
                      onChange={(e) => handleChange(e, i, 'education')} 
                    />
                  </div>
                  <div className="input-group">
                    <label>End Year (or Expected)</label>
                    <input 
                      placeholder="e.g. 2022" 
                      name="endYear" 
                      value={edu.endYear}
                      onChange={(e) => handleChange(e, i, 'education')} 
                    />
                  </div>
                </div>
                
                {formData.education.length > 1 && (
                  <button type="button" className="remove-btn" onClick={() => removeSection('education', i)}>
                    Remove this education
                  </button>
                )}
              </div>
            ))}
            
            <button 
              type="button" 
              className="add-btn" 
              onClick={() => addSection('education', {
                institution: '', degree: '', startYear: '', endYear: ''
              })}
            >
              + Add More Education
            </button>

            <div className="form-nav">
              <button type="button" className="back-btn" onClick={() => setActiveSection('experience')}>Back</button>
              <button type="button" className="next-btn" onClick={() => setActiveSection('preferences')}>Next: Preferences</button>
            </div>
          </div>

          {/* PREFERENCES */}
          <div className={`form-section ${activeSection === 'preferences' ? 'active' : ''}`}>
            <h2>Job Preferences</h2>
            
            <div className="input-group full-width">
              <label>Job Type Preference</label>
              <select 
                value={formData.jobTypePreference}
                onChange={(e) => setFormData({ ...formData, jobTypePreference: e.target.value })}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            
            <div className="input-row">
              <div className="input-group">
                <label>Location Preference</label>
                <input 
                  placeholder="e.g. Mumbai, Remote, Pan India" 
                  value={formData.locationPreference}
                  onChange={(e) => setFormData({ ...formData, locationPreference: e.target.value })} 
                />
              </div>
              <div className="input-group">
                <label>Industry Preference</label>
                <input 
                  placeholder="e.g. Technology, Healthcare" 
                  value={formData.industryPreference}
                  onChange={(e) => setFormData({ ...formData, industryPreference: e.target.value })} 
                />
              </div>
            </div>
            
            <div className="input-row">
              <div className="input-group">
                <label>Salary Expectation (₹)</label>
                <input 
                  type="number" 
                  placeholder="Annual salary in ₹" 
                  value={formData.salaryExpectation}
                  onChange={(e) => setFormData({ ...formData, salaryExpectation: e.target.value })} 
                />
              </div>
              <div className="input-group">
                <label>Resume Link</label>
                <input 
                  placeholder="Google Drive or other cloud link" 
                  value={formData.resumeLink}
                  onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })} 
                />
              </div>
            </div>

            <div className="form-nav">
              <button type="button" className="back-btn" onClick={() => setActiveSection('education')}>Back</button>
              <button type="button" className="next-btn" onClick={() => setActiveSection('account')}>Next: Account Setup</button>
            </div>
          </div>

          {/* ACCOUNT SETUP */}
          <div className={`form-section ${activeSection === 'account' ? 'active' : ''}`}>
            <h2>Account Setup</h2>
            
            <div className="input-group full-width">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Create a strong password" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
              />
              <small className="form-tip">Use at least 8 characters with letters, numbers and symbols</small>
            </div>
            
            <div className="input-group full-width">
              <label>Confirm Password</label>
              <input 
                type="password" 
                placeholder="Re-enter your password" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
              />
            </div>
            
            <div className="terms-container">
              <label className="checkbox-label">
                <input 
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })} 
                />
                <span>I accept the <a href="/terms" target="_blank">terms and conditions</a></span>
              </label>
            </div>

            <div className="form-nav">
              <button type="button" className="back-btn" onClick={() => setActiveSection('preferences')}>Back</button>
              <button type="submit" className="next-btn">Complete Registration</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateSignup;
