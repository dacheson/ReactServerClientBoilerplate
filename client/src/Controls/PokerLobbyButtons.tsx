import React from "react";
import { observer } from 'mobx-react';
import deleteGame from "../Actions/deleteGameAction";
import openCreateGameDialog from "../Actions/openCreateGameDialog";

export interface IGameLobbyState {
  // Currently selected row in the game lobby table, -1 is unselected
  selectedRow: number;
}

/**
 * @this Test
 */
export default observer(function PokerLobbyButtons() {
    return (
      <div>
        <button onClick={(e) => {
          openCreateGameDialog()
        }}
        >Create Game</button>
        <button onClick={(e) => {
          deleteGame()}}>Delete Game</button>
        <button type="button">
            Join Game 
        </button>
      </div>
      );
});