import ace_c from '../Cards/ac.svg';
import ace_d from '../Cards/ad.svg';
import ace_h from '../Cards/ah.svg';
import ace_s from '../Cards/as.svg';

import two_c from '../Cards/2c.svg';
import two_d from '../Cards/2d.svg';
import two_h from '../Cards/2h.svg';
import two_s from '../Cards/2s.svg';

import three_c from '../Cards/3c.svg';
import three_d from '../Cards/3d.svg';
import three_h from '../Cards/3h.svg';
import three_s from '../Cards/3s.svg';

import four_c from '../Cards/4c.svg';
import four_d from '../Cards/4d.svg';
import four_h from '../Cards/4h.svg';
import four_s from '../Cards/4s.svg';

import five_c from '../Cards/5c.svg';
import five_d from '../Cards/5d.svg';
import five_h from '../Cards/5h.svg';
import five_s from '../Cards/5s.svg';

import six_c from '../Cards/6c.svg';
import six_d from '../Cards/6d.svg';
import six_h from '../Cards/6h.svg';
import six_s from '../Cards/6s.svg';

import seven_c from '../Cards/7c.svg';
import seven_d from '../Cards/7d.svg';
import seven_h from '../Cards/7h.svg';
import seven_s from '../Cards/7s.svg';

import eight_c from '../Cards/8c.svg';
import eight_d from '../Cards/8d.svg';
import eight_h from '../Cards/8h.svg';
import eight_s from '../Cards/8s.svg';

import nine_c from '../Cards/9c.svg';
import nine_d from '../Cards/9d.svg';
import nine_h from '../Cards/9h.svg';
import nine_s from '../Cards/9s.svg';

import ten_c from '../Cards/10c.svg';
import ten_d from '../Cards/10d.svg';
import ten_h from '../Cards/10h.svg';
import ten_s from '../Cards/10s.svg';

import jack_c from '../Cards/jc.svg';
import jack_d from '../Cards/jd.svg';
import jack_h from '../Cards/jh.svg';
import jack_s from '../Cards/js.svg';

import queen_c from '../Cards/qc.svg';
import queen_d from '../Cards/qd.svg';
import queen_h from '../Cards/qh.svg';
import queen_s from '../Cards/qs.svg';

import king_c from '../Cards/kc.svg';
import king_d from '../Cards/kd.svg';
import king_h from '../Cards/kh.svg';
import king_s from '../Cards/ks.svg';

import * as React from 'react';
import { Board } from "../../src/Models/Board";
import { Card, Rank, Suit} from "../../src/Models/Card";
import './Tester.css';

import { Deck } from '../Models/Deck';
import { Hand } from '../Models/Hand';
import { HandResult } from '../Models/HandResult';
import { Cards } from '../Constants/Cards';

interface IAppState {
  deck: Deck,
  hand1: Hand,
  hand2: Hand,
  board: Board
}

export class BoardTestSpace extends React.Component<{}, IAppState> {

  constructor(props: {}) {
    super(props);
    const deck: Deck = new Deck();

    // Test Hands
    const h1: Hand = new Hand(Cards.AceClubs, Cards.KingClubs);

    // Test Board
    // const board: Board = new Board(Cards.TenHearts, Cards.NineHearts, Cards.ThreeHearts, Cards.SevenSpades, Cards.JackHearts);
    // this.state = { deck, hand1: h1, hand2: h2, board};
    this.state = { deck, hand1: deck.getHand(), hand2: deck.getHand(), board: deck.getBoard() };
  }

  public render() {
    return (
      <div className="App">
        { this.renderPokerTable() }
        { this.renderBoardOfCards() }
        { this.renderHands()}
        { this.renderDealCardsButton() }
      </div>
    );
  }

  public renderBoardOfCards(): JSX.Element {
    const style: React.CSSProperties = {
      marginLeft: "40%"
    };
    return(
      <div id="boardArea" style={style}>
        {this.renderCard(this.state.board.cards[0])}
        {this.renderCard(this.state.board.cards[1])}
        {this.renderCard(this.state.board.cards[2])}
        {this.renderCard(this.state.board.cards[3])}
        {this.renderCard(this.state.board.cards[4])}
      </div>
    );
  }

  public renderHands(): JSX.Element[] {
    const allHands: JSX.Element[] = [];
    allHands.push(this.renderCards(1));
    allHands.push(this.renderCards(2));
    return allHands;
  }

  public renderCards(playerNumber: number): JSX.Element {
    let style: React.CSSProperties = {
      marginLeft: "45%"
    };
    let hand: Hand = this.state.hand1;
    if(playerNumber === 1) {
      style = {
        marginLeft: "25%"
      }; 
      hand = this.state.hand2;
    }

    // Player 1 seven Cards
    const fullhand: Card[] = this.state.board.cards.slice();
    fullhand.push(hand.card1);
    fullhand.push(hand.card2);
    const divId: string = "handResults" + playerNumber.toString();
    const result: HandResult = this.state.deck.scoreHand(fullhand);
    return(
      <div id="handArea" style={style}>
        <div id={divId}>
          Player # {  playerNumber } <br/>
          Hand: { result.handName } <br/>
          Score: { result.score }
        </div>
        {this.renderCard(hand.card1)}
        {this.renderCard(hand.card2)}
      </div>
    );
  }

  public renderCard(card: Card): JSX.Element {
    let cardSVG: any = null;
    if (card.rank === Rank.Ace) {
      if (card.suit === Suit.Club) {
        cardSVG = ace_c;
      } else if (card.suit === Suit.Heart) {
        cardSVG = ace_h;
      } else if (card.suit === Suit.Spade) {
        cardSVG = ace_s;
      } else {
        cardSVG = ace_d
      }
    } else if (card.rank === Rank.Two) {
      if (card.suit === Suit.Club) {
        cardSVG = two_c;
      } else if (card.suit === Suit.Heart) {
        cardSVG = two_h;
      } else if (card.suit === Suit.Spade) {
        cardSVG = two_s;
      } else {
        cardSVG = two_d
      }
    } else if (card.rank === Rank.Three) {
      if (card.suit === Suit.Club) {
        cardSVG = three_c;
      } else if (card.suit === Suit.Heart) {
        cardSVG = three_h;
      } else if (card.suit === Suit.Spade) {
        cardSVG = three_s;
      } else {
        cardSVG = three_d
      }
    } else if (card.rank === Rank.Four) {
      if (card.suit === Suit.Club) {
        cardSVG = four_c;
      } else if (card.suit === Suit.Heart) {
        cardSVG = four_h;
      } else if (card.suit === Suit.Spade) {
        cardSVG = four_s;
      } else {
        cardSVG = four_d
      }
    } else if (card.rank === Rank.Five) {
      if (card.suit === Suit.Club) {
        cardSVG = five_c;
      } else if (card.suit === Suit.Heart) {
        cardSVG = five_h;
      } else if (card.suit === Suit.Spade) {
        cardSVG = five_s;
      } else {
        cardSVG = five_d
      }
    } else if (card.rank === Rank.Six) {
      if (card.suit === Suit.Club) {
        cardSVG = six_c;
      } else if (card.suit === Suit.Heart) {
        cardSVG = six_h;
      } else if (card.suit === Suit.Spade) {
        cardSVG = six_s;
      } else {
        cardSVG = six_d
      }
    } else if (card.rank === Rank.Seven) {
      if (card.suit === Suit.Club) {
        cardSVG = seven_c;
      } else if (card.suit === Suit.Heart) {
        cardSVG = seven_h;
      } else if (card.suit === Suit.Spade) {
        cardSVG = seven_s;
      } else {
        cardSVG = seven_d
      }
    } else if (card.rank === Rank.Eight) {
      if (card.suit === Suit.Club) {
        cardSVG = eight_c;
      } else if (card.suit === Suit.Heart) {
        cardSVG = eight_h;
      } else if (card.suit === Suit.Spade) {
        cardSVG = eight_s;
      } else {
        cardSVG = eight_d
      }
    } else if (card.rank === Rank.Nine) {
      if (card.suit === Suit.Club) {
        cardSVG = nine_c;
      } else if (card.suit === Suit.Heart) {
        cardSVG = nine_h;
      } else if (card.suit === Suit.Spade) {
        cardSVG = nine_s;
      } else {
        cardSVG = nine_d
      }
    } else if (card.rank === Rank.Ten) {
      if (card.suit === Suit.Club) {
        cardSVG = ten_c;
      } else if (card.suit === Suit.Heart) {
        cardSVG = ten_h;
      } else if (card.suit === Suit.Spade) {
        cardSVG = ten_s;
      } else {
        cardSVG = ten_d
      }
    } else if (card.rank === Rank.Jack) {
      if (card.suit === Suit.Club) {
        cardSVG = jack_c;
      } else if (card.suit === Suit.Heart) {
        cardSVG = jack_h;
      } else if (card.suit === Suit.Spade) {
        cardSVG = jack_s;
      } else {
        cardSVG = jack_d
      }
    } else if (card.rank === Rank.Queen) {
      if (card.suit === Suit.Club) {
        cardSVG = queen_c;
      } else if (card.suit === Suit.Heart) {
        cardSVG = queen_h;
      } else if (card.suit === Suit.Spade) {
        cardSVG = queen_s;
      } else {
        cardSVG = queen_d
      }
    } else if (card.rank === Rank.King) {
      if (card.suit === Suit.Club) {
        cardSVG = king_c;
      } else if (card.suit === Suit.Heart) {
        cardSVG = king_h;
      } else if (card.suit === Suit.Spade) {
        cardSVG = king_s;
      } else {
        cardSVG = king_d
      }
    }

    return ( 
      <div id="cardContainer">
        <img id="card" src={cardSVG}/>
      </div>
    )
  }

  public renderDealCardsButton(): JSX.Element {
    return(
      <div>
        <button id="dealCardsButton" onClick={this.dealCards}>
          Deal
        </button>
      </div>
    );
  }

  public renderPokerTable(): JSX.Element {
    return (
      <div id="pokerTable">
        Luckycharms Room
      </div>
    )
  }

  public dealCards = (): void => {
    const newHand = this.state.deck.getHand();
    const newHand2 = this.state.deck.getHand();
    const newBoard = this.state.deck.getBoard();
    this.setState({hand1: newHand, hand2: newHand2, board: newBoard });
  }

  // Returns a JSX with the correct suit
  public renderSuit(suit: Suit): JSX.Element {
    let style: React.CSSProperties = {};
    
    if(suit === Suit.Club || suit === Suit.Spade) {
      style = {
        color: "black"
      }; 
    } else if (suit === Suit.Diamond || suit === Suit.Heart) {
      style = {
        color: "red"
      }; 
    }

    if(suit === Suit.Club) {
      return (
        <div style={style}>
          &clubs;
        </div> 
      );
    } else if(suit === Suit.Diamond) {
      return (
        <div style={style}>
          &diams;
        </div> 
      );
    } else if(suit === Suit.Heart) {
      return (
        <div style={style}>
          &hearts;
        </div> 
      );
    } else if(suit === Suit.Spade) {
      return (
        <div style={style}>
          &spades;
        </div> 
      );
    }
    return (
      <div/>
    );
  }
}
export default BoardTestSpace;