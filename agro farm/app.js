//declaration
var express = require('express');
var login = require('./controllers/login');
var home = require('./controllers/home');
var admin = require('./controllers/admin');
var distributor = require('./controllers/distributor');
var customer = require('./controllers/customer');
var owner = require('./controllers/owner');
var logout = require('./controllers/logout');
var ejs = require('ejs');
var Session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

//configuration
app.set('view engine', 'ejs');

//middleware 
app.use(bodyParser.urlencoded({extended:true}));
app.use(Session({secret: 'my top secret value', saveUninitialized: true, resave: false}));
app.use(cookieParser());


  


app.use('/abc', express.static('xyz'));
app.use('/admin', express.static('abc'));
app.use(express.static(path.join(__dirname, 'img')));

app.use('/login', login);
app.use('/home', home);
app.use('/admin', admin);
app.use('/distributor', distributor);
app.use('/customer', customer);
app.use('/owner', owner);
app.use('/logout', logout);

//routes
app.get('/', function(req, res){
	//res.send('Welcome');
	res.redirect('/home');
});

//server startup
app.listen(3000, function(){
	console.log('node server started at 3000!');
});