var express = require('express');
var app = express();
var port = 3000;

// mustache config
var mustache = require('mustache-express');
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// body parser config
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// logger config 
var logger = require('morgan');
app.use(logger('dev'));

// method override config 
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

//route homepage
app.get("/", function(req, res){
  res.render("./index");
})

// use controller 
var termsController = require('./controllers/termsController');
app.use("/terms", termsController);

app.listen(port, function(){
  console.log('---------------------------------------');
  console.log('Express listening on localhost:' + port);
  console.log('---------------------------------------');
})