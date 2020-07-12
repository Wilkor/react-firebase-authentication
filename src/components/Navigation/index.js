import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

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
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
  <a className="navbar-brand" href="#">
  <img src={authUser.providerData[0].photoURL} width="40" height="40" className="rounded-circle"/>
 
  </a>
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
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
      {/* <li className="nav-item">
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


  </>
  
);

export default Navigation;
