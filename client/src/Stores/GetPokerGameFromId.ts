import getStore from "./store";
import { PokerGame } from "../Stores/GameStore";

export function getPokerGameFromId(id: number): PokerGame {
    let found = getStore().activeGames.find((ele) => ele.id === id);
    if (found !== undefined) {
        return found;
    } else {
    const dummy: PokerGame = {
      id: getStore().nextId,
      name: "no game found",
      GameMode: "none",
      currentPlayers: 0,
      bigBlind: 0,
      smallBlind: 0,
      maxPlayers: 0,
    };
    return dummy;
  }
}
