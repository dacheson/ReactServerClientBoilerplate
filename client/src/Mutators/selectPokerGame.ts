import { mutator } from 'satcheljs';
import selectPokerGame from '../Actions/selectPokerGame';
import getStore from '../Stores/store';

mutator(selectPokerGame, msg => {
    getStore().selectedLobbyGame = msg.id;
});
