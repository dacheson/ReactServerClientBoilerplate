import React from "react";
import { observer } from 'mobx-react';
import { useInput } from "./../useState";
import getStore from "./../Stores/store";
import { PokerGame } from "./../Stores/GameStore";
import createGame from "./../Actions/createGame";
import closeCreateGameDialog from "./../Actions/closeCreateGameDialog";

export default observer(function GameForm() {
    const { value:gameName, bind:bindGameName, reset:resetGameName } = useInput('');
    const { value:gameType, bind:bindGameType, reset:resetGameType } = useInput('');
    const { value:smallBlind, bind:bindSmallBlind, reset:resetSmallBlind } = useInput('');
    const { value:bigBlind, bind:bindBigBlind, reset:resetBigBlind } = useInput('');
    const { value:maxPlayers, bind:bindMaxPlayers, reset:resetMaxPlayers } = useInput('');
    
    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        let gameToCreate: PokerGame = {
            id: getStore().nextId,
            name: gameName,
            GameMode: gameType,
            currentPlayers: 0,
            bigBlind: bigBlind,
            smallBlind: smallBlind,
            maxPlayers: maxPlayers
        };
        createGame(gameToCreate);
        resetGameName();
        resetGameType();
        resetSmallBlind();
        resetBigBlind();
        resetMaxPlayers();
        closeCreateGameDialog()
    }

    if(getStore().createGameDialogOpen === true) {
  return (
    <form className="CreateGameDialog" onSubmit={handleSubmit}>
      <label>
        Game Name: 
        <input type="text" {...bindGameName} />
      </label> <br/>
      <label>
        Game Type: 
        <input type="text" {...bindGameType} />
      </label> <br/>
      <label>
        Small Blind: 
        <input type="text" {...bindSmallBlind} />
      </label> <br/>
      <label>
        Big Blind: 
        <input type="text" {...bindBigBlind} />
      </label> <br/>
      <label>
        Max Players: 
        <input type="text" {...bindMaxPlayers} />
      </label> <br/>
      <input type="submit" value="Submit" />
    </form>
  );
    } else {
      return (<div/>);
    }
});