import React, { useState } from 'react'
import './Join.css';
import logo from '../../images/logo.png'
import {Link} from 'react-router-dom';

let user;
export default function Join() {
 
  const sendUser=(()=>{
     user = document.getElementById('joinInput').value;
     document.getElementById('joinInput').value="";
  })
  const [name,setName]=useState("");
  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
            <img src={logo} alt='logo error'/>
            <h1>Aj Chat</h1>
            <input onChange={(e)=>setName(e.target.value)} type='text' id='joinInput' placeholder='Enter your name'/>
           <Link onClick={(event)=>!name?event.preventDefault():null} to="/chat"><button onClick={sendUser} className='joinbtn'>Login</button></Link> 
        </div>
    </div>
  )
}

export {user};
