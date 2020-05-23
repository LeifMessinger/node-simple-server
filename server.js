console.log('Starting...');
//Make Server
const http = require('http');
const port = process.env.PORT || process.argv[2] || 8080;
const simple = require('noframe-http');
const server = http.createServer(simple.sauce);
//Attach Socket.io
const io = require('socket.io')(server);
var connections = [];
io.on('connection', function(socket){
	connections.push(socket);
	socket.on('disconnect', function(reason){
		connections.splice(connections.indexOf(socket),1);
	});
	socket.on('authenticate', function(code){
		for(let c in connections) if(connections[c].authCode == code) connections[c].emit('authenticated');
	});
	socket.authCode = Math.floor(Math.random()*9999);
	socket.emit('connected',socket.authCode);
	let count = connections.length;
	console.log("Connected: " + count + " clients.")
});
//Start Server
server.listen(port);
console.log('Started at ' + port);