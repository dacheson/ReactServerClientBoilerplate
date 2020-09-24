import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Navbar, NavbarBrand, UncontrolledTooltip } from "reactstrap";
import Identicon from 'react-identicons';
import Editor  from "react-medium-editor";
import { observer } from 'mobx-react';
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import "./App.css";
import { JsxExpression } from "typescript";
import LoginDialog from "./Controls/LoginDialog";
import { stringify } from "querystring";

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
  
  /** List of the current active users */
  readonly userName: string;
}

@observer
class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      userName: "",
      currentUsers: []
    };
  }



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

// Callbacks
    // Callback to take a username and send it to websocket
    public logInUser = (userName: string) => {
      const username = userName;
      if(username) {
        this.setState({userName: username});
        client.send(
          JSON.stringify({
            username,
            type: "userevent",
          })
        );
      }
    }

     /* When content changes, we send the
    current content of the editor to the server. */
    public onEditorStateChange = (text: string) => {
        client.send(
          JSON.stringify({
            type: "contentchange",
            username: this.state.userName,
            content: text,
          })
        );
      };

      
  // useState hook const { userName } = this.state;
  render() {
  return (
    //"Poker Client Stage 1: Game Management"
    <React.Fragment>
      <Navbar color="light" light>
        <NavbarBrand href="/">
          Poker Client Stage 1: Game Management
        </NavbarBrand>
      </Navbar>
      <div className="container-fluid">
        <LoginDialog logIn={this.logInUser}/>
      </div>
    </React.Fragment>
  );
  }

  // public handleUserNameChange(e: any) {
  //   let name = e.target.value;
  //   if (name.trim()) {
  //     this.setState({ userNameTextBoxValue: name });
  //   }
  // }

  // public showEditorSection(): JSX.Element {
  //   return (
  //     <div className="main-content">
  //       <div className="document-holder">
  //         <div className="currentusers">
  //           {this.state.currentUsers.map((user) => (
  //             <React.Fragment>
  //               <span
  //                 id={user.userName}
  //                 className="userInfo"
  //                 key={user.userName}
  //               >
  //               </span>
  //               <UncontrolledTooltip placement="top" target={user.userName}>
  //                 {user.userName}
  //               </UncontrolledTooltip>
  //             </React.Fragment>
  //           ))}
  //         </div>
  //         <Editor
  //           options={{
  //             placeholder: {
  //               text: this.state.text ? contentDefaultMessage : "",
  //             },
  //           }}
  //           className="body-editor"
  //           text={this.state.text}
  //           onChange={this.onEditorStateChange}
  //         />
  //       </div>
  //       <div className="history-holder">
  //         <ul>
  //           {this.state.userActivity.map((activity, index) => (
  //             <li key={`activity-${index}`}>{activity}</li>
  //           ))}
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // }

}

export default App;