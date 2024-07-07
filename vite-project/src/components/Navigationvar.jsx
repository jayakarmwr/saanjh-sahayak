import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navigationvar() {
  const navigate=useNavigate();
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark" style={{width:'100%'}}>
  <a class="navbar-brand" href="/" style={{color:'white',marginLeft:'3%'}}>Saanjh Sahayak</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" onClick={()=>navigate("/")} style={{color:'white'}}>Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" onClick={()=>navigate("/doctors")} style={{color:'white'}}>Doctor</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" onClick={()=>navigate("/caretaker")} style={{color:'white'}}>Care Taker</a>
      </li>
     
    </ul>
  </div>
</nav>
    </div>
  )
}
