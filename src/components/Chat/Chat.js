import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Transcription from '../Transcription/Message';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import environment from '../../constants/environment';
import api from '../../Service/api'
import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = environment.HOST;

  useEffect(() => {

    const { name, room, idUser } = queryString.parse(location.search);

    api.post('/invite', {name, room, idUser});

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);



    });
    
  
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
   

    < >

        <main  role="main" className="container" id="transcript-chat">
          <Transcription messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </main>
    </>
    
  );
}

export default Chat;
