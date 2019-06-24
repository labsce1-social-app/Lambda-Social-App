// install heroku global `npm install -g heroku`
// login heroku `heroku login`
//From the top level of repo use command `git subtree push --prefix server heroku-backend master`
require('dotenv').config();
const http = require('http');
const app = require('./api/server.js');
const socketIO = require("socket.io");

const port = process.env.PORT || 3000;


const server = http.createServer(app);

const io = socketIO(server);
io.on("connection", socket => {
  console.log("a user connected");
})

// start the server
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port} ===\n`);
});
