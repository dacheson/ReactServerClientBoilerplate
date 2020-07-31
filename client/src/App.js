import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Identicon from 'react-identicons';
import {
  UncontrolledTooltip
} from 'reactstrap';
import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import './App.css';
import { BedlamCards } from './BedlamCards';

const client = new W3CWebSocket('ws://127.0.0.1:8000');
const contentDefaultMessage = "Start writing your document here";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsers: [],
      userActivity: [],
      username: null,
      text: ''
    };
  }

  logInUser = () => {
    const username = this.username.value;
    if (username.trim()) {
      const data = {
        username
      };
      this.setState({
        ...data
      }, () => {
        client.send(JSON.stringify({
          ...data,
          type: "userevent"
        }));
      });
    }
  }

  /* When content changes, we send the
current content of the editor to the server. */
 onEditorStateChange = (text) => {
   client.send(JSON.stringify({
     type: "contentchange",
     username: this.state.username,
     content: text
   }));
 };

 componentWillMount() {
   client.onopen = () => {
     console.log('WebSocket Client Connected');
   };
   client.onmessage = (message) => {
     const dataFromServer = JSON.parse(message.data);
     const stateToChange = {};
     if (dataFromServer.type === "userevent") {
       stateToChange.currentUsers = Object.values(dataFromServer.data.users);
     } else if (dataFromServer.type === "contentchange") {
       stateToChange.text = dataFromServer.data.editorContent || contentDefaultMessage;
     }
     stateToChange.userActivity = dataFromServer.data.userActivity;
     this.setState({
       ...stateToChange
     });
   };
 }

  showLoginSection = () => (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__profile">
            <Identicon className="account__avatar" size={64} string="randomness" />
            <p className="account__name">Hello cog in machine!</p>
            <p className="account__sub">Join the Bedlam</p>
          </div>
          <input defaultValue="Your name here" name="username" ref={(input) => { this.username = input; }} className="form-control" />
          <button type="button" onClick={() => this.logInUser()} className="btn btn-primary account__btn">Join</button>
        </div>
      </div>
    </div>
  )

  showEditorSection = () => (
    <div className="main-content">
      <div className="document-holder">
        <div className="currentusers">
          {this.state.currentUsers.map(user => (
            <React.Fragment>
              <span id={user.username} className="userInfo" key={user.username}>
                <Identicon className="account__avatar" style={{ backgroundColor: user.randomcolor }} size={40} string={user.username} />
              </span>
              <UncontrolledTooltip placement="top" target={user.username}>
                {user.username}
              </UncontrolledTooltip>
            </React.Fragment>
          ))}
        </div>
        <Editor
          options={{
            placeholder: {
              text: this.state.text ? contentDefaultMessage : ""
            }
          }}
          className="body-editor"
          text={this.state.text}
          onChange={this.onEditorStateChange}
        />
      </div>
      <div className="history-holder">
        <ul>
          {this.state.userActivity.map((activity, index) => <li key={`activity-${index}`}>{activity}</li>)}
        </ul>
      </div>
    </div>
  )

  renderCard = (message, quip) => (
    <div className="card-outerBorder-message">
        <div className="card-outerBorder-message-box">
        {message}
        </div>
        <div className="card-bedlam-logo">
            Bedlam
        </div>
        <div className="card-quip">
          {quip}
        </div>
    </div>
  )

  renderHand = (cards) => {
    return (
      <div className="handOfPlayableCards">
       {cards.forEach(card => {
        return <div className="card"> {this.renderCard(card.message, card.quip) }</div>;
      }) }
      </div>
    );
  }

  renderPlayableCards = () => {
    let cards = [];
    cards.push({
      message: "A brain fart",
      quip: "Luckily these don't smell...much."
    });
    cards.push({
      message: "The detached loneliness of being a remote worker",
      quip: "Or being the only one who doesn't work out of corporate headquarters."
    });
    cards.push({
      message: "The mythical man month",
      quip: "Lots of leaders like to have babies in one month by adding 8 women to the project."
    });
    cards.push({
      message: "Complaining about stuff, only to find out that there’s already a Bedlam card for it",
      quip: "Happened like six times so far. Is this the seventh?"
    });
    cards.push({
      message: "Engineering politely thanking Legal, HR, Marketing or BizDev for their input",
      quip: "Thanks for the 'feedback'."
    });
    return (
      <React.Fragment>
        { cards.map(card => {
          { return this.renderCard(card.message, card.quip) }
        })}
        </React.Fragment>
      );
  }

  render() {
    const {
      username
    } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid">
          {username ? this.renderGameAndChat() : this.showLoginSection()}
        </div>
      </React.Fragment>
    );
  }

  renderGameAndChat() {
    return (
      <React.Fragment>
      <div className="handOfCards">
      { this.renderCard(BedlamCards[0].message, BedlamCards[0].quip) }
      { this.renderPlayableCards() }
      </div>
      { this.showEditorSection() }
      </React.Fragment>
    );
  }
}

export default App;