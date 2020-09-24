import { action } from 'satcheljs';
import { PokerGame } from '../Stores/GameStore';
export default action('createGame', (game: PokerGame) => ({ game }));