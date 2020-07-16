import React from 'react';
import enviar from '../../assets/enviar.svg'
import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <textarea
      className="input"
      placeholder="Digite uma mensagem..."
      
      rows="2" 
      cols="33"
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}>
         
      </textarea>
    <button className="sendButton" onClick={e => sendMessage(e)}><img src={enviar} width="20px"/></button>
  </form>
)

export default Input;