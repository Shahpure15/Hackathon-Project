import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import '../styles/resume.css';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState(null);
  const [template, setTemplate] = useState('modern'); // We can add more templates later
  const [loading, setLoading] = useState(true);
  const resumeRef = useRef();

  useEffect(() => {
    // Fetch user data from localStorage or API
    const fetchData = async () => {
      try {
        // Check if we have any stored resume data
        const storedData = localStorage.getItem('resumeData');
        
        if (storedData) {
          setResumeData(JSON.parse(storedData));
        } else {
          // Fetch from API if no local data (using candidate data from signup)
          const response = await fetch('http://localhost:5000/api/candidates/profile', {
            credentials: 'include',
          });
          
          if (response.ok) {
            const data = await response.json();
            
            // Transform API data to resume format
            const formattedData = {
              personalInfo: {
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                email: data.email || '',
                phone: data.phone || '',
                summary: data.summary || '',
              },
              skills: data.skills || [],
              workExperience: data.workExperience || [],
              education: data.education || [],
              certifications: data.certifications || [],
              preferences: {
                jobType: data.jobTypePreference || '',
                location: data.locationPreference || '',
                salary: data.salaryExpectation || '',
                industry: data.industryPreference || ''
              }
            };
            
            setResumeData(formattedData);
            localStorage.setItem('resumeData', JSON.stringify(formattedData));
          } else {
            // If API fails, initialize with empty data
            initializeEmptyData();
          }
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
        initializeEmptyData();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const initializeEmptyData = () => {
    const emptyData = {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        summary: '',
      },
      skills: [],
      workExperience: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
      education: [{ institution: '', degree: '', startYear: '', endYear: '' }],
      certifications: [],
      preferences: {
        jobType: '',
        location: '',
        salary: '',
        industry: ''
      }
    };
    setResumeData(emptyData);
  };

  const handleChange = (section, field, value, index = null) => {
    setResumeData(prev => {
      const updated = { ...prev };
      
      if (index !== null) {
        // For array fields like workExperience, education
        updated[section][index][field] = value;
      } else if (section === 'personalInfo' || section === 'preferences') {
        // For nested objects
        updated[section][field] = value;
      } else {
        // For direct fields
        updated[section] = value;
      }
      
      return updated;
    });
  };

  const handleSkillsChange = (value) => {
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setResumeData(prev => ({
      ...prev,
      skills: skillsArray
    }));
  };

  const handleCertificationsChange = (value) => {
    const certsArray = value.split(',').map(cert => cert.trim()).filter(cert => cert);
    setResumeData(prev => ({
      ...prev,
      certifications: certsArray
    }));
  };

  const addItem = (section, template) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...template }]
    }));
  };

  const removeItem = (section, index) => {
    setResumeData(prev => {
      const updated = { ...prev };
      updated[section] = [...prev[section]];
      updated[section].splice(index, 1);
      return updated;
    });
  };

  const saveResume = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    alert('Resume saved successfully!');
  };

  const downloadPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    // Add print-specific styling
    element.classList.add('printing');
    
    html2pdf().set(opt).from(element).save().then(() => {
      // Remove print styling after download
      element.classList.remove('printing');
    });
  };

  if (loading) {
    return <div className="loading">Loading resume data...</div>;
  }

  if (!resumeData) {
    return <div className="error">Failed to load resume data</div>;
  }

  const { personalInfo, skills, workExperience, education, certifications, preferences } = resumeData;

  return (
    <div className="resume-builder">
      <div className="resume-controls">
        <h1>Resume Builder</h1>
        
        <div className="template-selector">
          <label>Template: </label>
          <select value={template} onChange={(e) => setTemplate(e.target.value)}>
            <option value="modern">Modern</option>
            <option value="professional">Professional</option>
            <option value="creative">Creative</option>
          </select>
        </div>
        
        <div className="action-buttons">
          <button className="save-btn" onClick={saveResume}>Save Resume</button>
          <button className="download-btn" onClick={downloadPDF}>Download PDF</button>
        </div>
      </div>

      <div className="builder-container">
        <div className="resume-form">
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="input-row">
              <div className="input-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  value={personalInfo.firstName} 
                  onChange={(e) => handleChange('personalInfo', 'firstName', e.target.value)} 
                />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  value={personalInfo.lastName} 
                  onChange={(e) => handleChange('personalInfo', 'lastName', e.target.value)} 
                />
              </div>
            </div>
            
            <div className="input-row">
              <div className="input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={personalInfo.email} 
                  onChange={(e) => handleChange('personalInfo', 'email', e.target.value)} 
                />
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input 
                  type="text" 
                  value={personalInfo.phone} 
                  onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)} 
                />
              </div>
            </div>
            
            <div className="input-group full-width">
              <label>Professional Summary</label>
              <textarea 
                value={personalInfo.summary} 
                onChange={(e) => handleChange('personalInfo', 'summary', e.target.value)}
                rows="4"
              ></textarea>
            </div>
          </div>

          <div className="form-section">
            <h2>Skills</h2>
            <div className="input-group full-width">
              <label>Skills (comma separated)</label>
              <textarea 
                value={skills.join(', ')} 
                onChange={(e) => handleSkillsChange(e.target.value)}
                rows="3"
                placeholder="e.g. JavaScript, Project Management, Communication"
              ></textarea>
            </div>
          </div>

          <div className="form-section">
            <h2>Work Experience</h2>
            {workExperience.map((exp, index) => (
              <div key={index} className="experience-item">
                <h3>Experience {index + 1}</h3>
                <div className="input-row">
                  <div className="input-group">
                    <label>Job Title</label>
                    <input 
                      type="text" 
                      value={exp.title} 
                      onChange={(e) => handleChange('workExperience', 'title', e.target.value, index)} 
                    />
                  </div>
                  <div className="input-group">
                    <label>Company</label>
                    <input 
                      type="text" 
                      value={exp.company} 
                      onChange={(e) => handleChange('workExperience', 'company', e.target.value, index)} 
                    />
                  </div>
                </div>
                
                <div className="input-row">
                  <div className="input-group">
                    <label>Start Date</label>
                    <input 
                      type="date" 
                      value={exp.startDate} 
                      onChange={(e) => handleChange('workExperience', 'startDate', e.target.value, index)} 
                    />
                  </div>
                  <div className="input-group">
                    <label>End Date</label>
                    <input 
                      type="date" 
                      value={exp.endDate} 
                      onChange={(e) => handleChange('workExperience', 'endDate', e.target.value, index)} 
                    />
                  </div>
                </div>
                
                <div className="input-group full-width">
                  <label>Description</label>
                  <textarea 
                    value={exp.description} 
                    onChange={(e) => handleChange('workExperience', 'description', e.target.value, index)}
                    rows="3"
                  ></textarea>
                </div>
                
                {workExperience.length > 1 && (
                  <button 
                    type="button" 
                    className="remove-btn" 
                    onClick={() => removeItem('workExperience', index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            
            <button 
              type="button" 
              className="add-btn" 
              onClick={() => addItem('workExperience', { 
                title: '', company: '', startDate: '', endDate: '', description: '' 
              })}
            >
              + Add Experience
            </button>
          </div>

          <div className="form-section">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>Education {index + 1}</h3>
                <div className="input-row">
                  <div className="input-group">
                    <label>Institution</label>
                    <input 
                      type="text" 
                      value={edu.institution} 
                      onChange={(e) => handleChange('education', 'institution', e.target.value, index)} 
                    />
                  </div>
                  <div className="input-group">
                    <label>Degree</label>
                    <input 
                      type="text" 
                      value={edu.degree} 
                      onChange={(e) => handleChange('education', 'degree', e.target.value, index)} 
                    />
                  </div>
                </div>
                
                <div className="input-row">
                  <div className="input-group">
                    <label>Start Year</label>
                    <input 
                      type="text" 
                      value={edu.startYear} 
                      onChange={(e) => handleChange('education', 'startYear', e.target.value, index)} 
                    />
                  </div>
                  <div className="input-group">
                    <label>End Year</label>
                    <input 
                      type="text" 
                      value={edu.endYear} 
                      onChange={(e) => handleChange('education', 'endYear', e.target.value, index)} 
                    />
                  </div>
                </div>
                
                {education.length > 1 && (
                  <button 
                    type="button" 
                    className="remove-btn" 
                    onClick={() => removeItem('education', index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            
            <button 
              type="button" 
              className="add-btn" 
              onClick={() => addItem('education', { 
                institution: '', degree: '', startYear: '', endYear: '' 
              })}
            >
              + Add Education
            </button>
          </div>

          <div className="form-section">
            <h2>Certifications</h2>
            <div className="input-group full-width">
              <label>Certifications (comma separated)</label>
              <textarea 
                value={certifications.join(', ')} 
                onChange={(e) => handleCertificationsChange(e.target.value)}
                rows="3"
                placeholder="e.g. AWS Certified, PMP, Google Analytics"
              ></textarea>
            </div>
          </div>

          <div className="form-section">
            <h2>Job Preferences</h2>
            <div className="input-row">
              <div className="input-group">
                <label>Job Type</label>
                <select 
                  value={preferences.jobType} 
                  onChange={(e) => handleChange('preferences', 'jobType', e.target.value)}
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="input-group">
                <label>Industry</label>
                <input 
                  type="text"
                  placeholder="e.g. Technology, Healthcare" 
                  value={preferences.industry} 
                  onChange={(e) => handleChange('preferences', 'industry', e.target.value)} 
                />
              </div>
            </div>
            
            <div className="input-row">
              <div className="input-group">
                <label>Location</label>
                <input 
                  type="text"
                  placeholder="e.g. Mumbai, Remote, Pan India" 
                  value={preferences.location} 
                  onChange={(e) => handleChange('preferences', 'location', e.target.value)} 
                />
              </div>
              <div className="input-group">
                <label>Salary Expectation (₹)</label>
                <input 
                  type="text"
                  placeholder="Annual salary in ₹" 
                  value={preferences.salary} 
                  onChange={(e) => handleChange('preferences', 'salary', e.target.value)} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`resume-preview ${template}`} ref={resumeRef}>
          {template === 'modern' && (
            <>
              <div className="resume-header">
                <div className="resume-name">
                  <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
                </div>
                <div className="resume-contact">
                  {personalInfo.email && <div className="contact-item"><i className="fas fa-envelope"></i> {personalInfo.email}</div>}
                  {personalInfo.phone && <div className="contact-item"><i className="fas fa-phone"></i> {personalInfo.phone}</div>}
                </div>
              </div>
              
              {personalInfo.summary && (
                <div className="resume-section">
                  <h2>Professional Summary</h2>
                  <div className="section-content">
                    <p>{personalInfo.summary}</p>
                  </div>
                </div>
              )}
              
              {skills.length > 0 && (
                <div className="resume-section">
                  <h2>Skills</h2>
                  <div className="section-content skills-content">
                    <ul className="skills-list">
                      {skills.map((skill, index) => (
                        <li key={index} className="skill-item">{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {workExperience.length > 0 && workExperience[0].company && (
                <div className="resume-section">
                  <h2>Work Experience</h2>
                  <div className="section-content">
                    {workExperience.map((exp, index) => (
                      <div key={index} className="experience-entry">
                        <div className="entry-header">
                          <h3>{exp.title}</h3>
                          <div className="company-duration">
                            <span className="company">{exp.company}</span>
                            {(exp.startDate || exp.endDate) && (
                              <span className="duration">
                                {exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''} - 
                                {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                              </span>
                            )}
                          </div>
                        </div>
                        {exp.description && <p className="description">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {education.length > 0 && education[0].institution && (
                <div className="resume-section">
                  <h2>Education</h2>
                  <div className="section-content">
                    {education.map((edu, index) => (
                      <div key={index} className="education-entry">
                        <div className="entry-header">
                          <h3>{edu.degree}</h3>
                          <div className="school-duration">
                            <span className="school">{edu.institution}</span>
                            {(edu.startYear || edu.endYear) && (
                              <span className="duration">
                                {edu.startYear || ''} - {edu.endYear || 'Present'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {certifications.length > 0 && (
                <div className="resume-section">
                  <h2>Certifications</h2>
                  <div className="section-content">
                    <ul className="certification-list">
                      {certifications.map((cert, index) => (
                        <li key={index}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {(preferences.jobType || preferences.location || preferences.industry || preferences.salary) && (
                <div className="resume-section">
                  <h2>Job Preferences</h2>
                  <div className="section-content preferences-grid">
                    {preferences.jobType && (
                      <div className="preference-item">
                        <span className="preference-label">Job Type:</span>
                        <span className="preference-value">{preferences.jobType}</span>
                      </div>
                    )}
                    {preferences.industry && (
                      <div className="preference-item">
                        <span className="preference-label">Industry:</span>
                        <span className="preference-value">{preferences.industry}</span>
                      </div>
                    )}
                    {preferences.location && (
                      <div className="preference-item">
                        <span className="preference-label">Location:</span>
                        <span className="preference-value">{preferences.location}</span>
                      </div>
                    )}
                    {preferences.salary && (
                      <div className="preference-item">
                        <span className="preference-label">Expected Salary:</span>
                        <span className="preference-value">₹{preferences.salary}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {template === 'professional' && (
            <>
              <div className="resume-header professional">
                <div className="resume-name">
                  <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
                </div>
                <div className="resume-contact">
                  {personalInfo.email && <div className="contact-item">{personalInfo.email}</div>}
                  {personalInfo.phone && <div className="contact-item">{personalInfo.phone}</div>}
                </div>
              </div>
              
              {/* Professional template content */}
              {/* Similar structure but with different styling */}
              {/* This is handled via CSS classes */}
              
              {personalInfo.summary && (
                <div className="resume-section">
                  <h2>Summary</h2>
                  <div className="section-content">
                    <p>{personalInfo.summary}</p>
                  </div>
                </div>
              )}
              
              {skills.length > 0 && (
                <div className="resume-section">
                  <h2>Skills</h2>
                  <div className="section-content skills-content professional">
                    <p>{skills.join(' • ')}</p>
                  </div>
                </div>
              )}
              
              {/* Repeat similar structures for experience, education, etc. with professional styling */}
              {/* The rest of the professional template follows similar patterns */}
            </>
          )}

          {template === 'creative' && (
            <>
              <div className="resume-header creative">
                <div className="resume-name">
                  <h1>{personalInfo.firstName} <span className="lastname">{personalInfo.lastName}</span></h1>
                </div>
                <div className="resume-contact">
                  {personalInfo.email && <div className="contact-item">{personalInfo.email}</div>}
                  {personalInfo.phone && <div className="contact-item">{personalInfo.phone}</div>}
                </div>
              </div>
              
              {/* Creative template content */}
              {/* Similar structure but with different styling */}
              {/* This is handled via CSS classes */}
              
              {/* The rest of the creative template follows similar patterns */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;