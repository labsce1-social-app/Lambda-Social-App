const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const server = express();

// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));

// configure sanity check
server.get('/', (req, res) =>
  res.status(200).send({ Success: 'Sanity check working...' })
);

module.exports = server;
