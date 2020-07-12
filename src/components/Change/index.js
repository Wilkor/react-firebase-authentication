import React, { Component } from 'react';
import dislike from  '../../assets/dislike.svg';
import logo from  '../../assets/logo.svg';
import like from  '../../assets/like.svg';
import emojiTriste from  '../../assets/emojiTriste.png';
import api from '../../Service/api';
import {Link} from 'react-router-dom';
import io from 'socket.io-client'

import itsamatch from '../../assets/itsamatch.png';

import './main.css';


class Change extends Component {

  constructor(props) {
    super(props);
    this.state = {
       product:[],
       user:'',
       matchDev: ''
    }

    this.getUser();
   this.handleGetProducts();

  }


   isMatch = () => {
    const user = localStorage.getItem('_id');
      const socket = io('https://tindev-wilkor-backend.herokuapp.com', {
        query:{user:user}
      })

      socket.on('match',dev=>{
        this.setState({matchDev:dev})
      })

   }

  getUser = () => {

    const user = localStorage.getItem('_id');
     this.setState({user: user})

  }
  handleGetProducts = async () => {
    
    const userId = localStorage.getItem('_id');
    const response = await api.get(`/product/${userId}`)
    const newProduct = response.data.filter(user =>  {

        return user.user !== userId
    })

    this.setState({product:newProduct});


  }

  handleDislike = async (id) => {
    const user = localStorage.getItem('_id');
    await api.post(`/user/${id}/dislikes`,null,{headers:{
        user:user
    }})

     
    const newProduct = this.state.product.filter(user=> user.user != id)
    this.setState({product:newProduct});
 }

    handleLike = async  (id) => {
      const user = localStorage.getItem('_id');
    await api.post(`/user/${id}/likes`,null,{headers:{
       user: user
   }})
   console.log('produto', this.state.product)
   const newProduct = this.state.product.filter(user=> user.user != id)
   this.setState({product: newProduct});
   this.isMatch()
 }

  render (){

    return (
      <div className="main-container">
 
      {this.state.product.length > 0 ? (
          <ul> 
          {this.state.product.map(produto => (
          <li key={produto._id}>
          <img src={produto.urlFireBase} alt="TinDev"/>
          <footer>
          <strong>{produto.productName}</strong>
          
          </footer>

          <div className="buttons">

          <button type="button" onClick={() => this.handleDislike(produto.user)}>
          <img src={dislike} alt="dislike"/>
          </button>
          <button type="button"  onClick={() => this.handleLike(produto.user)}>
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

      { this.state.matchDev &&(

        <div className="match-container">
         <img src={itsamatch} alt="its a match"/>
         <img className="avatar" src={this.state.matchDev.urlFireBase} alt="avatar"/>
         <strong>{this.state.matchDev.name}</strong>
         <button type="button" onClick={()=> this.setState({matchDev: null})}>
          fechar
          </button>
        </div>


      )
       }

          
              </div>

      
  )
      }
  
}

export default Change;


