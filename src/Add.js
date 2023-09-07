import React,{useState} from 'react';
import './App.css';

function Add() {
  const [string,setString]=useState('');
  const [isDisplay,setDisplay]=useState(true);
  const handleChange=(e)=>{
    setDisplay(false);
    setString(e.target.value);
  }
  const formatString=()=>{
    setDisplay(true);
    let temp=string;
    temp=temp.replace(/\s+/g, '');
    setString(temp);
  }
  return (
    <div className="App">
      <input type="text" placeholder="Enter a string..." onChange={handleChange}/>
      <button onClick={formatString}>Format String</button>
      <b><p>{isDisplay && string}</p></b>
      
    </div>
  );
}

export default Add;