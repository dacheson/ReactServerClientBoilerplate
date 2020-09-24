import { mutator } from 'satcheljs';
import deleteGame from '../Actions/deleteGameAction';
import getStore from '../Stores/store';

mutator(deleteGame, msg => {
    let indexOfGameToRemove = -1;

    for(let i=0; i<getStore().activeGames.length; i++) {
        if(getStore().activeGames[i].id === getStore().selectedLobbyGame) {
            indexOfGameToRemove = i;
        }
    }
    if (indexOfGameToRemove > -1) {
        getStore().activeGames.splice(indexOfGameToRemove, 1);
    }
    getStore().selectedLobbyGame = -1;
});
