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
    companyName: '',
    companySize: 0,
    industry: '',
    location: '',
    website: '',
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
      const signupResponse = await fetch('http://localhost:5000/api/auth/signup-recruiter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          name: `${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName,
          companySize: formData.companySize,
          industry: formData.industry,
          location: formData.location,
          website: formData.website,
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
    <div className="auth-container" style={{ 
      backgroundColor: '#f5f7fa', 
      minHeight: '100vh', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div className="auth-box" style={{ 
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '800px'
      }}>
        <h1 style={{ 
          color: '#2c3e50', 
          fontSize: '28px',
          marginBottom: '10px',
          textAlign: 'center'
        }}>Complete Your Profile</h1>
        <p className="auth-subtitle" style={{ 
          color: '#7f8c8d', 
          marginBottom: '30px',
          textAlign: 'center',
          fontSize: '16px'
        }}>Sign up as a Recruiter</p>
        
        {error && <div className="error-message" style={{ 
          backgroundColor: '#ffecec',
          color: '#e74c3c',
          padding: '12px',
          borderRadius: '5px',
          marginBottom: '20px',
          fontSize: '14px'
        }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ 
            display: 'flex', 
            gap: '15px',
            marginBottom: '15px' 
          }}>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              style={{ 
                flex: 1,
                padding: '12px 15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '15px',
                transition: 'border 0.3s ease'
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              style={{ 
                flex: 1,
                padding: '12px 15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '15px',
                transition: 'border 0.3s ease'
              }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ 
                width: '100%',
                padding: '12px 15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '15px'
              }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              style={{ 
                width: '100%',
                padding: '12px 15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '15px'
              }}
            />
          </div>
          
          <div className="form-row" style={{ 
            display: 'flex', 
            gap: '15px',
            marginBottom: '15px' 
          }}>
            <div style={{ flex: 2 }}>
              <input
                type="text"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
                style={{ 
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  fontSize: '15px'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <input
                type="number"
                placeholder="Company Size"
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                required
                style={{ 
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  fontSize: '15px'
                }}
              />
            </div>
          </div>
          
          <div className="form-row" style={{ 
            display: 'flex', 
            gap: '15px',
            marginBottom: '15px' 
          }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                required
                style={{ 
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  fontSize: '15px'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                style={{ 
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  fontSize: '15px'
                }}
              />
            </div>
          </div>
          
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Website"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              required
              style={{ 
                width: '100%',
                padding: '12px 15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '15px'
              }}
            />
          </div>
          
          <div className="form-group" style={{ 
            display: 'flex', 
            gap: '15px',
            marginBottom: '20px' 
          }}>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ 
                flex: 1,
                padding: '12px 15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '15px'
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              style={{ 
                flex: 1,
                padding: '12px 15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '15px'
              }}
            />
          </div>
          
          <div className="form-group" style={{ 
            marginBottom: '25px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              color: '#555',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                required
                style={{ 
                  marginRight: '10px',
                  cursor: 'pointer'
                }}
              />
              I accept the terms and conditions
            </label>
          </div>
          
          <button type="submit" className="submit-btn" style={{ 
            width: '100%',
            padding: '14px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            marginBottom: '20px'
          }}>Complete Registration</button>
        </form>
        
        <p className="toggle-auth" style={{ 
          textAlign: 'center',
          fontSize: '15px',
          color: '#7f8c8d'
        }}>
          Already have an account?{' '}
          <span onClick={() => history.push('/auth')} style={{ 
            color: '#3498db',
            cursor: 'pointer',
            fontWeight: '600'
          }}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default RecruiterSignup;