import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';
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
     this.setState({user: localStorage.getItem('userId')})
    
     const response = await api.post('/product', this.state);

     if (response) {
       
      alert("Cadastrado com sucesso")
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
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      
    };
    return (

      <main role="main" class="container">
<div >
  
  <div className="incluir-produto" >
 <form>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputCity">Nome do Produto</label>
      <input type="text" className="form-control" id="inputCity" onChange = {(event) => this.setState({productName:event.target.value})}/>
    </div>
    <div className="form-group col-md-4">
      <label for="inputEstado">Categoria </label>
      <select id="inputEstado" className="form-control" onChange={(event) => this.setState({category:event.target.value})}>
        <option selected>Escolher...</option>
        <option>Brinco</option>
        <option>Pulseira</option>
        <option>Perfume</option>
        <option>Bolsa</option>
        <option>Relógio</option>
      </select>
    </div>

    <div className="form-group col-md-2">
  
    <div class="button-wrapper"><span class="label">Carregar Imagem</span>
  
    <input type="file" name="upload" id="upload" class="btn btn-primary" placeholder="Upload File" onChange={this.handleChange}/>

    </div>
  

    </div>
        

  </div>
  <div className="form-row">
  <div className="form-group col-md-2">
  <img src={this.state.urlFireBase || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>
  </div>
  </div>
  <button type="submit" className="btn btn-primary"  onClick={(event) => this.handleSubmit(event)}>Gravar Produto</button>
</form>

 </div>
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