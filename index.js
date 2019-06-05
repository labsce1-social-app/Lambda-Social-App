// install heroku global `npm install -g heroku`
// login heroku `heroku login`
//From the top level of repo use command `git subtree push --prefix server heroku-backend master`

const server = require('./server/api/server.js');
const port = process.env.PORT || 3000;

// start the server
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port} ===\n`);
});
