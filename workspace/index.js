var express = require('express');
var app = express();
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(cookieParser());
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

/*
app.get('/visualize', function(req, res){
  res.render('visualize');
})
*/

app.post('/search', function(req, res){
  if(req.body.sYear && req.body.sMonth && req.body.sDay && req.body.eYear && req.body.eMonth && req.body.eDay)
  {
    var startDate = req.body.sYear + "-" + req.body.sMonth + "-" + req.body.sDay;
    var endDate = req.body.eYear + "-" + req.body.eMonth + "-" + req.body.eDay;
    res.cookie('startDate', startDate, {
      maxAge:60*1000,
    });
    res.cookie('endDate', endDate, {
      maxAge:60*1000,
    });
    res.render('visualize');
  }
});

app.get('/data', function(req, res){
  var start = req.cookies.startDate;
  var end = req.cookies.endDate;
  pool.query('select g.Date as date, g.Price as google, a.Price as apple, s.Price/1000 as samsung from google as g join apple as a join samsung as s on g.Date = a.Date and a.Date = s.Date where g.Date > \''+ start+ '\' and g.Date < \''+ end+ '\'', function(err, rows, fields) {
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
