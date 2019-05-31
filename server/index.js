const server = require('./api/server.js');
const port = process.env.PORT || 3000;

// start the server
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port} ===\n`);
});
