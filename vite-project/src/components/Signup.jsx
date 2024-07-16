import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigationvar from "./Navigationvar";
import bot from '../assets/chat-bot-logo-design-concept-600nw-1938811039.webp';
const Signup = () => {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const handleChatbotClick = async () => {
    navigate('/chatbot');
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    if (userRole === "doctor") {
      navigate("/doctors");
    } else if (userRole === "caretaker") {
      navigate("/caretaker");
    } else {
      alert("Please select a role before signing in.");
    }
  };

  return (
    <div>
    <Navigationvar/>
    <div style={styles.login}>
      <div style={styles.loginContainer}>
        <div style={styles.loginHeader}>
          
          <h2 style={styles.headerText}>Saanjh Sahayak</h2>
          <p style={styles.subHeaderText}>Elderly Care Health Tracking System</p>
        </div>
        <form onSubmit={handleSignIn}>
          <div style={styles.selectContainer}>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              style={styles.select}
            >
              <option value="">Select Role</option>
              <option value="doctor">Doctor</option>
              <option value="caretaker">Caretaker</option>
            </select>
          </div>
          <button type="submit" style={styles.loginButton}>Submit</button>
        </form>
      </div>
    </div>
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }} onClick={handleChatbotClick}>
        <img src={bot} alt="Chatbot Icon" style={{ width: '50px', height: '50px' }} />
      </div>
    </div>
  );
};

const styles = {
  login: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
  },
  loginContainer: {
    backgroundColor: '#ffffff',
    padding: '40px 30px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    marginTop:'3%'
  },
  loginHeader: {
    marginBottom: '30px',
  },
  loginIcon: {
    fontSize: '40px',
    marginBottom: '10px',
  },
  headerText: {
    margin: '0',
    fontSize: '24px',
    color: '#333',
  },
  subHeaderText: {
    margin: '5px 0 0',
    fontSize: '14px',
    color: '#666',
  },
  selectContainer: {
    marginBottom: '30px',
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '100%',
    padding: '10px 0',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#990011FF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Signup;
