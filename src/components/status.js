import React from 'react'

export default function Stats({time,sz , left , right , cmp ,swaps}) {
  
  return (
    <>
  
        <p>Size: {sz} | </p>
        {/* <p>Time : {time} | </p> */}
        <p>Comparisons: {cmp} | </p>
        <p>Swaps: {swaps} |</p>
    {(left <0 && right < 0)?((left===-1 && right===-1)?(<p>Unsorted</p>):(<p>Sorted</p> )):(<p>Sorting...</p>)
}     
    </>
  )
}