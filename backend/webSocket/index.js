const { io } = require('../http');

const validateToken = require('./middlewares/validateToken');

const userBySocketID = {};
io.use(validateToken);

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
const gamesNamespace = io.of('/games');
gamesNamespace.use(validateToken).on('connection', (socket) => {
  socket.on('games:create', ({ roomId, userToInvite }) => {
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

  socket.on('games:join', ({ roomId }) => {
    console.log('enter room ' + roomId);
  });

  socket.on('disconnect', () => {});
});
