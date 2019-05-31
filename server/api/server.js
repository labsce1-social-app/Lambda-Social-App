const express = require('express');
const server = express();

// configure sanity check
server.get('/', (req, res) =>
  res.status(200).send({ Success: 'Sanity check working...' })
);

module.exports = server;
