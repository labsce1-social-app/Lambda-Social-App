const express = require('express');
const middleware = require('./config/middleware');
const {
  userRouter,
  subtopicRouter,
  commentRouter,
  discussionRouter,
  upvoteRouter,
  subtopicUsersRouter
} = require('./routers/');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);


// middleware
app.use(express.json());
middleware(app);

app.use('/users', userRouter);
app.use('/subtopics', subtopicRouter);
app.use('/discussions', discussionRouter);
app.use('/comments', commentRouter);
app.use('/upvotes', upvoteRouter);
app.use('/subtopic_users', subtopicUsersRouter);


// configure sanity check
app.get('/', (req, res) =>
  res.status(200).send({ Success: 'Sanity check working...' })
);

io.on('connection', (socket) => {
  console.log('socket connected!!');
})

module.exports = server;
