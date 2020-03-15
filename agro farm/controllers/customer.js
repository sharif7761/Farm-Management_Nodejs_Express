var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var multer = require('multer');


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "img/"); //here we specify the destination. in this case i specified the current directory
    },
    filename: function(req, file, cb) {
      console.log(file); //log the file object info in console
      cb(null, file.originalname);//here we specify the file saving name. in this case. 
  //i specified the original file name .you can modify this name to anything you want
    }
  });

  var upload = multer({ storage: storage });


  router.get('/', function(req, res){
	userModel.getByCid(req.session.Cus_id, function(result){
		userModel.getAllCart(req.session.Cus_id,function(results1){
			res.render('customer/index', {user: result,cartCount:results1.length,name:req.session.name,Cus_id:req.session.Cus_id});
			
			});
		
	});
});

	router.post('/', function(req, res){
		res.render('index');
	});



router.post('/changePic',upload.single("file"), function(req, res){
	
		var data = {
			
			Cid: req.session.Cus_id,
			pic: req.file.filename
		};
		
		userModel.updateCusPic(data, function(status){
			if(status){

				res.redirect('/home');
			}else{
				res.redirect('/home');
			}
		});
});


router.post('/edit_info', function(req, res){

	var cus = {
		Cid: req.body.Cus_id,
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		address: req.body.address,
		

	};

	userModel.updateCustomer(cus, function(status){
		if(status){
			res.redirect('/home');	


		}else{

			res.redirect('/home');
		}
	});
});


router.post('/delete_user', function(req, res){

	var user = {
		Uid: req.body.Uid
	};

	userModel.deleteUser(user, function(status){
		if(status){
			res.redirect('/customer/userreport');
		}else{
			res.redirect('/customer/userreport');
		}
	});
});


// customer profile starts




	router.get('/profile/:id', function(req, res){
		userModel.getByCid(req.params.id, function(results){
			userModel.getAllCart(req.session.Cus_id,function(results1){
				res.render('customer/profile', {user: results,cartCount:results1.length,name:req.session.name,Cus_id:req.session.Cus_id,Cus_id:req.session.Cus_id});
				
				});

			
		});
	});

	
router.post('/changePass/:id', function(req, res){
	var pass={
			old: req.body.old_pass,
			new: req.body.new_pass,
			con: req.body.con_pass,
			id:req.params.id
	};	
	
		
			if( req.body.new_pass== req.body.con_pass){
				userModel.updateCusPass(pass,function(status){
					res.redirect('/home');			
				});
			}
		
		
	
});



// customer profile ends



	//abid
	
	router.get('/food_details/:id', function(req, res){
		userModel.getByIdFood(req.params.id, function(results){
			userModel.getKnowFood(results[0].Type,function(results1){

				userModel.getAllCart(req.session.Cus_id,function(results10){
					userModel.getAllReview(req.params.id,function(results5){

				res.render('customer/food_details', {review5:results5,cartCount:results10.length,foodlist: results,foodlist1: results1,name:req.session.name,Cus_id:req.session.Cus_id});

			});
			});
		});
		});
	});
router.get('/fruit', function(req, res){
	
		userModel.getAllFruits(function(results){
			if(results.length > 0){

				userModel.getAllCart(req.session.Cus_id,function(results1){

				res.render('customer/fruit', {foodlist: results,name:req.session.name,Cus_id:req.session.Cus_id,cartCount:results1.length});
			});
			}else{
				res.redirect('/customer');
			}
		});
});

router.get('/crops', function(req, res){
	
		userModel.getAllCrops(function(results){
			if(results.length > 0){

				userModel.getAllCart(req.session.Cus_id,function(results1){

				res.render('customer/crops', {cartCount:results1.length,foodlist: results,name:req.session.name,Cus_id:req.session.Cus_id});

			});
			}else{
				res.redirect('/customer');
			}
		});
});

router.get('/vegetable', function(req, res){
	
		userModel.getAllVegetable(function(results){
			if(results.length > 0){

				userModel.getAllCart(req.session.Cus_id,function(results1){

				res.render('customer/vegetable', {cartCount:results1.length,foodlist: results,name:req.session.name,Cus_id:req.session.Cus_id});
			});
			}else{
				res.redirect('/customer');
			}
		});
});


//abid ends

//cart starts

router.get('/shop', function(req, res){
	userModel.getAllCart(req.session.Cus_id,function(results){
		res.render('customer/shop',{cartCount:results.length,name:req.session.name,Cus_id:req.session.Cus_id});
	
	});
		
			
		});
		
		
		router.get('/cart', function(req, res){
			var cid=req.session.Cus_id;
			userModel.getAllCart(req.session.Cus_id,function(results){
				if(results.length >= 0){
					
					res.render('customer/cart', {cartlist: results,cartCount:results.length,name:req.session.name,Cus_id:req.session.Cus_id});
				}else{
					res.render('customer/shop');
				}
		});
			
		
				});


router.post('/addcart/:id/:Cid/:Fprice', function(req, res){

	var cart = {
		
		quantity: req.body.Quantity,
		Fid:req.params.id,
		Cid:req.params.Cid,
		Fprice:req.params.Fprice
		
		
	};

	userModel.insertCart(cart, function(status){
		if(status){
			
			userModel.getAllCart(req.session.Cus_id,function(results){
				if(results.length >=0){
					
					res.render('customer/cart', {cartlist: results,cartCount:results.length,name:req.session.name,Cus_id:req.session.Cus_id});
			
		}else{
			res.render('customer/shop');
		}
	});
}
});
});


 router.get('/about', function(req, res){

userModel.getAllCart(req.session.Cus_id,function(results){
				if(results.length >=0){
					
					res.render('customer/about', {cartCount:results.length,name:req.session.name,Cus_id:req.session.Cus_id});
			
		}else{
			res.render('customer/shop');
		}
	});
  	
 
  	
	
	
	
});


router.post('/delete_cart/:id', function(req, res){

	var deleteCart = {
		
		
		Fid:req.params.id,
		Cid:req.session.Cus_id
		
		
	};

	userModel.deleteCart(deleteCart, function(status){
		if(status){

			userModel.getAllCart(req.session.Cus_id,function(results){
				if(results.length >= 0){
					res.render('customer/cart', {cartlist: results,cartCount:results.length,name:req.session.name,Cus_id:req.session.Cus_id});
				}else{
					res.render('customer/shop');
				}
		});
		}else{
			res.render('customer/shop');
		}
	});
});


router.post('/update_cart/:id', function(req, res){

	var updateCart = {
		
		
		Fid:req.params.id,
		qty:req.body.qty
		
	};

	userModel.updateCart(updateCart, function(status){
		if(status){

			userModel.getAllCart(req.session.Cus_id,function(results){
				if(results.length >=0){
					res.render('customer/cart', {cartlist: results,cartCount:results.length,name:req.session.name,Cus_id:req.session.Cus_id});
				}else{
					res.render('customer/shop');
				}
		});
		}else{
			res.render('customer/shop');
		}
	});
});


//checkout

router.get('/checkout', function(req, res){
	userModel.getByCid(req.session.Cus_id, function(result){
		console.log(result);
	userModel.getAllCart(req.session.Cus_id,function(results){
		if(results.length >=0){
			
				res.render('customer/checkout',{cartlist: results,user:result,cartCount:results.length,name:req.session.name,Cus_id:req.session.Cus_id});
			}
			
	

	});
});

});


router.post('/checkout', function(req, res){

	

	userModel.getAllCart(req.session.Cus_id,function(results){

		for(var i=0; i<results.length;i++){
			var checkout = {
		
				Cmail: req.body.email,
				Cname:req.body.name,
				Cid:req.session.Cus_id,
				Cphone:req.body.phone,
				Caddress:req.body.address,
				Fid: results[i].Fid,
				Fname: results[i].Fname,
				qty: results[i].qty,
				price: results[i].price
				
				
			};
			userModel.insertOrder(checkout, function(status){
					


			});
		}

		userModel.deleteCartch(checkout,function(status){
			
			
			res.redirect('/customer');
			
		});

	});

	
});




//new review

router.post('/review/:id/:Cid', function(req, res){

	var review = {
		
		text: req.body.review,
		Fid:req.params.id,
		Cid:req.params.Cid
		
		
	};

	userModel.insertReview(review, function(status){
		if(status){
			
			userModel.getAllCart(req.session.Cus_id,function(results){
				if(results.length >=0){
					
					res.render('customer/shop', {cartlist: results,cartCount:results.length,name:req.session.name,Cus_id:req.session.Cus_id});
			
		}else{
			res.render('customer/shop');
		}
	});
}
});
});


//searchfruit

router.post('/searchFruit', function(req, res){

	var fruit = {
		
		Fname: req.body.search,
		

	};

userModel.searchFruit(fruit, function(results){
	if(results.length > 0){
		userModel.getAllCart(req.session.Cus_id,function(results1){
		res.render('customer/fruit', {foodlist: results,name:req.session.name,Cus_id:req.session.Cus_id,cartCount:results1.length});
	});
	}else{
		res.redirect('/customer/orderreport');
	}
});
});

//crops

router.post('/searchCrop', function(req, res){

	var crop = {
		
		Fname: req.body.search,
		

	};

userModel.searchCrop(crop, function(results){
	if(results.length > 0){
		userModel.getAllCart(req.session.Cus_id,function(results1){
		res.render('customer/crops', {foodlist: results,name:req.session.name,Cus_id:req.session.Cus_id,cartCount:results1.length});
	});
	}else{
		res.redirect('/customer/orderreport');
	}
});
});


router.get('/orderreport', function(req, res){

	userModel.getAllCart(req.session.Cus_id,function(results1){
		var cid=req.session.Cus_id;
	userModel.getAllCorders(cid,function(results){
		if(results.length > 0){
			res.render('customer/orderreport', {orderlist: results,name:req.session.name,Cus_id:req.session.Cus_id,cartCount:results1.length});
		}else{
			res.redirect('/customer');
		}
	});

	});

	
});

router.post('/searchorder', function(req, res){


	userModel.getAllCart(req.session.Cus_id,function(results1){
		var order = {
		
		Fname: req.body.search,
		cid:req.session.Cus_id

	};

userModel.searchCOrder(order, function(results){
	if(results.length > 0){
		res.render('customer/orderreport', {orderlist: results,name:req.session.name,Cus_id:req.session.Cus_id,cartCount:results1.length});
	}else{
		res.redirect('/customer/orderreport');
	}
});

	});

	
});



//veg

router.post('/searchVeg', function(req, res){

	var veg = {
		
		Fname: req.body.search,
		

	};

userModel.searchVeg(veg, function(results){
	if(results.length > 0){
		userModel.getAllCart(req.session.Cus_id,function(results1){
		res.render('customer/vegetable', {foodlist: results,name:req.session.name,Cus_id:req.session.Cus_id,cartCount:results1.length});
	});
	}else{
		res.redirect('/customer/orderreport');
	}
});
});







module.exports = router;