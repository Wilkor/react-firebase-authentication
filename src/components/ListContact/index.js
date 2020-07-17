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


        }).filter(users => userIdLogged !== users._id)
        
        setUserOnLine(responseWithLinkChat);
    
      }, 400)
    
    },[])


 return (
  <>

            <br/> <br/>   <br/> <br/>  <br/>   <br/>
              <ul   class="list-group">
                <li class="list-group-item active">Amigas On-Line</li>
                {
                  userOnLine.map( user  => (
                  <Link to={user.linkChat}> 
                      <li class="list-group-item">
                      <div class="image-parent">
                          <img src={user.urlFireBase} class="rounded-circle" alt="quixote"/>
                      </div>
                       {user.name}
                      </li>   
               
                    </Link>
             

                ))}
                </ul>
         
      
         
        </>

 )




}

 

export default ListContact;
