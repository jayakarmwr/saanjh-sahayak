import React, { useState } from "react";
import axios from "axios";
import Navigationvar from "./Navigationvar";
import image from '../assets/young-friendly-female-caregiver-senior-260nw-2266110337.webp';
import bot from '../assets/chat-bot-logo-design-concept-600nw-1938811039.webp';
import { useNavigate } from 'react-router-dom';


const PatientForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [DOB, setDob] = useState("");
  const [chronicCondition, setChronicCondition] = useState("");
  const [chronics, setChronics] = useState([]);
  const navigate=useNavigate();

  const handleChatbotClick = async () => {
    navigate('/chatbot');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      age,
      gender,
      DOB,
      chronics,
    };

    try {
      console.log("entered");
      const response = await axios.post('/en/upload', formData);
      alert("done");
      navigate("/caretaker");
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting patient details:', error);
    }
  };

  const handleAddChronicCondition = () => {
    if (chronicCondition) {
      setChronics([...chronics, chronicCondition]);
      setChronicCondition("");
    }
  };

  const containerStyle = {
    display: 'flex',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginTop: '5%',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
  };

  const headerStyle = {
    backgroundColor: '#990011FF',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  };

  const formGroupStyle = {
    marginBottom: '1rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: '0.75rem 1.25rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#990011FF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '1rem',
  };

  const buttonHoverStyle = {
    backgroundColor: '#990011FF',
  };

  return (
    <div>
      <Navigationvar />
      <div className="container" style={containerStyle}>
        <div style={headerStyle}>
          <h2>Patient Details</h2>
          <p>Record a patient's medical details</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={formGroupStyle}>
            <label htmlFor="name" style={labelStyle}>Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div className="form-group" style={formGroupStyle}>
            <label htmlFor="age" style={labelStyle}>Age</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div className="form-group" style={formGroupStyle}>
            <label htmlFor="gender" style={labelStyle}>Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group" style={formGroupStyle}>
            <label htmlFor="dob" style={labelStyle}>Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={DOB}
              onChange={(e) => setDob(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div className="form-group" style={formGroupStyle}>
            <label htmlFor="chronicCondition" style={labelStyle}>Chronic Conditions</label>
            <input
              type="text"
              id="chronicCondition"
              value={chronicCondition}
              onChange={(e) => setChronicCondition(e.target.value)}
              style={inputStyle}
            />
            <button type="button" onClick={handleAddChronicCondition} style={{ ...buttonStyle }}>
              Add
            </button>
          </div>

          {chronics.length > 0 && (
            <div style={formGroupStyle}>
              <label style={labelStyle}>Chronic Conditions List</label>
              <ul>
                {chronics.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Submit
          </button>
        </form>
      </div>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }} onClick={handleChatbotClick}>
        <img src={bot} alt="Chatbot Icon" style={{ width: '50px', height: '50px' }} />
      </div>
    </div>
  );
};

export default PatientForm;
