import React from 'react'

export default function BarContainer({arr , colors , mode , left , right}) {
  return (

    <div className='BarContainer'>  
    
   
     {

        arr.map((val, idx)=>{
            let html ,bc;
            if(mode===0){
              bc = 'rgb(255, 63, 43)';
            }else{
              bc = 'rgb(255, 63, 40)'
            }
            if(idx===left || idx===right){
                html =   <div className='array-bar' key={idx} style={{height : val , backgroundColor : colors[mode] ,  borderRight: '10px solid ' + bc }}><p>{}</p></div> 
            }else{
               html = <div className='array-bar' key={idx} style={{height : val , backgroundColor : 'whitesmoke' ,  borderRight: '10px solid #0000dd' }}><p>{}</p></div> 
            }
            
            return html;
        })
    }

    </div>
  )
}
