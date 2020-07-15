import React, {useEffect, useState} from 'react';
import dislike from  '../../assets/dislike.svg';
import like from  '../../assets/like.svg';
import emojiTriste from  '../../assets/emojiTriste.png';
import { Link } from "react-router-dom";

import  Comments from '../Messages/index'
import api from '../../Service/api';
import io from 'socket.io-client'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


import itsamatch from '../../assets/itsamatch.png';
import './main.css';

const   Change = () => {

    const [product,setProduct] = useState([])
    const [matchDev,setMatchDev] = useState(null)
    const [user, setUser] = useState('');
    const [url, setUrl] = useState('')
     const [count, setCount] = useState(0);

    const socket = io('http://localhost:3333', {
      query:{user:user}
    })

    socket.on('match', dev => {
    

       if (dev._id !== user) {

         NotificationManager.success(`Seu produto acabou de ser curtido por ${dev.name}`, 'Notificação!');
         // setMatchDev(dev);
         // const {user} = JSON.parse(localStorage.getItem('userObject'));
         // setUrl(`/join?name=${user.displayName}&room=changeme`)
       }

    })


  useEffect( () => {
    
      setTimeout(async() => {
         
        const userId =  localStorage.getItem('_id');
        setUser(userId)

        const response = await api.get(`/product/${userId}`)
        setProduct(response.data);

      }, 400)
 
  },[count])


  async function handleDislike(id) {

    await api.post(`/user/${id}/dislikes`,null,{headers:{
        user:id
    }})

    setCount(count+1)
 }

 async function handleLike(id) {

      await api.post(`/user/${id}/likes`,null,{headers:{user: user}})
      setProduct(product);
      setCount(count+1)
      NotificationManager.success(`Produto curtido!`, 'Notificação!');
 }


    return (
      <>
  
      <div className="main-container">
       
      {product.length > 0 ? (
          <ul> 
          {product.map(produto => (
           
          <li key={produto._id}>
          <img src={produto.urlFireBase} alt="TinDev"/>
          <footer>
          <strong>{produto.category}</strong>
          <p>{produto.productName}</p>

          <div id="accordion">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" data-toggle="collapse" data-target={"#collapseOne_" + produto._id} aria-expanded="true" aria-controls={"collapseOne_" + produto._id}>
                    Ver comentários
                  </button>
                </h5>
              </div>

              <div id={"collapseOne_"+ produto._id} class="collapse collapsed" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                 <Comments product={produto._id}/>
                </div>
              </div>
            </div>
  
       
          </div>

          </footer>

          <div className="buttons">

          <button type="button" onClick={() => handleDislike(produto._id)}>
          <img src={dislike} alt="dislike"/>
          </button>
          <button type="button"  onClick={() => handleLike(produto._id)}>
          <img src={like} alt="like"/>
          </button>
        
          
          </div>

          </li>
          ))}

      </ul>
      ) : <div className="empty"> 
       <img className="emojiTriste" src={emojiTriste} alt="avatar"/>
          <br></br>
          Poxa, que pena.. acabaram os produtos para você trocar, mas já já vem mais!
          </div>
      
      }

      { matchDev &&(

        <div className="match-container">
         <img src={itsamatch} alt="its a match"/>
         <img className="avatar" src={matchDev.urlFireBase} alt="avatar"/>
         <strong>{matchDev.name}</strong>
         <Link to={url}>Ir para o Chat</Link>
        </div>


      )
       }

<NotificationContainer/>
              </div>

      </>
  )
      

}

export default Change;

