import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/auth.css';
import { FaGoogle } from 'react-icons/fa';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // Check for error query params
    const params = new URLSearchParams(location.search);
    const errorParam = params.get('error');
    
    if (errorParam === 'no-account') {
      setError('No account found. Please sign up first.');
    } else if (errorParam === 'server-error') {
      setError('Server error. Please try again later.');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (!isLogin) {
        // Redirect to role selection after signup
        history.push('/role');
        return;
      }

      // Check if user has role and redirect accordingly
      if (data.user) {
        const userRole = data.user.role;
        if (userRole === 'candidate') {
          history.push('/candidate-dashboard');
        } else if (userRole === 'recruiter') {
          history.push('/recruiter-dashboard');
        } else {
          history.push('/role'); // Fallback to role selection
        }
      } else {
        throw new Error('User information not found');
      }
    } catch (error) {
      setError(error.message);
      console.error('Auth error:', error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleSignupClick = () => {
    history.push('/role');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
        <p className="auth-subtitle">
          {isLogin ? 'Login to access your account' : 'Sign up to get started'}
        </p>

        {error && <div className="error-message">{error}</div>}

        {isLogin && (
          <button className="google-btn" onClick={handleGoogleLogin}>
            <FaGoogle className="google-icon" />
            Continue with Google
          </button>
        )}

        {isLogin && <div className="divider"><span>or</span></div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="toggle-auth">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={handleSignupClick}>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;