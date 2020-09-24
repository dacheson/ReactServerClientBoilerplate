import React from "react";
import { observer } from 'mobx-react';
import PokerLobbyButtons from "./PokerLobbyButtons";
import CurrentActiveGameList from "./CurrentActiveGameList";
import CreateGameDialog from "./CreateGameDialog";

export interface IGameLobbyState {
  // Currently selected row in the game lobby table, -1 is unselected
  selectedRow: number;
}

export default observer(function PokerGameLobby() {
    return (
        <div className="App">
          <h1>
          <span role="img" aria-label="fourLeafClover">🍀</span>Welcome to Luckys Poker Room<span role="img" aria-label="fourLeafClover">🍀</span>
          </h1>
        <div className="lobbyFlexBox">
          <div className="gameList">
              <CurrentActiveGameList/>
              <PokerLobbyButtons/>
          </div>
          <div>
          <CreateGameDialog/>
          </div>
        </div>
        </div>
      );
});