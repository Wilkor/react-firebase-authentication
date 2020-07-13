import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


const config = {
  apiKey: "AIzaSyAM7Vdv8QrMOr8PHswMaM7uLL_auFay0RY",
  authDomain: "changemegirl-27b59.firebaseapp.com",
  databaseURL: "https://changemegirl-27b59.firebaseio.com",
  projectId: "changemegirl-27b59",
  storageBucket: "changemegirl-27b59.appspot.com",
  messagingSenderId: "36231963815",
  appId: "1:36231963815:web:0a55c4dbcdd73141556782",
  measurementId: "G-07RELSEFHN"
};

class Firebase {
  constructor() {
  
    app.initializeApp(config);
    /* Helper */
    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;
    
    /* Firebase APIs */
    this.auth = app.auth();
    this.db = app.database();

    /* Social Sign In Method Provider */
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
    this.storage = new app.storage()

  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => {
    this.auth.signOut();
    localStorage.clear();
  }

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

 

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            // if (!dbUser.roles) {
            //   dbUser.roles = {};
            // }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');
  storage =  () => this.firebase.storage();
}

export default Firebase;
