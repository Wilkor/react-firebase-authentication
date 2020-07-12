import React, { Component } from 'react';
import dislike from  '../../assets/dislike.svg';
import logo from  '../../assets/logo.svg';
import like from  '../../assets/like.svg';
import lapis from  '../../assets/lapis.png';
import api from '../../Service/api';
import {Link} from 'react-router-dom';
import io from 'socket.io-client'

import itsamatch from '../../assets/itsamatch.png';

import './main.css';


class MyProducts extends Component {

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

  getUser = () => {

    const user = localStorage.getItem('_id');
     this.setState({user: user})

  }
  handleGetProducts = async () => {
    const user = localStorage.getItem('_id');


    const response = await api.get(`/myproduct/${user}`);

    this.setState({product: response.data})

  }

  handleDelete = async (id) => {
   
    await api.delete(`/product/${id}`)

     
    const newProduct = this.state.product.filter(user=> user.user != id)
    this.setState({product:newProduct});
 }

    handlEdit = async  (id) => {

    await api.put(`/pruduct/${id}`)
    console.log('produto', this.state.product)
    const newProduct = this.state.product.filter(user=> user.user != id)
    this.setState({product: newProduct});
  
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

          <button type="button" onClick={() => this.handleDelete(produto._id)}>
          <img src={dislike} alt="dislike"/>
          </button>
          <button type="button"  onClick={() => this.handlEdit(produto._id)}>
          <img src={lapis} alt="like" width="30px"/>
          </button>
          
          </div>

          </li>
          ))}

      </ul>
      ) : <div className="empty"> Você não possui nenhum produto para troca.
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

export default MyProducts;


