var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	req.session.uname=null;
					req.session.email=null;
					req.session.Uid=null;
					req.session.Cus_id=null;
					req.session.email=null;
					req.session.name=null;

	
//res.clearCookie('username');
	res.redirect('/home');
});

module.exports = router;