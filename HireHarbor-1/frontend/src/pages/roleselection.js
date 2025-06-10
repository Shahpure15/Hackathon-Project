import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/roleselection.css';
import { FaUserTie, FaUserGraduate } from 'react-icons/fa';

const RoleSelection = () => {
  const history = useHistory();

  const handleRoleSelect = (role) => {
    // Route to appropriate registration form based on role
    if (role === 'candidate') {
      history.push('/candidate');
    } else if (role === 'recruiter') {
      history.push('/recruiter');
    }
  };

  return (
    <div className="role-selection-container">
      <h1>Select Your Role</h1>
      <p className="role-description">Choose the role that best describes you to continue registration.</p>
      <div className="role-buttons">
        <div className="role-card candidate-card" onClick={() => handleRoleSelect('candidate')}>
          <FaUserGraduate className="role-icon" />
          <h2>Candidate</h2>
          <p>Find jobs, apply, and grow your career.</p>
        </div>
        <div className="role-card recruiter-card" onClick={() => handleRoleSelect('recruiter')}>
          <FaUserTie className="role-icon" />
          <h2>Recruiter</h2>
          <p>Post jobs, find talent, and build your team.</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;