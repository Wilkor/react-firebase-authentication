import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import queryString from 'query-string';
import './Join.css';

export default function SignIn({ location }) {

  const [url, setUrl] = useState('');

  useEffect(() => {

    const { name, room } = queryString.parse(location.search);

     setUrl(`https://chat-docs-client.herokuapp.com/chat?name=${name}&room=${room}`)

  }, [location.search]);


  return (
    <>
   <br/><br/><br/>
  <iframe src={url} 
  width="99%" height="600px" scrolling="no"></iframe>
    </>
  );
}
