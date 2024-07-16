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
  
</nav>
    </div>
  )
}
