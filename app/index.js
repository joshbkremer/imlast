var express = require('express');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var CollectionDriver = require('./collectionDriver').CollectionDriver;

var app = express();
var collectionDriver;

//MongoClient.connect(process.env.MONGOHQ_URL, function(err, db){
//  if (err) {
//      console.error("Error! Exiting... Must start MongoDB first");
//      process.exit(1);
//  }
//
//  collectionDriver = new CollectionDriver(db); //F
//});

var mongoClient = new MongoClient(new Server('localHost', 27017));
mongoClient.open(function(err, mongoClient) { //C
  if (!mongoClient) {
      console.error("Error! Exiting... Must start MongoDB first");
      process.exit(1); //D
  }
  var db = mongoClient.db("imLastDB");  //E
  collectionDriver = new CollectionDriver(db); //F
});



app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT ||3000, function() {
  console.log('Example app listening on port 3000!');
});
