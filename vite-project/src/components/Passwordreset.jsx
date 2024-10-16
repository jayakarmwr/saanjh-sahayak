import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navigationvar from "./Navigationvar";


function Passwordreset() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { token } = useParams(); // Assuming the token is passed as a URL parameter
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate();

  

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
  
    try {
      await axios.post(`${API_BASE_URL}/en/reset-password/${token}`, { password });
      setMessage('Password has been set successfully! You can now login.');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      setMessage('An error occurred.');
      console.error('Error:', error);
    }
  };

  const formStyle = {
    width: '300px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#990011FF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <div><Navigationvar/>
    <div style={{ textAlign: 'center' }}>
      <h3 style={{marginTop:'6%'}}>Reset Password</h3>
      <div style={formStyle}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyle}
        />
        <button style={buttonStyle} onClick={handleReset}>
          Reset Password
        </button>
        {message && <p>{message}</p>}
      </div>
     
   
    </div>
    </div>
  );
}

export default Passwordreset;
