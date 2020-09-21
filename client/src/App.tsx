import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Navbar, NavbarBrand, UncontrolledTooltip } from "reactstrap";
import Identicon from 'react-identicons';
import Editor  from "react-medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import "./App.css";
import { JsxExpression } from "typescript";

const client = new W3CWebSocket("ws://127.0.0.1:8000");
const contentDefaultMessage = "Start writing your document here";

type User = {
  userName: string;
  randomcolor: string;
};

export interface IAppProps {}

export interface IAppState {
  /** List of the current active users */
  readonly currentUsers: User[];

  /** List of the list of activity notes for the user */
  readonly userActivity: string[];

  /** username of the current user */
  readonly userName: string;

  /** Text to be displayed in shared editor */
  readonly text: string;
}

class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      currentUsers: [],
      userActivity: [],
      userName: "",
      text: "",
    };
  }

  public logInUser(): void {
    const username = this.state.userName;
    client.send(
      JSON.stringify({
        username,
        type: "userevent",
      })
    );
  }

  /* When content changes, we send the
current content of the editor to the server. */
  onEditorStateChange = (text: string) => {
    client.send(
      JSON.stringify({
        type: "contentchange",
        username: this.state.userName,
        content: text,
      })
    );
  };

  componentWillMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message: any) => {
      const dataFromServer = JSON.parse(message.data);
      const stateToChange: any = {};
      if (dataFromServer.type === "userevent") {
        stateToChange.currentUsers = Object.values(dataFromServer.data.users);
      } else if (dataFromServer.type === "contentchange") {
        stateToChange.text =
          dataFromServer.data.editorContent || contentDefaultMessage;
      }
      stateToChange.userActivity = dataFromServer.data.userActivity;
      this.setState({
        ...stateToChange,
      });
    };
  }

  public showLoginSection(): JSX.Element {
    return (
      <div className="account">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__profile">
              <Identicon
                className="account__avatar"
                size={64}
                string="randomness"
              />
              <p className="account__name">Welcome player!</p>
              <p className="account__sub">Enter your name to play</p>
            </div>
            <input
              name="username"
              type="text"
              value={this.state.userName}
              onChange={(e) => this.handleUserNameChange(e)}
              className="form-control"
            />
            <button
              type="button"
              onClick={() => this.logInUser()}
              className="btn btn-primary account__btn"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    );
  }

  public handleUserNameChange(e: any) {
    let name = e.target.value;
    if (name.trim()) {
      this.setState({ userName: name });
    }
  }

  public showEditorSection(): JSX.Element {
    return (
      <div className="main-content">
        <div className="document-holder">
          <div className="currentusers">
            {this.state.currentUsers.map((user) => (
              <React.Fragment>
                <span
                  id={user.userName}
                  className="userInfo"
                  key={user.userName}
                >
                </span>
                <UncontrolledTooltip placement="top" target={user.userName}>
                  {user.userName}
                </UncontrolledTooltip>
              </React.Fragment>
            ))}
          </div>
          <Editor
            options={{
              placeholder: {
                text: this.state.text ? contentDefaultMessage : "",
              },
            }}
            className="body-editor"
            text={this.state.text}
            onChange={this.onEditorStateChange}
          />
        </div>
        <div className="history-holder">
          <ul>
            {this.state.userActivity.map((activity, index) => (
              <li key={`activity-${index}`}>{activity}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const { userName } = this.state;
    return (
      //"Poker Client Stage 1: Game Management"
      <React.Fragment>
        <Navbar color="light" light>
          <NavbarBrand href="/">
            Poker Client Stage 1: Game Management
          </NavbarBrand>
        </Navbar>
        <div className="container-fluid">
          {userName ? this.showEditorSection() : this.showLoginSection()}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
