console.log('Starting...');
//Make Server
const http = require('http');
const port = process.env.PORT || process.argv[2] || 8080;
const simple = require('noframe-http');
const server = http.createServer(simple.sauce);
//Attach Socket.io
const io = require('socket.io')(server);
io.on('connection', function(socket){
	socket.authCode = Math.floor(Math.random()*9999);
	socket.emit('connected',authCode);
	let count = 0;
	io.sockets.clients((error, clients) => {
		if (error) throw error;	//How do I ignore error pleas halp
		count = clients.length;
	});
	console.log("Connected: " + count + " clients.")
});
/*io.on('disconnect', function(){
	
});*/
//Start Server
server.listen(port);
console.log('Started at ' + port);