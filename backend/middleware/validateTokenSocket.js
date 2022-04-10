require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const validateTokenSocket = async (socket, next) => {
  try {
    const authToken = socket?.handshake?.auth?.token;

    if (!authToken) throw 'No token provided.';

    const parts = authToken.split(' ');

    if (parts.length !== 2) throw 'Token error.';

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme) || !token) throw 'Malformed token.';

    const tokenUser = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findById(tokenUser.id);

    if (!user) throw 'Token invalid.';
    if (!user.active) throw 'User inactive.';

    socket._user = user;
    return next();
  } catch (error) {
    next(new Error(error));
  }
};

module.exports = validateTokenSocket;
