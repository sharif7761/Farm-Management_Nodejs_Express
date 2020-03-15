var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');




router.get('/', function(req, res){
	
		res.render('home/index');
	
});

router.get('/about', function(req, res){
	
	res.render('home/about');
	
});

router.get('/shop', function(req, res){
	
	res.render('home/shop');
	
});


router.post('/login', function(req, res){

	var user ={
		Email: req.body.email,
		Password: req.body.password
	};

	userModel.validate(user, function(results){
	 	if(results.length>0){
				if(results[0].Position=="Manager"){
					req.session.uname=results[0].Uname;
					req.session.email=results[0].Email;
					req.session.Uid=results[0].Uid;
					//res.cookie('username', results[0].Uname);

					res.redirect('/admin');
					
				
			}
			else if(results[0].Position=="Owner"){
				req.session.uname=results[0].Uname;
					req.session.email=results[0].Email;
					req.session.Uid=results[0].Uid;
				res.redirect('/owner');
			}
			else if(results[0].type=="customer"){
				req.session.Cus_id=results[0].Cus_id;
					req.session.email=results[0].email;
					req.session.name=results[0].name;
				res.redirect('/customer');
			}
			else if(results[0].type=="Distributor"){
					req.session.Dis_id=results[0].Dis_id;
					req.session.email=results[0].email;
					req.session.name=results[0].name;

				res.redirect('/distributor');
			}
			
		}else{
			res.send('invalid username/password');
			
		}
	});
});
router.get('/signup', function(req, res){
	
	res.render('home/signup');
	
});

router.post('/signup', function(req, res){

	var customer = {
		
		name: req.body.username,
		phone: req.body.phone,
		email: req.body.email,
		address: req.body.address,
		password: req.body.password

		
	};
if( req.body.password== req.body.con_password){
	userModel.insertCustomer(customer, function(status){
		if(status){

			res.redirect('/home');
		}else{
			res.redirect('/home');
		}
	});
}
});



module.exports = router;