const express = require('express');
const middleware = require('./config/middleware');
const {
  userRouter,
  subtopicRouter,
  commentRouter,
  discussionRouter,
  upvoteRouter
} = require('./routers/');

const server = express();

// middleware
server.use(express.json());
middleware(server);

server.use('/users', userRouter);
server.use('/subtopics', subtopicRouter);
server.use('/discussions', discussionRouter);
server.use('/comments', commentRouter);
server.use('/upvotes', upvoteRouter);

// configure sanity check
server.get('/', (req, res) =>
  res.status(200).send({ Success: 'Sanity check working...' })
);

module.exports = server;
