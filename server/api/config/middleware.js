const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const io = require('socket.io');

// import all middleware here then export it to server.js
module.exports = server => {
  server.use(helmet());
  server.use(cors());
  server.use(morgan('dev'));
};
