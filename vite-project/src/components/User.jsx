import React, { useState } from 'react';
import {useParams} from 'react-router-dom'

function User() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const formContainerStyle = {
    width: '300px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0 10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px'
  };

  const labelStyle = {
    display: 'block',
    textAlign: 'left',
    marginBottom: '5px'
  };

  return (
    <div className="App">
      <div style={formContainerStyle}>
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        {isLogin ? <LoginForm styles={{ inputStyle, labelStyle }} /> : <SignupForm styles={{ inputStyle, labelStyle }} />}
        <button style={buttonStyle} onClick={toggleForm}>
          {isLogin ? 'Switch to Signup' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
}

function LoginForm({ styles }) {
  return (
    <form>
      <div>
        <label style={styles.labelStyle}>Email:</label>
        <input style={styles.inputStyle} type="email" />
      </div>
      <div>
        <label style={styles.labelStyle}>Password:</label>
        <input style={styles.inputStyle} type="password" />
      </div>
      <button type="submit" style={styles.inputStyle}>Login</button>
    </form>
  );
}

function SignupForm({ styles }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const role=useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("clicked")
      const response = await axios.post('/en/signup', { name, email ,role});
      console.log(response.data.message);
    } catch (error) {
      console.error('Error signing up:', error.response.data.message);
    }
  };
  return (
    <form  onSubmit={handleSubmit}>
      <div>
        <label style={styles.labelStyle} >Name:</label>
        <input style={styles.inputStyle}  value={name} onChange={(e) => setName(e.target.value)} type="text" />
      </div>
      <div>
        <label style={styles.labelStyle} >Email:</label>
        <input style={styles.inputStyle} value={email} onChange={(e) => setEmail(e.target.value)}type="email" />
      </div>
     
      <button type="submit" style={styles.inputStyle} >Signup</button>
    </form>
  );
}

export default User;
