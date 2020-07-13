import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import api from '../../../Service/api';


const includeProduto = () => (
 <>
  <ImageUpload />
 </>
);

class ImageUploadBase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      urlFireBase: '',
      progress: 0,
      productName: '',
      category: '',
      user: localStorage.getItem('_id')
    }
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }
  
  handleSubmit =  async (e) => {
    
    e.preventDefault();

     const {productName, category} = this.state;
     if(productName == "" && category == "") {
      
      NotificationManager.warning('Faltam dados para cadastrar o produto!', 'Atençaõ!');

      return false;

     }
     this.setState({user: localStorage.getItem('userId')})
    
     const response = await api.post('/product', this.state);

     if (response) {
       
      NotificationManager.success('Produto cadastrado com sucesso!', 'Concluido!');
      this.setState({image:null})
      this.setState({urlFireBase: ''})
      this.setState({progress: 0})
      this.setState({productName: ''})
      this.setState({category: ''})
      
    }

  }
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
     
    }

    setTimeout(() => {
      this.handleUpload()
    }, 1000)
  }
  handleUpload = () => {
      const {image} = this.state;
      const uploadTask = this.props.firebase.storage.ref(`products/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      }, 
      (error) => {
           
        console.log(error);
      }, 
    () => {
        
        this.props.firebase.storage.ref('products').child(image.name).getDownloadURL().then(urlFireBase => {
           
            this.setState({urlFireBase});
        })
    });
  }
  render() {

    return (

   
      <main role="main" class="container">
             <br/>  <br/> <br/>  
      <div class="my-3 p-3 bg-white rounded shadow-sm">
          <h4 class="border-bottom border-gray pb-2 mb-0">Incluir Produto</h4>
          <br/>
            <div className="form-group text-grey">

          
        
            <div className="form-group col-md-12">

            <img src={this.state.urlFireBase || 'http://via.placeholder.com/400x300'} alt="Uploaded images"  
            className="rounded-circle-include-product" height="150" width="150"/>
      
            </div>
          
          <form>
          <div className="form-row">
              <label for="inputCity">Descreva porque trocar:</label>
              <textarea id="story" name="story"  className="form-control"  onChange = {(event) => this.setState({productName:event.target.value})}
                  rows="5" cols="33"></textarea>
              
           
           
              <label for="inputEstado">Categoria </label>
              <select id="inputEstado" className="form-control" onChange={(event) => this.setState({category:event.target.value})}>
                <option selected>Escolher...</option>
                <option>Brinco</option>
                <option>Pulseira</option>
                <option>Perfume</option>
                <option>Bolsa</option>
                <option>Relógio</option>
              </select>
               <br/><br/>
               
                  <div className="form-group" >
                
                  <div class="button-wrapper"><span class="label">Carregar Imagem</span>

                  <input type="file" name="upload" id="upload" class="btn btn-primary" placeholder="Upload File" onChange={this.handleChange}/>

                </div>
                </div>
                <div className="form-group ">
                  <button type="submit" className="btn btn-primary"  onClick={(event) => this.handleSubmit(event)}>Gravar Produto</button>
              </div>
            </div>
    
          </form>


        
            </div>
            <NotificationContainer/>
        </div>
    </main>
      
    )
  }

}
const ImageUpload = compose(
  withRouter,
  withFirebase,
)(ImageUploadBase);

export default includeProduto;
export {  ImageUpload };