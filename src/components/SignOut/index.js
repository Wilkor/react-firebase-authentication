import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
<Link className="nav-link"  to="/signin" onClick={firebase.doSignOut}> Sair</Link>
);

export default withFirebase(SignOutButton);
