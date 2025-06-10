import React, { useEffect, useState } from 'react';
import '../styles/profile.css';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    setSavedJobs(jobs);
  }, []);
  

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="profile-pic"></div>
        <ul>
          <li onClick={() => history.push('/')}>Home</li>
          <li>Messages</li>
          <li>Applications</li>
          <li onClick={() => window.location.href = './Resume'}>Resume</li>
          <li>Notifications</li>
          <li>Settings</li>
        </ul>
      </aside>

      <div className="profile-content">
        <h1>Welcome!</h1>

        <div className="profile-section">
          <h2>Work Experience</h2>
          <button>Add Experience</button>
        </div>

        <div className="profile-section">
          <h2>Education</h2>
          <button>Add Education</button>
        </div>

        <div className="profile-section">
          <h2>Skills</h2>
          <button>Add Skills</button>
        </div>

        <div className="profile-section">
          <h2>Certifications & Licenses</h2>
          <button>Upload Certifications</button>
        </div>

        <div className="profile-section">
          <h2>Saved Jobs</h2>
          <div className="saved-jobs-container">
            {savedJobs.length === 0 ? (
              <p>No Saved Jobs</p>
            ) : (
              savedJobs.map((job, index) => (
                <div className="saved-job-card" key={index}>
                  <p className="date">{job.date}</p>
                  <h4>{job.company}</h4>
                  <p>{job.role}</p>
                  <p>{job.price}</p>
                  <p>{job.location}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
