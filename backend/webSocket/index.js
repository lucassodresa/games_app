const { io } = require('../http');
const { usersHandler } = require('../webSocket/handlers/userHandler');
const { gamesHandler } = require('../webSocket/handlers/gameHandler');
const validateToken = require('./middlewares/validateToken');

io.use(validateToken);

io.of('/users').use(validateToken).on('connection', usersHandler);
io.of('/games').use(validateToken).on('connection', gamesHandler);
