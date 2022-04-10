const { io } = require('./http');

let usersOnline = [];
io.on('connection', (socket) => {
  const user = socket._user;
  console.log(`${socket._user.name} connected`);

  usersOnline.push(user._id.toString());
  usersOnline = [...new Set(usersOnline)];
  socket.emit('loadUsers', usersOnline);
  socket.broadcast.emit('newUser', user._id);
  socket.on('disconnect', () => {
    console.log(`${socket._user.name} disconnected`);
    usersOnline.filter((id) => id !== user._id);
    socket.broadcast.emit('userLeft', user._id);
  });
});
