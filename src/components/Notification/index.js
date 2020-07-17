import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import api from '../../Service/api';
import './index.css'


const Notification = () => {

   const [userOnLine, setUserOnLine] = useState([]);

    useEffect( () => {
        
      setTimeout(async() => {
    
        const userIdLogged = localStorage.getItem('_id');
      
         const response = await api.get(`/notification/${userIdLogged}`)
          
         const userIdLoggedWithLink = response.data.map( userIdLoggedWithLink => {
           return {...userIdLoggedWithLink, linkProduct:`/change?productId=${userIdLoggedWithLink.productId}` }
         })

          setUserOnLine(userIdLoggedWithLink);
    
      }, 400)
    
    },[])


 return (

      
       <>
        <br/>  <br/>   <br/> <br/>  <br/>   <br/>
        <ul   class="list-group">
          <li class="list-group-item active">Suas Notificações</li>
          {
            userOnLine.map( user  => (
            <Link to={user.linkProduct}> 
                <li class="list-group-item">
                <div class="image-parent">
                    <img src={user.urlFireBase} class="rounded-circle" alt="quixote"/>
                </div>
                {user.name}, curtiu seu post.
                </li>   
        
              </Link>


          ))}
          </ul>


      </>

 )




}

 

export default Notification;
