import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Navigationvar from "./Navigationvar";


function Newuser() {
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('doctor'); // Default role can be 'doctor'
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/en/newuser`, { email, name, role });
      setMessage('Signup successful! Please check your email to set your password.');
      // Redirect to login page if needed
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
      <h3 style={{marginTop:'6%'}}>Signup</h3>
      <div style={formStyle}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
        >
          <option value="doctor">Doctor</option>
          <option value="caretaker">Caretaker</option>
        </select>
        <button style={buttonStyle} onClick={handleSubmit}>
          Signup
        </button>
        {message && <p>{message}</p>}
      </div>
      
    </div>
    </div>
  );
}

export default Newuser;
