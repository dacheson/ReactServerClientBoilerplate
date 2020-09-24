import { mutator } from 'satcheljs';
import closeCreateGameDialog from '../Actions/closeCreateGameDialog';
import getStore from '../Stores/store';

mutator(closeCreateGameDialog, msg => {
    getStore().createGameDialogOpen = false;
});