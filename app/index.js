var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')

var app = express();
var currentVideo = 'https://www.youtube.com/embed/8s3UogfAGg0';
var currentPrice = '2.00';

// parse application/json
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

app.get('/', function(res) {
  console.log("sup");
});

app.get('/currentVideo', function(req, res) {
  res.send(200, {youtubeSrc: currentVideo, price: currentPrice});
});

app.post('/postVideo', function(req, res) {
  currentVideo = req.body.newVideo;

  var priceDouble = parseFloat(currentPrice) + 1.00;
  currentPrice = priceDouble.toString();

  res.send(200, {youtubeSrc: currentVideo, price: currentPrice});
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Example app listening on port 3000!');
});
