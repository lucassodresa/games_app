const { io } = require('../http');
const { usersHandler } = require('../webSocket/handlers/userHandler');
const { gamesHandler } = require('../webSocket/handlers/gameHandler');
const validateToken = require('./middlewares/validateToken');

io.use(validateToken);

io.of('/users').use(validateToken).on('connection', usersHandler);
io.of('/games').use(validateToken).on('connection', gamesHandler);

// const onConnection = (socket) => {
//   const user = socket._user;
//   const userID = user._id.toString();
//   userBySocketID[socket.id] = userID;
//   const usersOnline = Object.values(userBySocketID);
//   console.log(`${socket._user.name} connected: ${socket.id}`);

//   socket.emit('loadUsers', usersOnline);
//   socket.broadcast.emit('newUser', userID);
//   socket.on('disconnect', () => onDisconnection(socket));
// };

// const onDisconnection = (socket) => {
//   const user = socket._user;
//   const userID = user._id.toString();
//   delete userBySocketID[socket.id];
//   const socketsActive = Object.values(userBySocketID);
//   if (!socketsActive.includes(userID))
//     socket.broadcast.emit('userLeft', userID);
//   console.log(`${socket._user.name} disconnected`);
// };

// io.on('connection', onConnection);
