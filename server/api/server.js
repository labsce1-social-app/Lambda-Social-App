const express = require('express');
const middleware = require('./config/middleware');
const { userRouter } = require('../api/routers/index.js');

const server = express();

// middleware
server.use(express.json());
middleware(server);

server.use('/api', userRouter);

// configure sanity check
server.get('/', (req, res) =>
  res.status(200).send({ Success: 'Sanity check working...' })
);

module.exports = server;
