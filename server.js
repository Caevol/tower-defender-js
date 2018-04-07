let http = require('http');
let path = require('path');
let fs = require('fs');

let mimeTypes = {
    '.js' : 'text/javascript',
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.png' : 'image/png',
    '.jpg' : 'image/jpeg',
    '.mp3' : 'audio/mpeg3',
	'.wav' : 'audio/wav',
	'.ogg' : 'audio/ogg'
};

function handleRequest(request, response) {
    let lookup = (request.url === '/') ? '/index.html' : decodeURI(request.url);
    let file = lookup.substring(1, lookup.length);

    fs.exists(file, function(exists) {
        if (exists) {
            fs.readFile(file, function(err, data) {
                if (err) {
                    response.writeHead(500);
                    response.end('Server Error!');
                } else {
                    let headers = {'Content-type': mimeTypes[path.extname(lookup)]};
                    response.writeHead(200, headers);
                    response.end(data);
                }
            });
        } else {
            response.writeHead(404);
            response.end();
        }
    });
}

let server = http.createServer(handleRequest);
let io = require('socket.io')(server);

let scores = [0, 0, 0, 0, 0];

io.on('connection', function(socket){
    console.log('Connection established');

    socket.on('score', function(data){
        console.log("New score " + data.score);
        scores.push(data.score);
        scores = scores.sort(function (a, b) {  return -1 *(a - b);  });
        scores.pop();
    });

    socket.on('getScores', function(data){
        socket.emit('scoreResult', { scores: scores });
    });

});


server.listen(3000, function() {
    console.log('Server listening on port 3000');
});