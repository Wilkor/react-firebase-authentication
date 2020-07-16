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

          setUserOnLine(response.data);
    
      }, 400)
    
    },[])


 return (
  <>
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-8 col-lg-5">
              <h6 class="text-muted">Notificação</h6> 
                {
                  userOnLine.map( user  => (
                     
                <ul key={user._id} class="list-group">
                
                    <li  class="list-group-item d-flex justify-content-between align-items-center">
                      <div class="image-parent">
                          <img src={user.urlFireBase} class="rounded-circle" alt="quixote"/>
                      </div>
                     {user.name}
                    </li>
                   
                </ul>

                ))}

            </div>
          </div>
        </div>
                
        </>

 )




}

 

export default Notification;
