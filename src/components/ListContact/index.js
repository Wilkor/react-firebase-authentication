import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import api from '../../Service/api';
import './index.css'

  


const ListContact = () => {

   const [userOnLine, setUserOnLine] = useState([]);

    useEffect( () => {
        
      setTimeout(async() => {
    
        const userIdLogged = localStorage.getItem('_id');
      
         const response = await api.get(`/user`)

         const responseWithLinkChat = response.data.map((users) => {

          const {user} = JSON.parse(localStorage.getItem('userObject'));

          return {...users, linkChat:`/chat?name=${user.displayName}&room=${uuidv4()}&idUser=${users._id}`}


        })
        //.filter(users => userIdLogged !== users._id)
        
        setUserOnLine(responseWithLinkChat);
    
      }, 400)
    
    },[])


 return (
  <>
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-8 col-lg-5">
              <h6 class="text-muted">Pessoas On-line</h6> 
                {
                  userOnLine.map( user  => (
                     
                <ul key={user._id} class="list-group">
                  <Link to={user.linkChat}> 
                    <li  class="list-group-item d-flex justify-content-between align-items-center">
                      <div class="image-parent">
                          <img src={user.urlFireBase} class="rounded-circle" alt="quixote"/>
                      </div>
                     {user.name}
                    </li>
                    </Link>
                </ul>

                ))}

            </div>
          </div>
        </div>
                
        </>

 )




}

 

export default ListContact;
