import React, { useState } from 'react';
import '../styles/recruiter.css';
import { FaPlus, FaChevronDown, FaUser, FaMapMarkerAlt, FaEnvelope, FaPhone, FaPencilAlt } from 'react-icons/fa';

function RecruiterDashboard() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const dummyJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'Pune',
      salary: '₹12 LPA',
      type: 'Full-Time',
      postedOn: '2024-04-01',
      applicants: 8,
      description: 'We are looking for a skilled frontend developer with expertise in React.js...'
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'NextGen Solutions',
      location: 'Bangalore',
      salary: '₹10 LPA',
      type: 'Remote',
      postedOn: '2024-03-28',
      applicants: 12,
      description: 'Looking for a backend developer with Node.js and MongoDB experience...'
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'InfraWare',
      location: 'Hyderabad',
      salary: '₹12 LPA',
      type: 'Hybrid',
      postedOn: '2024-03-25',
      applicants: 5,
      description: 'Join our team as a DevOps engineer with knowledge of Docker and Kubernetes...'
    },
  ];

  const dummyCandidates = [
    {
      id: 1,
      name: 'Arjun Sharma',
      email: 'arjun.s@gmail.com',
      phone: '+91 9876543210',
      experience: '3 years',
      skills: ['React', 'JavaScript', 'CSS', 'HTML'],
      appliedDate: '2024-04-02',
      resumeLink: '#'
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya.p@gmail.com',
      phone: '+91 8765432109',
      experience: '4 years',
      skills: ['Angular', 'TypeScript', 'Node.js'],
      appliedDate: '2024-04-01',
      resumeLink: '#'
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      email: 'rahul.k@gmail.com',
      phone: '+91 7654321098',
      experience: '2 years',
      skills: ['React', 'Redux', 'Jest'],
      appliedDate: '2024-04-03',
      resumeLink: '#'
    },
  ];

  const [selectedJobForCandidates, setSelectedJobForCandidates] = useState(dummyJobs[0]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const openJobModal = (job) => {
    setSelectedJob(job);
  };

  const closeJobModal = () => {
    setSelectedJob(null);
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const openEditModal = (job) => {
    setSelectedJob(job);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="dashboard-container">
      <header className="recruiter-header">
        <h2>Recruiter Dashboard</h2>
        <div className="profile-section" onClick={toggleDropdown}>
          <div className="profile-icon">R</div>
          <span className="profile-name">Recruiter</span>
          <FaChevronDown />
          {showDropdown && (
            <div className="dropdown-menu">
              <p onClick={() => {window.location.href = "/recruiter-profile"}}>Profile</p>
              <p>Settings</p>
              <p>Logout</p>
            </div>
          )}
        </div>
      </header>

      <div className="dashboard-content">
        {/* Left section - Applications */}
        <section className="applications-section">
          <h3 className="section-title">Applications</h3>
          
          <div className="job-selector">
            <h4>Select Job Posting</h4>
            <select 
              value={selectedJobForCandidates.id}
              onChange={(e) => setSelectedJobForCandidates(dummyJobs.find(job => job.id === parseInt(e.target.value)))}
            >
              {dummyJobs.map(job => (
                <option key={job.id} value={job.id}>{job.title} - {job.applicants} applicants</option>
              ))}
            </select>
          </div>
          
          <div className="job-details-panel">
            <h4>{selectedJobForCandidates.title}</h4>
            <div className="job-meta">
              <span>{selectedJobForCandidates.company}</span> • 
              <span>{selectedJobForCandidates.location}</span> • 
              <span>{selectedJobForCandidates.type}</span>
            </div>
          </div>

          <h4 className="sub-section-title">Applicants ({dummyCandidates.length})</h4>
          
          <div className="candidates-list">
            {dummyCandidates.map((candidate) => (
              <div key={candidate.id} className="candidate-card">
                <div className="candidate-header">
                  <div className="candidate-avatar">
                    <FaUser size={24} />
                  </div>
                  <div>
                    <h4>{candidate.name}</h4>
                    <p className="exp-tag">{candidate.experience} exp</p>
                  </div>
                </div>
                <div className="candidate-details">
                  <p><FaEnvelope /> {candidate.email}</p>
                  <p><FaPhone /> {candidate.phone}</p>
                  <p><FaMapMarkerAlt /> Applied on: {candidate.appliedDate}</p>
                </div>
                <div className="skills-container">
                  {candidate.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <div className="card-actions">
                  <button className="view-resume-btn">View Resume</button>
                  <button className="contact-btn">Contact</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right section - Job Posts */}
        <section className="job-posts-section">
          <h3 className="section-title">My Job Postings</h3>
          
          <div className="jobs-grid">
            {dummyJobs.map((job) => (
              <div key={job.id} className="job-tile" onClick={() => openJobModal(job)}>
                <div className="job-tile-header">
                  <h4>{job.title}</h4>
                  <button 
                    className="edit-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(job);
                    }}
                  >
                    <FaPencilAlt />
                  </button>
                </div>
                <p className="company-name">{job.company}</p>
                <div className="job-meta-info">
                  <span>{job.location}</span>
                  <span>{job.type}</span>
                  <span>{job.salary}</span>
                </div>
                <p className="job-date">Posted on: {job.postedOn}</p>
                <div className="applicant-badge">
                  {job.applicants} applicants
                </div>
              </div>
            ))}
            <div className="job-tile add-job-tile" onClick={openCreateModal}>
              <div className="add-job-content">
                <FaPlus size={24} />
                <p>Add New Job</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Job Details Modal */}
      {selectedJob && !showEditModal && (
        <div className="modal-overlay" onClick={closeJobModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedJob.title}</h3>
            <p className="job-description">{selectedJob.description}</p>
            <ul className="job-details-list">
              <li><strong>Company:</strong> {selectedJob.company}</li>
              <li><strong>Location:</strong> {selectedJob.location}</li>
              <li><strong>Salary:</strong> {selectedJob.salary}</li>
              <li><strong>Type:</strong> {selectedJob.type}</li>
              <li><strong>Posted on:</strong> {selectedJob.postedOn}</li>
              <li><strong>Total Applicants:</strong> {selectedJob.applicants}</li>
            </ul>
            <div className="modal-actions">
              <button className="edit-job-btn" onClick={() => {
                closeJobModal();
                openEditModal(selectedJob);
              }}>Edit Job</button>
              <button className="close-btn" onClick={closeJobModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={closeCreateModal}>
          <div className="modal-content create-job-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Create New Job Posting</h3>
            <form className="job-form">
              <div className="form-group">
                <label>Job Title</label>
                <input type="text" placeholder="e.g., Frontend Developer" />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input type="text" placeholder="Your company name" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" placeholder="e.g., Mumbai" />
                </div>
                <div className="form-group">
                  <label>Job Type</label>
                  <select>
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Contract</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Salary Range</label>
                <input type="text" placeholder="e.g., ₹10-15 LPA" />
              </div>
              <div className="form-group">
                <label>Job Description</label>
                <textarea rows="5" placeholder="Describe the job requirements and responsibilities..."></textarea>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeCreateModal}>Cancel</button>
                <button type="submit" className="submit-btn">Create Job</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content create-job-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Job Posting</h3>
            <form className="job-form">
              <div className="form-group">
                <label>Job Title</label>
                <input type="text" defaultValue={selectedJob.title} />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input type="text" defaultValue={selectedJob.company} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" defaultValue={selectedJob.location} />
                </div>
                <div className="form-group">
                  <label>Job Type</label>
                  <select defaultValue={selectedJob.type}>
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Contract</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Salary Range</label>
                <input type="text" defaultValue={selectedJob.salary} />
              </div>
              <div className="form-group">
                <label>Job Description</label>
                <textarea rows="5" defaultValue={selectedJob.description}></textarea>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeEditModal}>Cancel</button>
                <button type="submit" className="submit-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecruiterDashboard;