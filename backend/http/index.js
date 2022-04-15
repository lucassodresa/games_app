require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const jsend = require('jsend');
const cors = require('cors');

const app = express();
const routes = require('./routes');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());

app.use(express.json());
app.use(jsend.middleware);
app.use('/api', routes);

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, { cors: { origin: '*' } });

module.exports = { serverHttp, io };
