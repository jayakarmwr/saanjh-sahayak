import React from 'react'

export default function Dietplanexec() {
  return (
    <div>
        <div col='container'>
        <div class='row'>
        <button class="col-sm" style={{fontSize: '25px',backgroundColor:'#990011FF',color:'white',marginTop:'1%',marginLeft:'10%',marginRight:'10%'}}>
      SUGGESTED DIET PALNS AND EXCERSISES
    </button>
        </div>
        </div>

        
        <div class='container2'>
            <div class='row' style={{marginLeft:'10%',marginRight:'10%',marginTop:'2%'}}>
                <h5>EXCERSISES</h5>
                
                <textarea rows='5' placeholder='type here...........'/>
              
                
            </div>
        </div>


        <div class='container3'>
            <div class='row' style={{marginLeft:'10%',marginRight:'10%',marginTop:'2%'}}>
                <h5>DIET PLAN</h5>
                
                <textarea rows='5' placeholder='type here...........'/>
                
                
            </div>
        </div>

        <div class="container4" >
  <div class="row">
    <div class="col" style={{marginLeft:'10%',marginTop: '2%'}}>
      <h5>WANT TO SEND ANY RECORDING? do it here</h5>
    </div>
    <div class="col" style={{display: 'flex',justifyContent: 'space-around',marginTop: '2%',marginRight:'10%'}}>
      <button style={{backgroundColor: '#990011FF' ,color: 'white', width: '100px'}}>START</button>
      <button style={{backgroundColor: '#990011FF' ,color: 'white', width: '100px'}}>STOP</button>
      <button style={{backgroundColor: '#990011FF' ,color: 'white', width: '100px'}}>PLAY</button>
    </div>
  </div>
</div>

<div class='container5'>
            <div class='row' style={{marginLeft:'10%',marginRight:'10%',marginTop:'5%'}}>
               <button type='submit' style={{backgroundColor:'#990011FF',color:'white',width:'10%'}}>SUBMIT</button>
            </div>
        </div>
    </div>

      
   
  )
}
