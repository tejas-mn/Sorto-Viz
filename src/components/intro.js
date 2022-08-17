import React from 'react'

export default function Tutorial ({resetArray}) {
  return (
    <div className='tutorial'>

      <h1 className='intro-heading'>Welcome</h1>
      <p>Get started by clicking on   <button   id='genArrIntro' onClick={()=>resetArray()}>Generate Array</button></p>
     <p>- You can control the speed of animation and size of array using the sliders at top</p>
     <p>- Select the algorithm you wish to visualize</p>
     <p>- Status of the sorting can be seen at top </p>
  </div>
  )
}
