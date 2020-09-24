import React from "react";
import { observer } from 'mobx-react';
import { PokerGame } from "../Stores/GameStore";
import getStore from "../Stores/store";
import selectPokerGame from "../Actions/selectPokerGame";

export interface IGameLobbyState {
  // Currently selected row in the game lobby table, -1 is unselected
  selectedRow: number;
}

export default observer(function CurrentActiveGameList() {
    let currentGames: PokerGame[] = [];
    const store = getStore();
    currentGames = store.activeGames; 
      return (
      <table className="activeGameLobbyTable">
        <tr>
          <th>ID</th>
          <th>Game Name</th>
          <th>Game</th>
          <th>Players</th>
          <th>Small Blind</th>
          <th>Blind Blind</th>
        </tr>
        {currentGames.map((game: PokerGame, i: number) => {
          let rowStyle: React.CSSProperties = { };
          if (game.id === getStore().selectedLobbyGame) {
            rowStyle.backgroundColor = "Grey";
          }
          return (
            <tr style={rowStyle} onClick={(e) => selectPokerGame(game.id)} key={i}>
              <td>{game.id}</td>
              <td>{game.name}</td>
              <td>{game.GameMode}</td>
              <td>
                {game.currentPlayers} / {game.maxPlayers}
              </td>
              <td>${game.smallBlind}</td>
              <td>${game.bigBlind}</td>
            </tr>
          );
        })}
      </table>
    );
});