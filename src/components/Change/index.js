import React, {useEffect, useState} from 'react';
import dislike from  '../../assets/dislike.svg';
import like from  '../../assets/like.svg';
import emojiTriste from  '../../assets/emojiTriste.png';
import api from '../../Service/api';
import io from 'socket.io-client'


import itsamatch from '../../assets/itsamatch.png';
import './main.css';

const   Change = () => {

    const [product,setProduct] = useState([])
    const [matchDev,setMatchDev] = useState(null)
    const [user, setUser] = useState('')

    const socket = io('https://tindev-wilkor-backend.herokuapp.com', {
      query:{user:user}
    })

    socket.on('match',dev =>{

      
      setMatchDev(dev);


    })


  useEffect(async () => {
      const user = localStorage.getItem('_id');
      setUser(user)
      const response = await api.get(`/product/${user}`)
      const newProduct = response.data.filter(user =>  user.user !== user)
      setProduct(newProduct);
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
          <strong>{produto.productName}</strong>
          
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
         <button type="button" onClick={()=> setMatchDev(null)}>
          fechar
          </button>
        </div>


      )
       }

          
              </div>

      </>
  )
      

}

export default Change;

