const express = require('express');
const middleware = require('./config/middleware')

const server = express();

// middleware
server.use(express.json());
middleware(server);


// configure sanity check
server.get('/', (req, res) =>
  res.status(200).send({ Success: 'Sanity check working...' })
);

module.exports = server;
