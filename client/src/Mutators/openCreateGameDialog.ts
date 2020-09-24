import { mutator } from 'satcheljs';
import openCreateGameDialog from '../Actions/openCreateGameDialog';
import getStore from '../Stores/store';

mutator(openCreateGameDialog, msg => {
    getStore().createGameDialogOpen = true;
});