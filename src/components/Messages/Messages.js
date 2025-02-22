import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import MessageList from './MessageList';

import api from '../../Service/api';


import './main.css';
class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key,
          }));

          this.setState({
            messages: messageList.filter(messageProduct => messageProduct.product === this.props.product ),
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      product: this.props.product,
      avatar: authUser.providerData[0].photoURL,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    api.post('/comments', {
      name:authUser.providerData[0].displayName,
      product: this.props.product,
      avatar: authUser.providerData[0].photoURL
    }).then(res => console.log(res)).catch(error => console.log(error))

    this.setState({ text: '' });
    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && messages &&  messages.product === this.props.product &&(
              <a className="btn-link" onClick={this.onNextPage}>
                Ver mais
              </a>
            )}

            {loading && <div>Carregando ...</div>}

            {messages && (
              <MessageList
                authUser={authUser}
                messages={messages}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

                
            {!messages && <div><b>{authUser.providerData[0].displayName}</b>, Seja o primeiro a comentar isso ...</div>}
             <br></br>
            <form
              onSubmit={event =>
                this.onCreateMessage(event, authUser)
              }
            >
        

               <textarea id="story" name="story"  
                  className="form-control"  
                  placeholder="Escreva um comentário..."
                  onChange={this.onChangeText}
                  value={text}
                  rows="2" cols="33">
                  
                  </textarea>
      
                 <button className="sendMessage" type="submit"> Publicar </button>

         
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Messages);
