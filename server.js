console.log('Starting...');
const http = require('http');
const port = process.env.PORT || process.argv[2] || 8080;
const simple = require('noframe-http');
const server = http.createServer(simple.sauce);
server.listen(port);
console.log('Started at ' + port);