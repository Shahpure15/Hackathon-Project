import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import '../styles/resume.css';

const Resume = () => {
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    skills: '',
    experience: '',
    education: '',
  });

  const resumeRef = useRef();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('resumeData'));
    if (storedData) {
      setResumeData(storedData);
    }
  }, []);

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    alert('Resume Saved Successfully!');
  };

  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0.5,
      filename: 'My_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="resume-container">
      <h1>Resume Builder</h1>

      <div className="resume-form">
        <input type="text" name="name" placeholder="Your Name" value={resumeData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Your Email" value={resumeData.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Your Phone" value={resumeData.phone} onChange={handleChange} />
        <textarea name="summary" placeholder="Summary/About You" value={resumeData.summary} onChange={handleChange}></textarea>
        <textarea name="skills" placeholder="Skills (Comma Separated)" value={resumeData.skills} onChange={handleChange}></textarea>
        <textarea name="experience" placeholder="Work Experience" value={resumeData.experience} onChange={handleChange}></textarea>
        <textarea name="education" placeholder="Education" value={resumeData.education} onChange={handleChange}></textarea>

        <button onClick={handleSave}>Save Resume</button>
        <button onClick={handleDownloadPDF}>Download as PDF</button>
      </div>

      <div className="resume-preview" ref={resumeRef}>
        
        <p><strong>Name:</strong> {resumeData.name}</p>
        <p><strong>Email:</strong> {resumeData.email}</p>
        <p><strong>Phone:</strong> {resumeData.phone}</p>
        <p><strong>Summary:</strong> {resumeData.summary}</p>
        <p><strong>Skills:</strong> {resumeData.skills}</p>
        <p><strong>Experience:</strong> {resumeData.experience}</p>
        <p><strong>Education:</strong> {resumeData.education}</p>
      </div>
    </div>
  );
};

export default Resume;
