import React, { useState } from 'react';
import '../styles/candidatedashboard.css';
import { FaBuilding, FaMapMarkerAlt, FaClock, FaDollarSign, FaCalendarAlt, FaFileAlt, FaImage, FaFile } from 'react-icons/fa';

const dummyJobs = [
  { id: 1, company: 'Amazon', role: 'Senior UI/UX Designer', price: '$250/hr', location: 'San Francisco, CA', date: '20 May, 2023', hours: '40 hrs/week', type: 'Job' },
  { id: 2, company: 'Google', role: 'Junior UI/UX Designer', price: '$150/hr', location: 'California, CA', date: '4 Feb, 2023', hours: '30 hrs/week', type: 'Internship' },
  { id: 3, company: 'Dribbble', role: 'Senior Motion Designer', price: '$260/hr', location: 'New York, NY', date: '29 Jan, 2023', hours: '20 hrs/week', type: 'Job' },
  { id: 4, company: 'Facebook', role: 'Product Designer', price: '$200/hr', location: 'Seattle, WA', date: '15 Mar, 2023', hours: '35 hrs/week', type: 'Job' },
  { id: 5, company: 'Microsoft', role: 'UX Researcher', price: '$180/hr', location: 'Austin, TX', date: '10 Apr, 2023', hours: '25 hrs/week', type: 'Internship' },
  { id: 6, company: 'Apple', role: 'UI Designer', price: '$230/hr', location: 'Cupertino, CA', date: '5 May, 2023', hours: '40 hrs/week', type: 'Job' },
];

// Add this near the top of the file, after dummyJobs
const dummyProjects = [
  {
    name: "E-commerce Website",
    desc: "Developed a full-stack e-commerce platform using React and Node.js",
    date: "2023-05-15",
    files: []
  },
  {
    name: "Mobile Banking App",
    desc: "Created a secure mobile banking application with React Native",
    date: "2023-06-20",
    files: []
  },
  {
    name: "Portfolio Website",
    desc: "Designed and implemented a personal portfolio website showcasing projects",
    date: "2023-07-10",
    files: []
  }
];

// Then modify the projects state initialization:


const CandidateDashboard = () => {
  const [jobs] = useState(dummyJobs);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobIds, setSavedJobIds] = useState([]);

  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectFiles, setProjectFiles] = useState([]);

  const handleSave = (id) => {
    if (savedJobIds.includes(id)) {
      setSavedJobIds(savedJobIds.filter(jobId => jobId !== id));
    } else {
      setSavedJobIds([...savedJobIds, id]);
    }
  };

  const handleDetails = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (projectName && projectDesc) {
      setProjects([...projects, { 
        name: projectName, 
        desc: projectDesc, 
        files: projectFiles,
        date: new Date().toLocaleDateString()
      }]);
      setProjectName('');
      setProjectDesc('');
      setProjectFiles([]);
    }
  };

  const postDummyJobsToDatabase = async () => {
    try {
      const dummyJobs = [
        { title: 'Senior UI/UX Designer', description: 'Design user interfaces...', company: 'Amazon', location: 'San Francisco, CA', salary: 250, jobType: 'Job', skills: ['UI', 'UX'], recruiterId: '12345', deadline: '2025-05-20', experience: '5+ years', education: 'Bachelor\'s Degree' },
        { title: 'Junior UI/UX Designer', description: 'Assist in designing...', company: 'Google', location: 'California, CA', salary: 150, jobType: 'Internship', skills: ['UI', 'UX'], recruiterId: '12345', deadline: '2025-02-04', experience: '1+ years', education: 'Bachelor\'s Degree' },
      ];
  
      for (const job of dummyJobs) {
        await axios.post('http://localhost:5000/api/jobs/create', job);
      }
      alert('Dummy jobs posted successfully!');
    } catch (error) {
      console.error('Error posting dummy jobs:', error);
      alert('Failed to post dummy jobs.');
    }
  };

  const [selectedFilter, setSelectedFilter] = useState('All');
  const filteredJobs = selectedFilter === 'All' 
    ? jobs 
    : jobs.filter(job => job.type === selectedFilter);

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) {
      return <FaImage />;
    } else if (['pdf', 'doc', 'docx'].includes(extension)) {
      return <FaFileAlt />;
    } else {
      return <FaFile />;
    }
  };

  return (
    <div className="dashboard-container">
      <header>
        <h2>WELCOME TO YOUR DASHBOARD !!</h2>
        <div className="profile-section" onClick={() => setShowMenu(!showMenu)}>
          <div className="profile-icon">👤</div>
          {showMenu && (
            <div className="dropdown-menu">
              <p>Home</p>
              <p onClick={() => window.location.href = './Profile'}>Profile</p>
            </div>
          )}
        </div>
      </header>

      <div className="main-content">
        {/* Left Section - Jobs */}
          <div className="left-section">
            <div className="jobs-header">
              <h3>Available Jobs</h3>
              <select onChange={(e) => setSelectedFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Job">Job</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="jobs-grid">
              {filteredJobs.map(job => (
                <div 
            key={job.id} 
            className={`job-tile ${savedJobIds.includes(job.id) ? 'saved' : ''}`}
                >
            <div className="job-tile-header">
              <h4>{job.role}</h4>
              <span className={`job-type ${job.type.toLowerCase()}`}>{job.type}</span>
            </div>
            <div className="company-info">
              <FaBuilding /> <span>{job.company}</span>
            </div>
            <div className="job-details">
              <div><FaMapMarkerAlt /> <span>{job.location}</span></div>
              <div><FaDollarSign /> <span>{job.price}</span></div>
              <div><FaClock /> <span>{job.hours}</span></div>
              <div><FaCalendarAlt /> <span>{job.date}</span></div>
            </div>
            <div className="job-tile-actions">
              <button className="details-btn" onClick={() => handleDetails(job)}>View Details</button>
              <button 
                className={`save-btn ${savedJobIds.includes(job.id) ? 'saved' : ''}`} 
                onClick={() => handleSave(job.id)}
              >
                {savedJobIds.includes(job.id) ? 'Saved' : 'Save'}
              </button>
            </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Projects */}
          <div className="right-section">
            <h3>My Projects</h3>
            <form onSubmit={handleAddProject} className="add-project-form">
              <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
              <textarea
                placeholder="Project Description"
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                required
              ></textarea>

              <div className="file-upload-container">
                <label className="file-upload-label">
            <span>Upload Files</span>
            <input
              type="file"
              multiple
              onChange={(e) => setProjectFiles(Array.from(e.target.files))}
              accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx"
              className="file-input"
            />
                </label>
                {projectFiles.length > 0 && (
            <div className="selected-files">
              <p>{projectFiles.length} file(s) selected</p>
            </div>
                )}
              </div>

              <button type="submit" className="add-project-btn">Add Project</button>
            </form>

            <div className="project-cards-container">
              {[...dummyProjects, ...projects].map((project, index) => (
                <div key={index} className="project-card">
            <div className="project-header">
              <h4>{project.name}</h4>
              <span className="project-date">{project.date}</span>
            </div>
            <p className="project-desc">{project.desc}</p>

            {project.files && project.files.length > 0 && (
              <div className="project-files">
                <h5>Attachments</h5>
                {project.files.map((file, i) => (
                  <div key={i} className="file-item">
              {getFileIcon(file.name)}
              <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
                  </div>
                ))}
              </div>
            )}
                </div>
              ))}
            </div>
          </div>
              </div>

              {/* Job Details Modal */}
      {showModal && selectedJob && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedJob.role}</h3>
              <span className={`job-type ${selectedJob.type.toLowerCase()}`}>{selectedJob.type}</span>
            </div>
            
            <div className="company-section">
              <FaBuilding size={18} />
              <h4>{selectedJob.company}</h4>
            </div>
            
            <div className="job-details-grid">
              <div className="detail-item">
                <FaMapMarkerAlt />
                <div>
                  <h5>Location</h5>
                  <p>{selectedJob.location}</p>
                </div>
              </div>
              
              <div className="detail-item">
                <FaClock />
                <div>
                  <h5>Hours</h5>
                  <p>{selectedJob.hours}</p>
                </div>
              </div>
              
              <div className="detail-item">
                <FaDollarSign />
                <div>
                  <h5>Pay</h5>
                  <p>{selectedJob.price}</p>
                </div>
              </div>
              
              <div className="detail-item">
                <FaCalendarAlt />
                <div>
                  <h5>Posted Date</h5>
                  <p>{selectedJob.date}</p>
                </div>
              </div>
            </div>
            
            <div className="job-description">
              <h5>Job Description</h5>
              <p>
                This position offers an exciting opportunity to work with a leading team in the industry. You will be responsible for creating innovative designs and solutions.
              </p>
            </div>
            
            <div className="modal-actions">
              <button className="apply-btn" onClick={() => setShowModal(false)}>Apply Now</button>
              <button 
                className={`save-modal-btn ${savedJobIds.includes(selectedJob.id) ? 'saved' : ''}`}
                onClick={() => {
                  handleSave(selectedJob.id);
                }}
              >
                {savedJobIds.includes(selectedJob.id) ? 'Saved' : 'Save Job'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateDashboard;