const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const { stringify } = require('querystring');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

// Generates unique ID for every new connection
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};


let currentPlayers = [];

let availableCards = generateGameCards();

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
const users = {};
// The current editor content is maintained here.
let editorContent = null;
// User activity history.
let userActivity = [];

// Need an object to hold a
let players = [];

// bool to know if game loop should be running
let gameActive = false;




const sendMessage = (json) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
}

const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange"
}

function generateGameCards() {
  let allCards = [];
  for(let i=0; i<150; i++) {
    allCards.push(i);
  }
  return allCards;
}

function drawRandomGameCards(numOfCards) {
  let returnedCards = [];
  for(let i=0; i<numOfCards; i++) {
    returnedCards[i] = drawRandomGameCard();
  }
  return returnedCards;
}

function drawRandomGameCard() {
  let randomCard = Math.round(Math.random() * availableCards.length-2);

  //console.log("Random Card:" + [randomCard]);
  //console.log("Value at that spot:" + availableCards[randomCard]);
  availableCards.splice(randomCard, 1);
  return randomCard;
}

function addPlayer(userID) {
  let cards = drawRandomGameCards(5);
  currentPlayers.push({
    userId: userID,
    cards: cards
  });
  const json = { type: typesDef.USER_EVENT };
  userActivity.push(`${userID} drew cards: ${cards}`);
  json.data = { users, userActivity };
  sendMessage(JSON.stringify(json));
  console.log(currentPlayers[currentPlayers.length-1]);
}

wsServer.on('request', function(request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));


  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      const dataFromClient = JSON.parse(message.utf8Data);
      const json = { type: dataFromClient.type };
      if (dataFromClient.type === typesDef.USER_EVENT) {
        users[userID] = dataFromClient;
        userActivity.push(`${dataFromClient.username} joined to edit the document`);
        json.data = { users, userActivity };
        addPlayer(userID);
        checkStartGame();      
      } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
        editorContent = dataFromClient.content;
        json.data = { editorContent, userActivity };
      }
      sendMessage(JSON.stringify(json));
    }
  });

  // user disconnected
  connection.on('close', function(connection) {
    console.log((new Date()) + " Peer " + userID + " disconnected.");
    const json = { type: typesDef.USER_EVENT };
    userActivity.push(`${users[userID].username} left the document`);
    json.data = { users, userActivity };
    delete clients[userID];
    delete users[userID];
    sendMessage(JSON.stringify(json));
  });

  function sendInfo(userId) {
    const json = { type: typesDef.USER_EVENT };
    userActivity.push(`${users[userId].username} will be picking the winner this round!`);
    json.data = { users, userActivity };
    delete clients[userID];
    delete users[userID];
    sendMessage(JSON.stringify(json));
  }

  

function checkStartGame() {
  if(!gameActive) {
    if(currentPlayers.length > 2) {
      gameActive = true;
      startTurn();
    }
  }
}

function startTurn() {
  // pick king and send messages informing everyone
  let kingUserId = currentPlayers[Math.round(Math.random() * currentPlayers.length)].userId;
  console.log(kingUserId);
  sendInfo(kingUserId);
}
});