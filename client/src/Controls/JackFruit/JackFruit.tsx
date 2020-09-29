import React from "react";
import { observer } from "mobx-react";
import { useInput } from "../../useState";
import getStore from "../../Stores/store";
import { PokerGame } from "../../Stores/GameStore";
import createGame from "../../Actions/createGame";
import closeCreateGameDialog from "../../Actions/closeCreateGameDialog";
import PlayerScore from "./PlayerScore";

export default observer(function JackFruit() {
  return (
    <div>
      <div className="jackFruitPlayerScores">
        <div className="jackFruitPlayerOneScore">
          <PlayerScore user={"Mohit"} chips={"$2"} />
        </div>
        <div className="jackFruitPlayerTwoScore">
          <PlayerScore user={"David"} chips={"+$524"} />
        </div>
      </div>
      <div className="baordCards">
        <span className="jackFruitPlayerHandCard">card</span>
        <span className="jackFruitPlayerHandCard">card2</span>
        <span className="jackFruitPlayerHandCard">card3</span>
        <span className="jackFruitPlayerHandCard">card4</span>
        <span className="jackFruitPlayerHandCard">card5</span>
      </div>
      <div className="jackFruitPlayerOnePlayArea">
          High <br></br>
          Med <br></br>
          Low <br></br>
      </div>
      <div className="jackFruitPlayerHand">
        <span className="jackFruitPlayerHandCard">card</span>
        <span className="jackFruitPlayerHandCard">card2</span>
        <span className="jackFruitPlayerHandCard">card3</span>
        <span className="jackFruitPlayerHandCard">card4</span>
        <span className="jackFruitPlayerHandCard">card5</span>
        <span className="jackFruitPlayerHandCard">card6</span>
      </div>
    </div>
  );
});
