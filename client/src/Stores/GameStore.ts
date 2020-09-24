
export interface PokerGameStore {
    activeGames: PokerGame[];
    selectedLobbyGame: number;
    createGameDialogOpen: boolean;
    createGameFields: PokerGame;
    nextId: number;
}

export const defaultPokerGameStoreData: PokerGameStore = {
    activeGames: [
        {  
        id: 1,
        name: "Warmup",
        GameMode: "No Limit",
        currentPlayers: 6,
        maxPlayers: 9,
        smallBlind: 0.25,
        bigBlind: 0.5,
        },
        {  
            id: 2,
            name: "Warmup",
            GameMode: "Big-O",
            currentPlayers: 4,
            maxPlayers: 9,
            smallBlind: 0.5,
            bigBlind: 1,
        }
    ],
    selectedLobbyGame: 22,
    createGameDialogOpen: false,
    createGameFields: {
        id: 3,
        name: "",
        GameMode: "",
        currentPlayers: 4,
        maxPlayers: 9,
        smallBlind: 0.5,
        bigBlind: 1,
    },
    nextId: 3
};

export interface PokerGame {
    id: number;
    name: string;
    maxPlayers: number;
    currentPlayers: number;
    smallBlind: number;
    bigBlind: number;
    GameMode: string;
};

// export interface Cart {
//     books: {
//         bookId: string;
//         quantity: number;
//     }[];
//     selectedBookId: string | null;
//     isBuying: boolean;
// }