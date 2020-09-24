import { mutator } from 'satcheljs';
import createGame from '../Actions/createGame';
import getStore from '../Stores/store';

mutator(createGame, msg => {
    getStore().activeGames.push(msg.game);
    getStore().nextId++;
});
