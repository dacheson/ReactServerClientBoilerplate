import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { observer } from "mobx-react";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import "./App.css";
import LoginDialog from "./Controls/LoginDialog";
import PokerGameLobby from "./Controls/PokerGameLobby";

export const contentDefaultMessage = "Start writing your document here";
export type User = {
  userName: string;
  randomcolor: string;
};

export interface IAppProps {}

export interface IAppState {
  /** List of the current active users */
  readonly currentUsers: User[];

  /** List of the current active users */
  readonly userName: string;

   /** List of the list of activity notes for the user */
   readonly userActivity: string[];

  /** Text to be displayed in shared editor */
  readonly text: string;
}

@observer
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

  componentWillMount() {

  }

  // Callback to take a username and send it to websocket
  public logInUser = (userName: string) => {
    // Call Action which calls module?
    // make user store

    const username = userName;
    if (username) {
      this.setState({ userName: username });
      // client.send(
      //   JSON.stringify({
      //     username,
      //     type: "userevent",
      //   })
      // );
    }
  };  

  /* When content changes, we send the
    current content of the editor to the server. */
  public onEditorStateChange = (text: string) => {
    let res = JSON.stringify({
      type: "contentchange",
      username: this.state.userName,
      content: text,
    });
    console.log(res);
    //client.send(res);
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
          {this.renderLoginOrEditor() }
        </div>
      </React.Fragment>
    );
    }

  public renderLoginOrEditor() {
    if (this.state.userName) {
      return (
      <div>
      <PokerGameLobby/>
      </div>)
    } else {
      return (<LoginDialog logIn={this.logInUser} />);
    }
  }
}

export default App;