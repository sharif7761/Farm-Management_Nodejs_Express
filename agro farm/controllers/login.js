var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();

router.get('/', function(req, res){
	res.render('login/index');
});

router.get('/register', function(req, res){
	
		res.render('login/register');
	
});

router.post('/', function(req, res){

	var user ={
		username: req.body.uname,
		password: req.body.password
	};

	userModel.validate(user, function(status){
	 	if(status){
			res.cookie('username', req.body.uname);
			if(req.body.type=='Admin'){
				res.redirect('/home');
			}
			else{
				res.redirect('/Cushome');
			}
			
		}else{
			res.send('invalid username/password');
		}
	});
});


router.post('/register', function(req, res){
	
		var user = {
			id: req.body.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.insert(user, function(status){
			if(status){
				res.redirect('/login');
			}else{
				res.redirect('/login');
			}
		});
});


module.exports = router;