import React, {useEffect, useState} from 'react';
import dislike from  '../../assets/dislike.svg';
import like from  '../../assets/like.svg';
import emojiTriste from  '../../assets/emojiTriste.png';
import { Link } from "react-router-dom";


import api from '../../Service/api';
import io from 'socket.io-client'


import itsamatch from '../../assets/itsamatch.png';
import './main.css';

const   Change = () => {

    const [product,setProduct] = useState([])
    const [matchDev,setMatchDev] = useState(null)
    const [user, setUser] = useState('');
    const [url, setUrl] = useState('')

    const socket = io('https://tindev-wilkor-backend.herokuapp.com', {
      query:{user:user}
    })

    socket.on('match', dev => {
    
        setMatchDev(dev);
        const {user} = JSON.parse(localStorage.getItem('userObject'));
        setUrl(`/join?name=${user.displayName}&room=changeme`)


    })


  useEffect( () => {
    
      setTimeout( async () => {
         
        const userId =  localStorage.getItem('_id');

        const response = await api.get(`/product/${userId}`)
        const newProduct = response.data.filter(user =>  user.user !== user)
        setProduct(newProduct);
        setUser(userId)

      }, 400)
 
  },[])


  async function handleDislike(id) {
    
    await api.post(`/user/${user}/dislikes`,null,{headers:{
        user:id
    }})

     
    const newProduct = product.filter(user=> user.user != id)
     setProduct(newProduct);
 }

 async function handleLike(id) {

      await api.post(`/user/${user}/likes`,null,{headers:{user: id}})
      console.log('produto', product)
      const newProduct = product.filter(user=> user.user != id)
      setProduct(newProduct);
     
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
          </footer>

          <div className="buttons">

          <button type="button" onClick={() => handleDislike(produto.user)}>
          <img src={dislike} alt="dislike"/>
          </button>
          <button type="button"  onClick={() => handleLike(produto.user)}>
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

          
              </div>

      </>
  )
      

}

export default Change;

