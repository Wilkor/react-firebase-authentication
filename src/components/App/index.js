import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import io from "socket.io-client";

import Navigation from '../Navigation';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import Product from '../../components/Product/IncludeProduct/index';
import Change from '../../components/Change/index';
import MyProducts from '../../components/MyProducts/index';
import Notification from '../../components/Notification/index';
import ListContact from '../../components/ListContact/index';
import Chat from '../../components/Chat/Chat';
import environment from '../../constants/environment';

import * as ROUTES from '../../constants/routes';
import { withAuthentication, AuthUserContext} from '../Session';


const App = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <>
 
        <Navigation1 authUser={authUser} />
       
        </>
      ) : (
       <>
   
        <Navigation1/>
        </>
      )
    }
  </AuthUserContext.Consumer>
);



const Navigation1 = ({authUser}) => (
  <Router>
  <div>
    <Navigation />
    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
    <Route path={ROUTES.LIST}       component={ListContact} />
    <Route path={ROUTES.CHAT}       component={Chat} />
    <Route path={ROUTES.HOME}       component={HomePage} />
    <Route path={ROUTES.PRODUCT}    component={Product} />
    <Route path={ROUTES.CHANGE}     component={Change} history={Route} />
    <Route path={ROUTES.MYPRODUCTS} component={MyProducts} />
    <Route path={ROUTES.MESSAGE} component={Notification} />
  </div>
</Router>
)

const Navigation2 = () => (

   <div>
  
  </div>
)
export default withAuthentication(App);
