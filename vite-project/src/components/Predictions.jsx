import React from 'react'

export default function Predictions({prediction}) {
    
  return (
    <div>
         <div col='container'>
        <div class='row'>
        <button class="col-sm" style={{fontSize: '25px',backgroundColor:'#990011FF',color:'white',marginTop:'1%',marginLeft:'10%',marginRight:'10%'}}>
        PREDICTION
    </button>
        </div>
        </div>

        <div>
            {prediction}

        </div>
      
    </div>
  )
}
