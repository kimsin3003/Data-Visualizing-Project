var http = require('http');
var fs = require('fs');

function write(req, res, text) {
  res.writeHead(200, {'Content-Type' : 'text/plain' });
  res.end(text);
}

function routing(req, res) {
  var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

  console.log(path);
  switch(path){
    case '':
      console.log("1");
      readFile(res, '/public/home.html', 'text/html');
      break;

/*    case '/visualizer.js':
      console.log("2");
      readFile(res, '/public/visualizer.js', 'text/javascript');
      break;

    case '/data.csv':
      console.log("3");
      readFile(res, '/public/data.csv', 'text/csv');
      break;

    case '/img/logo.jpg':
      console.log("4");
      readFile(res, '/public/img/logo.jpg', 'image/jpg');
      break;*/

    default:
      readFile(res, '/public/' + path, 'text/html');
      break;
  }
}

function readFile(res, path, contentType, responseCode) {
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err, data) {
    if(err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('500 - Internal Error');
    }else {
      res.writeHead(responseCode, { 'Content-Type': contentType});
      res.end(data);
    }
  });
}


http.createServer(routing).listen(3000);

console.log('Server started on localhost:3000; press Ctrl+C to terminate...');
