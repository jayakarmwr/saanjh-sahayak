import React from 'react'

export default function Pnav({handleoptionclick}) {
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{width:'100%'}}>
  <a class="navbar-brand" style={{color:'black',marginLeft:'3%',fontSize:'16px'}} onClick={()=>handleoptionclick(0)}>PATIENT DETAILS</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      
      <li class="nav-item">
        <a class="nav-link"style={{color:'black',fontSize:'16px'}} onClick={()=>handleoptionclick(1)}>REPORTS</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" style={{color:'black',fontSize:'16px'}} onClick={()=>handleoptionclick(2)}>PREDICTIONS</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" style={{color:'black',fontSize:'16px'}} onClick={()=>handleoptionclick(3)}>SUGESSTIONS</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"  style={{color:'black',fontSize:'16px'}} onClick={()=>handleoptionclick(4)}>DIET PLANS AND EXCERSISES</a>
      </li>

      
     
    </ul>
  </div>
</nav>
    </div>
  )
}
