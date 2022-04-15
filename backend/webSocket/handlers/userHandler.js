const userBySocketID = {};

const usersHandler = (socket) => {
  const userID = socket._user._id.toString();
  userBySocketID[socket.id] = userID;
  const usersOnline = Object.values(userBySocketID);
  console.log(`${socket._user.name} connected: ${socket.id}`);

  socket.emit('loadUsers', usersOnline);
  socket.broadcast.emit('newUser', userID);

  socket.on('disconnect', () => {
    const userID = socket._user._id.toString();
    delete userBySocketID[socket.id];
    const socketsActive = Object.values(userBySocketID);
    if (!socketsActive.includes(userID))
      socket.broadcast.emit('userLeft', userID);
    console.log(`${socket._user.name} disconnected`);
  });
};

module.exports = { usersHandler };
