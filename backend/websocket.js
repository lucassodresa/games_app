const { io } = require('./http');

const userBySocketID = {};

io.on('connection', (socket) => {
  let usersOnline = [];
  const user = socket._user;
  const userID = user._id.toString();
  console.log(`${socket._user.name} connected: ${socket.id}`);
  userBySocketID[socket.id] = userID;
  usersOnline = Object.values(userBySocketID);

  socket.emit('loadUsers', usersOnline);
  socket.broadcast.emit('newUser', userID);
  socket.on('disconnect', () => {
    console.log(`${socket._user.name} disconnected`);
    delete userBySocketID[socket.id];
    usersOnline = Object.values(userBySocketID);
    if (!usersOnline.includes(userID)) io.sockets.emit('userLeft', userID);
  });
});
