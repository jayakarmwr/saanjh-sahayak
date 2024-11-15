import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigationvar from "./Navigationvar";


function Login() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('doctor'); // Default role
  const [message, setMessage] = useState('');


  const navigate = useNavigate();
  

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/en/login`, { email, password, userRole });
  
      if (response.status === 200) {
        setMessage('Login successful!');
        if (userRole === 'doctor') {
          navigate('/doctors'); // Redirect to doctor page
        } else if (userRole === 'caretaker') {
          navigate('/caretaker'); // Redirect to caretaker page
        }
      } else {
        setMessage('Login failed, please check your credentials.');
      }
    } catch (error) {
      setMessage('An error occurred.');
      console.error('Error:', error);
    }
  };

  const formStyle = {
    width: '100%',
    maxWidth: '400px', // Ensure the form doesn't stretch too much on larger screens
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };
  
  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    margin: '12px 0',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };
  
  const buttonStyle = {
    width: '100%',
    padding: '12px',
    margin: '12px 0',
    backgroundColor: '#0066cc', // More appealing blue color
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };
  

  const linkStyle = {
    color: '#0066cc',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s ease',
  };
  
  
  

  return (<div><Navigationvar/>
    <div style={{ textAlign: 'center' }}>

      <h3 style={{marginTop:'6%'}}>Login</h3>
      <div style={formStyle}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          style={inputStyle}
        >
          <option value="doctor">Doctor</option>
          <option value="caretaker">Caretaker</option>
        </select>
        <button style={buttonStyle} onClick={handleLogin}>
          Login
        </button>
        <p>
          Don't have an account? 
          <span style={linkStyle} onClick={() => navigate('/newuser')}>
            Signup here.
          </span>
        </p>
        {message && <p>{message}</p>}
      </div>
      
    </div>
    </div>
  );
}

export default Login;
