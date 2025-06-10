import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/auth.css';

const RecruiterSignup = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const [error, setError] = useState('');

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
      // First register the user
      const signupResponse = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          name: `${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          password: formData.password
        }),
      });

      if (!signupResponse.ok) {
        const errorData = await signupResponse.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      // Then set the role
      const roleResponse = await fetch('http://localhost:5000/api/auth/update-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role: 'recruiter' }),
      });

      if (!roleResponse.ok) {
        const errorData = await roleResponse.json();
        throw new Error(errorData.message || 'Failed to set role');
      }

      // Redirect to recruiter dashboard
      history.push('/recruiter-dashboard');
    } catch (error) {
      setError(error.message);
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Complete Your Profile</h1>
        <p className="auth-subtitle">Sign up as a Recruiter</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company Name"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                required
              />
              I accept the terms and conditions
            </label>
          </div>
          <button type="submit" className="submit-btn">Complete Registration</button>
        </form>
        <p className="toggle-auth">
          Already have an account? <span onClick={() => history.push('/auth')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default RecruiterSignup;