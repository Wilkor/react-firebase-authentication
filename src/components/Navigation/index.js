import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import sino from '../../assets/sino.svg'
import comment from '../../assets/comente.svg'
import home from '../../assets/navegador.svg'

import logo from '../../assets/girls-stuff.png'

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <>
        <NavigationAuth authUser={authUser} />
       
        </>
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);


const NavBottom = () => (
  	<>	
<div class="navbar" id="myNavbar">


<button type="button"  onClick="">
<Link to="/change"><img src={home} id="button-nav-bottom-1" alt="dislike" width="18px"/></Link>
</button>
<button type="button"  onClick="">
<Link to="/listcontact"><img src={comment} id="button-nav-bottom-2" alt="like" width="18px"/></Link>
</button>
<button type="button"  onClick="">
<img src={sino} id="button-nav-bottom-3" alt="like" width="18px"/>
</button>

</div>

</>
  )


const NavigationAuth = ({ authUser }) => (

  <>


<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="d-flex flex-grow-1">
        <span class="w-100 d-lg-none d-block"></span>
        <Link class="navbar-brand" to="/change">
        <img src={logo} width="70" height="50" />
        </Link>
        <div class="w-100 text-right">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar7">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
    </div>
    <div class="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar7">
        <ul class="navbar-nav ml-auto flex-nowrap">
            <li class="nav-item">
            <Link to="/change" className="nav-link" href="#">Feed de Troca</Link>
            </li>
            <li class="nav-item">
            <Link to="/notification" className="nav-link" href="#">Notificações</Link>
            </li>
            <li class="nav-item">
            <Link to="/listcontact" className="nav-link" href="#">Contatos Online</Link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Produto
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link to="/product" class="dropdown-item" href="#">Incluir Produto</Link>
                <Link to="/myproducts" class="dropdown-item" href="#">Meus Produtos</Link>
              </div>
      </li>
      <li>
      <SignOutButton authUser={authUser}/>
      </li>
      <li>
      <Link className="navbar-brand" to="#"><img src={authUser.providerData[0].photoURL}  className="rounded-circle" alt="" width="10px"/></Link>
      </li>
        </ul>
    </div>
</nav>

  {/* <nav className="navbar navbar-expand-lg navbar-light bg-light navbar navbar-dark bg-dark">
  <Link className="navbar-brand" to="#"><img src={authUser.providerData[0].photoURL}  className="rounded-circle" alt="" width="50px"/></Link>

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">

  <ul className="navbar-nav">
      <li className="nav-item active">
      <Link to="/change" className="nav-link" href="#">Feed de Troca</Link>
        
      </li>
      <li className="nav-item active">
      <Link to="/notification" className="nav-link" href="#">Notificações</Link>
        
      </li>
      <li className="nav-item active">
      <Link to="/listcontact" className="nav-link" href="#">Chat</Link>
        
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Produto
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link to="/product" class="dropdown-item" href="#">Incluir Produto</Link>
          <Link to="/myproducts" class="dropdown-item" href="#">Meus Produtos</Link>
        </div>
      </li>
      {/*<li className="nav-item">
        <Link to="/notification" className="nav-link" href="#">Notificações</Link>
      </li>
       <li className="nav-item">
      <Link to="/profile" className="nav-link" href="#">Perfil</Link>
      
      </li> 
   
      <li className="nav-item">
       <SignOutButton authUser={authUser}/>
       </li>
     </ul>

  </div>
</nav> */}

</>
);

const NavigationNonAuth = () => (
  <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light navbar navbar-dark bg-dark">
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">

  <ul className="navbar-nav">
      <li className="nav-item active">
      
        
      </li>
      <li class="nav-item dropdown">
       
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
         
        </div>
      </li>
      {/*<li className="nav-item">
        <Link to="/notification" className="nav-link" href="#">Notificações</Link>
      </li>
       <li className="nav-item">
      <Link to="/profile" className="nav-link" href="#">Perfil</Link>
      
      </li> */}
   
      <li className="nav-item">
     
       </li>
     </ul>

  </div>
</nav>
</>
);

export default Navigation;
