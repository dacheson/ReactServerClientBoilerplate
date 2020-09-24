import { createStore } from 'satcheljs';
import { PokerGameStore, defaultPokerGameStoreData } from './GameStore';

// Subscribe to mutators
import '../Mutators/createPokerGame';
import '../Mutators/selectPokerGame';
import '../Mutators/deleteGame';

// Create Game Dialog mutators
import '../Mutators/openCreateGameDialog';
import '../Mutators/closeCreateGameDialog';
import '../Mutators/updateCreateGameName';

// Subscribe to orchestrators
//import '../orchestrators/removeBookFromCart';

export default createStore<PokerGameStore>('PokerGameStore', defaultPokerGameStoreData);