import React, { Component } from 'react';


class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

   


  render() {
    const { authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <a className="navbar-brand" href="#">
                <img src={message.avatar}  
                className="rounded-circler-commnets" alt="" width="30px"/></a>
                <span className="messageBox1 backgroundBlue1">{message.text}</span>
                 {message.editedAt && <span>(Editado)</span>}

                 {authUser.uid === message.userId && (
          <>
          <br/>
            {editMode ? (
              <span>
                <button  className="sendMessage" onClick={this.onSaveEditText}>Salvar</button>
                <button  className="sendMessage" onClick={this.onToggleEditMode}>Voltar</button>
              </span>
            ) : (
              ''
            )}

            {!editMode && (
              <button
              className="sendMessage"
                type="button"
                onClick={() => onRemoveMessage(message.uid)}
              >
                Apagar
              </button>
            )}
         </>
        )}

            <hr/>
          </span>
        )}

       
      </li>
    );
  }
}

export default MessageItem;
