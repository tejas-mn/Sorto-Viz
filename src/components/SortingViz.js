import React, { useState } from 'react'
import './sorting-viz.css';
import Stats from './status.js'
import Slider from './Slider';
import Tutorial from './intro';
import { bubble_Sort } from '../sortingAlgos/bubbleSort';
import { selection_Sort } from '../sortingAlgos/selectionSort';
import {quick_Sort} from '../sortingAlgos/quickSort'
import { merge_Sort } from '../sortingAlgos/mergeSort';
import BarContainer from './BarContainer';
import Header from './Header';

const colors = ['orange' , 'red' , 'green'];

let swaps = 0;
let cmp = 0;
let sz = 0;

function randomIntFromInterval(min , max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function SortingViz() {   
    let maxi = (window.innerWidth<=600)? (30) : (50);
    const [array , changeArray] = useState([]);
    const [left , setLeft] = useState(-1); 
    const [right,setRight] = useState(-1);
    const [mode , setMode] = useState(-1);
    const [cnt , setCnt] = useState(0);
    const [speed , setSpeed] = useState(0);
    const [tut , setTut] = useState(true)
    
    
    function resetArray(){
      
      setTut(false);
      if(tut===true) sz = maxi
      document.getElementById('genArr').style.animation = 'none';
      setMode(-1);
      setRight(-1);
      setLeft(-1);
      setCnt(0);
      cmp=0;
      swaps=0;
      for(let k=0;k<sz;k++){
          
            setTimeout(()=>{
            if(document.getElementsByClassName('array-bar')[k] !== undefined){
            document.getElementsByClassName('array-bar')[k].style.backgroundColor = '#0d003f';
            document.getElementsByClassName('array-bar')[k].style.borderRight = '10px solid rgb(40, 40, 250)';}
        } , k*20);
        }

        console.log(sz);
        const newArray = [];
        
        for(var i=0;i<sz;i++){
            newArray.push(randomIntFromInterval( 30, 250));
        }          
        let newww = newArray
        changeArray(newww)        
        console.log(newww);
    }

    function animate(f){
        if(sz===0) return;
        setCnt(0);
        cmp = 0;
        swaps = 0;
        let swapArr = f;
        disableButtons();
        let dummy = [...array];

        for(let k=0;k<swapArr.length;k++){
            let i = swapArr[k][0]; let j = swapArr[k][1]; let m = swapArr[k][2];
            
               setTimeout(()=>{
                    setCnt((cnt)=>cnt+1)
                    let dup = [...dummy];   
                    setLeft(i);
                    setRight(j);
                    setMode(m)
                    if(m===1){
                        swaps = swaps + 1;
                        [dup[i] , dup[j]] = [dup[j] , dup[i]]
                    }else{
                        cmp = cmp+1;
                    }
                    changeArray(dup);
                    dummy = dup;
                    console.log(speed);
                    
                } , k*(1010 - speed));
         
        }

        setTimeout(()=>{
                setLeft(-2);
                setRight(-2);
                setMode(-1);
                enableButtons();
                for(let l=0;l<array.length;l++){
                    setTimeout(()=>{
                        document.getElementsByClassName('array-bar')[l].style.backgroundColor = '#00de8d';
                        document.getElementsByClassName('array-bar')[l].style.borderRight = '10px solid #00ffff';
                    } , l*20);
                }

        } , swapArr.length *(1010- speed));
    }
 
    function changeSize(e){
        sz = e.target.value
         resetArray();
    }
    
    function changeSpeed(e){
        console.log(e.target.value);
        setSpeed(e.target.value)
    }
    function disableButtons(){
        const disabledArr = document.getElementsByClassName('disableWhileSorting');
        for(let k = 0; k < disabledArr.length; k++){
          disabledArr[k].disabled = true;
           disabledArr[k].style.backgroundColor = 'rgb(36, 36, 36)';
           disabledArr[k].style.cursor = 'not-allowed';
        }
      }
    
      function enableButtons(){
        const disabledArr = document.getElementsByClassName('disableWhileSorting');
        for(let k = 0; k < disabledArr.length; k++){
          disabledArr[k].disabled=false;
          if(disabledArr[k].type === "range"){
            disabledArr[k].style.backgroundColor = '#d3d3d3';
          }
          else disabledArr[k].style.backgroundColor =  'rgb(25, 0, 139)';
          disabledArr[k].style.cursor = '';
        }
      }

    return (
        <div className='viz'>
            <Header/>            
            
            <div className='info'>
                <Slider changeSize={changeSize} changeSpeed = {changeSpeed} sz = {sz} speed = {speed}   maxi = {maxi}/>
            </div>
            <div className='info'>
            <Stats time = {cnt} left={left} right = {right} sz = {sz} cmp = {cmp} swaps={swaps}/>
            </div>
       
            {(tut===true)?( <Tutorial resetArray={ resetArray}/>):( <BarContainer arr ={array} colors ={colors} mode ={mode} left ={left} right = {right} />)}      
            <div className='btns'>
                <button  className="disableWhileSorting" id='genArr' onClick={()=>resetArray()}>Generate Array</button>
                <button  className="disableWhileSorting" onClick={()=>animate(quick_Sort(array))}>Quick Sort</button>
                <button  className="disableWhileSorting" onClick={()=>animate(merge_Sort(array))}>Merge Sort</button>
                <button  className="disableWhileSorting" onClick={()=>animate(bubble_Sort(array))}>Bubble Sort</button>
                <button  className="disableWhileSorting" onClick={()=>animate(selection_Sort(array))}>Selection Sort</button>   
            </div>
        </div>
    )
}