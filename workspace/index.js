var express = require('express');
var app = express();
var mysql = require('mysql');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

var pool = mysql.createPool({
  connectionLimit : 10,
  host : 'localhost',
  user : 'root',
  password : 'xodn**26',
  database : 'nodeproject'
});

app.get('/', function(req, res){ //route 메서드들은 위에서부터 순서대로 검사하다가 먼저걸리는 것에 들어간다.
  console.log(req.url);
  res.type('text/html');
  res.status(200);
  res.render('home');
});

app.get('/data', function(req, res){
  pool.query('SELECT * from google where Date > \'2015-08-19\'', function(err, rows, fields) {
    res.send(rows);
  });
});

app.use(function(req,res){//반드시 get 밑에 있어야한다.
  res.type('text/plain');
  res.status('404');
  res.send('404 - Not Fount');
});

app.use(function(err, req, res,next){
  console.error(err.stack);
  res.type('text/plain');
  res.status('500');
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});
