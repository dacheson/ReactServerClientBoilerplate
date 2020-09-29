import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

export class GameSocketModule {
  constructor() {}

  public setupConnectAndGetNotifications(): void {
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
          dataFromServer.data.editorContent; // || contentDefaultMessage;
      }
      stateToChange.userActivity = dataFromServer.data.userActivity;
    //   this.setState({
    //     ...stateToChange,
    //   });
    };
  }

  //
  // public joinGame(): Q.Promise<void> {}

  private leaveGame(connection: string) {}
}
