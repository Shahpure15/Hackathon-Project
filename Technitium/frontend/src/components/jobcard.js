import React from 'react';
import '../styles/jobcard.css';

const JobCard = ({ job, onSwipe, onDrag, dragPosition }) => {
  return (
    <div 
      className="job-card"
      style={{
        transform: dragPosition ? `translateX(${dragPosition.x}px) rotate(${dragPosition.x / 20}deg)` : '',
        opacity: dragPosition ? 1 - Math.abs(dragPosition.x) / 300 : 1
      }}
    >
      <div className="company-header">
        <img 
          src={job.logo || '/placeholder-logo.png'} 
          alt={job.company}
          onError={(e) => e.target.src = '/placeholder-logo.png'}
        />
        <div className="company-info">
          <h2>{job.company}</h2>
          <p className="position">{job.position}</p>
          <span className="job-type">{job.type}</span>
        </div>
      </div>

      <div className="job-details">
        <div className="detail-row">
          <span>📍 {job.location}</span>
          <span>💰 {job.salary}</span>
        </div>
        <p className="description">{job.description}</p>
        
        {job.skills && (
          <div className="skills">
            {job.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;