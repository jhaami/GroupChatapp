import React, { useEffect, useState } from 'react';
import { user } from '../join/Join';
import socketIO from "socket.io-client";
import './Chat.css';
import { IoMdSend } from "react-icons/io";
import Message from '../message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom'

const ENDPOINT = 'http://localhost:4500/';
let socket;

function Chat() {
    const [id, setId] = useState('');
    const [messages,setMessages] = useState([])
  
    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ['websocket'] });
        socket.on('connect', () => {
            setId(socket.id);
        });

        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
            setMessages([...messages,data]);
        });

        socket.on('userJoined', (data) => {
            setMessages([...messages,data]);
        });

        socket.on('leave', (data) => {
            setMessages([...messages,data]);
        });

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    };

    useEffect(() => {
        const handleMessage = (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        };
    
        socket.on('sendMessage', handleMessage);
    
        return () => {
            socket.off('sendMessage', handleMessage);
            if (socket) {
                socket.disconnect();
            }
        };
    }, []); 
    
    return (
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='header'>
                    <h2>Aj Chat</h2>
                    <a href='/'><div>&times;</div></a>
                </div>
                <ReactScrollToBottom className='chatBox'>
                   {
                    messages.map((item,i)=>{
                        return(
                            <Message key={i} user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}/>
                        )
                    })
                   }
                </ReactScrollToBottom>
                <div className='inputBox'>
                    <input  onKeyPress={(event) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
            send();
        }
    }} type='text' id='chatInput' />
                    <button onClick={send} className='sendBtn'><IoMdSend /></button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
