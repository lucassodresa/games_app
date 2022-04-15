const gamesHandler = (socket) => {
  socket.on('disconnect', () => {});
};

module.exports = { gamesHandler };
