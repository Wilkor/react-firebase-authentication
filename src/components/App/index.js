import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import Product from '../../components/Product/IncludeProduct/index';
import Change from '../../components/Change/index';
import MyProducts from '../../components/MyProducts/index';
import Profile from '../../components/MyProfile/index';
import Notification from '../../components/Messages/Messages';

import Join from '../../components/Join/Join';
import Chat from '../../components/Chat/Chat';


import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />
      
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage} 
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.PRODUCT} component={Product} />
      <Route path={ROUTES.CHANGE} component={Change} />
      <Route path={ROUTES.MYPRODUCTS} component={MyProducts} />
      <Route path={ROUTES.JOIN}  component={Join} />
      <Route path={ROUTES.CHAT} component={Chat} />
    </div>
  </Router>
);

export default withAuthentication(App);
