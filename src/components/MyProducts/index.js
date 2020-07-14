import React, { Component } from 'react';
import dislike from  '../../assets/dislike.svg';
import lapis from  '../../assets/lapis.png';
import api from '../../Service/api';


import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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
   
    await api.delete(`/product/${id}`).then(res => {

     if(res){

       NotificationManager.success('Produto excluido com sucesso!', 'Concluido!');
       this.handleGetProducts();
     }
    }).catch(err => {
      NotificationManager.erro('Erro ao excluir, tente novamente!', 'Erro!');
    })

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
          <strong>{produto.category}</strong>
          <p>{produto.productName}</p>
          
          </footer>

          <div className="buttons">

          <button type="button" onClick={() => this.handleDelete(produto._id)}>
          <img src={dislike} alt="dislike"/>
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

<NotificationContainer/>
              </div>

      
  )
      }
  
}

export default MyProducts;


