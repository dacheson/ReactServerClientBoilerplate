import { mutator } from 'satcheljs';
import updateCreateGameName from '../Actions/updateCreateGameName';
import getStore from '../Stores/store';

mutator(updateCreateGameName, msg => {
    getStore().createGameFields.name= msg.name;
});
