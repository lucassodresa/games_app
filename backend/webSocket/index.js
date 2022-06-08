const { io } = require('../http');

const validateToken = require('./middlewares/validateToken');

const userBySocketID = {};
io.use(validateToken);

const verifyWinner = (currentGame) => {
  const isZero = (value) => value === 0;
  const isOne = (value) => value === 1;
  const isZeroWinnerSequence = (pos1, pos2, pos3) =>
    isZero(pos1) && isZero(pos2) && isZero(pos3);
  const isOneWinnerSequence = (pos1, pos2, pos3) =>
    isOne(pos1) && isOne(pos2) && isOne(pos3);
  const arr = Object.values(currentGame);

  // linha 1
  const linha1 = [arr[0][0], arr[0][1], arr[0][2]];
  if (isZeroWinnerSequence(...linha1)) return 0;
  else if (isOneWinnerSequence(...linha1)) return 1;
  // linha 2
  const linha2 = [arr[1][0], arr[1][1], arr[1][2]];
  if (isZeroWinnerSequence(...linha2)) return 0;
  else if (isOneWinnerSequence(...linha2)) return 1;
  // linha 3
  const linha3 = [arr[2][0], arr[2][1], arr[2][2]];
  if (isZeroWinnerSequence(...linha3)) return 0;
  else if (isOneWinnerSequence(...linha3)) return 1;

  // coluna 1
  const coluna1 = [arr[0][0], arr[1][0], arr[2][0]];
  if (isZeroWinnerSequence(...coluna1)) return 0;
  else if (isOneWinnerSequence(...coluna1)) return 1;
  // coluna 2
  const coluna2 = [arr[0][1], arr[1][1], arr[2][1]];
  if (isZeroWinnerSequence(...coluna2)) return 0;
  else if (isOneWinnerSequence(...coluna2)) return 1;
  // coluna 3
  const coluna3 = [arr[0][2], arr[1][2], arr[2][2]];
  if (isZeroWinnerSequence(...coluna3)) return 0;
  else if (isOneWinnerSequence(...coluna3)) return 1;

  // diagonal 1
  const diagonal1 = [arr[0][0], arr[1][1], arr[2][2]];
  if (isZeroWinnerSequence(...diagonal1)) return 0;
  else if (isOneWinnerSequence(...diagonal1)) return 1;
  // diagonal 2
  const diagonal2 = [arr[2][0], arr[1][1], arr[0][2]];
  if (isZeroWinnerSequence(...diagonal2)) return 0;
  else if (isOneWinnerSequence(...diagonal2)) return 1;

  return null;
};

const usersNamespace = io.of('/users');
usersNamespace.use(validateToken).on('connection', (socket) => {
  const userID = socket._user._id.toString();
  userBySocketID[socket.id] = userID;
  const usersOnline = Object.values(userBySocketID);
  console.log(`#USERS# ${socket._user.name} connected: ${socket.id} #USERS#`);

  socket.emit('loadUsers', usersOnline);
  socket.broadcast.emit('newUser', userID);

  socket.on('disconnect', () => {
    const userID = socket._user._id.toString();
    delete userBySocketID[socket.id];
    const socketsActive = Object.values(userBySocketID);
    if (!socketsActive.includes(userID))
      socket.broadcast.emit('userLeft', userID);
    console.log(`#USERS# ${socket._user.name} disconnected #USERS#`);
  });
});

const games = {};
const options = ['X', 'O'];
const gamesNamespace = io.of('/games');
gamesNamespace.use(validateToken).on('connection', (socket) => {
  socket.on('games:invite', ({ roomId, userToInvite }) => {
    const userId = socket._user._id.toString();
    console.log('inviting');

    if (userToInvite) {
      const sockets = Object.entries(userBySocketID)
        .filter(([, userId]) => userId === userToInvite)
        .map(([socketId, userId]) => socketId);
      sockets.forEach((socketId) =>
        usersNamespace.to(socketId).emit('games:invite', {
          roomId,
          userHost: { id: userId, name: socket._user.name }
        })
      );
    }
  });

  socket.on('games:join', async ({ roomId }) => {
    const connectedSockets = gamesNamespace.adapter.rooms.get(roomId);
    const socketRooms = [...socket.rooms].filter((room) => room !== socket.id);

    console.log(connectedSockets);
    console.log(socketRooms);

    if (socketRooms.length > 0 || connectedSockets?.size === 2) {
      return gamesNamespace
        .to(roomId)
        .emit('games:status', { status: 'room_full', message: 'Room is full' });
    }
    await socket.join(roomId);

    if (!games[roomId]) games[roomId] = {};
    if (!games[roomId].users) games[roomId].users = [];
    if (!games[roomId].currentTurn) games[roomId].currentTurn = socket._user.id;
    games[roomId].users.push({ user: socket._user, socket_id: socket.id });

    if (connectedSockets?.size > 1) {
      games[roomId].game = {
        0: Array(3).fill(null),
        1: Array(3).fill(null),
        2: Array(3).fill(null)
      };

      gamesNamespace.to(roomId).emit('games:status', {
        status: 'turn',
        message: 'turn',
        gameInfo: games[roomId]
      });
    } else {
      gamesNamespace.to(roomId).emit('games:status', {
        status: 'waiting_users',
        message: 'Waiting for users',
        gameInfo: games[roomId]
      });
    }
    socket.on('games:play', async ({ line, column, roomId }) => {
      const gameRoom = games[roomId];
      gameRoom.currentTurn = socket._user._id;
      // find position in array of users
      const { users } = gameRoom;

      const position = users.findIndex(
        ({ user }) => user._id === gameRoom.currentTurn
      );
      console.log(position);
      console.log(line);
      console.log(column);
      console.log(gameRoom.game);

      gameRoom.game[line][column] = position;

      console.log(gameRoom.game);

      // verify if someone win
      const winner = verifyWinner(gameRoom.game);
      //if win send winner to position and loser to another

      if (winner !== null) {
        console.log(winner + 'winner');
        gamesNamespace.to(roomId).emit('games:status', {
          status: 'end',
          message: 'end Game',
          gameInfo: gameRoom,
          winner
        });
      } else {
        //else send the game to everyone
        gameRoom.currentTurn = users[position === 0 ? 1 : 0].user._id;
        gamesNamespace.to(roomId).emit('games:status', {
          status: 'turn',
          message: 'turn',
          gameInfo: gameRoom
        });
        console.log('entrou');
      }
    });
  });

  socket.on('disconnect', () => {});
});
