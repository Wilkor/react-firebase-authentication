import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (

  <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light navbar navbar-dark bg-dark">
  <Link className="navbar-brand" to="#"><img src={authUser.providerData[0].photoURL}  className="rounded-circle" alt="" width="50"/></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">

  <ul className="navbar-nav">
      <li className="nav-item active">
      <Link to="/change" className="nav-link" href="#">Feed de Troca</Link>
        
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
      
      </li> */}
   
      <li className="nav-item">
       <SignOutButton/>
       </li>
     </ul>

  </div>
</nav>
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
