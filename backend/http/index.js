require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const jsend = require('jsend');
const cors = require('cors');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const isStaging = process.env.NODE_ENV === 'staging';

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

if (isProd || isStaging) {
  app.use(express.static('../frontend/build'));

  app.get('/favicon.ico', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'frontend', 'build', '/favicon.ico')
    );
  });

  app.get('*', (req, res) => {
    console.log(__dirname);
    res.sendFile(
      path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')
    );
  });
}

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, { cors: { origin: '*' } });

module.exports = { serverHttp, io };
