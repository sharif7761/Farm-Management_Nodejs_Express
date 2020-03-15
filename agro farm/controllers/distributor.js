var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model2');
var multer = require('multer');

router.get('/', function(req, res){
	userModel.getBydUname(req.session.name, function(result){
		res.render('distributor/index', {user: result});
	});
});
 router.get('/', function(req, res){
	userModel.getBydid(req.session.Dis_id, function(result){
		res.render('distributor/index', {user: result});
	});
});

	router.post('/', function(req, res){
		res.render('index');
	});

	router.get('/about', function(req, res){
		res.render('distributor/about');
	});


router.get('/fruit', function(req, res){
	
		userModel.getAllFruits(function(results){
			if(results.length > 0){
				res.render('distributor/fruit', {foodlist: results});
			}else{
				res.redirect('/distributor');
			}
		});
});

router.get('/crops', function(req, res){
	
		userModel.getAllCrops(function(results){
			if(results.length > 0){
				res.render('distributor/crops', {foodlist: results});
			}else{
				res.redirect('/distributor');
			}
		});
});

router.get('/vegetable', function(req, res){
	
		userModel.getAllVegetable(function(results){
			if(results.length > 0){
				res.render('distributor/vegetable', {foodlist: results});
			}else{
				res.redirect('/distributor');
			}
		});
});

////shop 

router.get('/shop', function(req, res){
	
	res.render('distributor/shop');
	
});


/////transaction start


router.post('/searchTransaction', function(req, res){

	var transaction = {
		
		trname: req.body.search

	};
	
	userModel.searchdTransactions(transaction, function(results){
		if(results.length > 0){
			res.render('distributor/transactionreport', {transactionlist: results});
		}else{
			res.redirect('/distributor/transactionreport');
		}
	});
});


router.get('/transactionreport', function(req, res){
	
	userModel.getAlldtransactions(function(results){
		if(results.length > 0){
			res.render('distributor/transactionreport', {transactionlist: results});
		}else{
			res.redirect('/distributor');
		}
	});
});




router.post('/addtransaction', function(req, res){

	var transaction = {
		
		trname: req.body.Trname,
		description: req.body.Description,
		type: req.body.Type,
		price: req.body.Price
		
	};

	userModel.insertdTransaction(transaction, function(status){
		if(status){

			res.redirect('/distributor/transactionreport');
		}else{
			res.redirect('/distributor/transactionreport');
		}
	});
});


router.post('/update_transaction', function(req, res){

	var transaction = {
		trid: req.body.Trid,
		trname: req.body.Trname,
		description: req.body.Description,
		type: req.body.Type,
		price: req.body.Price
	};

	userModel.updatedTransaction(transaction, function(status){
		if(status){
			res.redirect('/distributor/transactionreport');	


		}else{

			res.redirect('/distributor/transactionreport');
		}
	});
});


router.post('/delete_transaction', function(req, res){

	var transaction = {
		trid: req.body.Trid
	};

	userModel.deletedTransaction(transaction, function(status){
		if(status){
			res.redirect('/distributor/transactionreport');
		}else{
			res.redirect('/distributor/transactionreport');
		}
	});
});

//transaction ends

////warehouse report starts

router.post('/searchWarehouse', function(req, res){

	var warehouse = {
		
		fname: req.body.search

	};
	
	userModel.searchdWarehouses(warehouse, function(results){
		if(results.length > 0){
			res.render('distributor/warehousereport', {warehouselist: results});
		}else{
			res.redirect('/distributor/warehousereport');
		}
	});
});


router.get('/warehousereport', function(req, res){
	
	userModel.getAlldwarehouses(function(results){
		if(results.length > 0){
			res.render('distributor/warehousereport', {warehouselist: results});
		}else{
			res.redirect('/distributor');
		}
	});
});




router.post('/addwarehouse', function(req, res){

	var warehouse = {
		
		wname: req.body.Wname,
		quantity: req.body.Quantity,
		fname: req.body.FoodName
		
	};

	userModel.insertdWarehouse(warehouse, function(status){
		if(status){

			res.redirect('/distributor/warehousereport');
		}else{
			res.redirect('/distributor/warehousereport');
		}
	});
});


router.post('/update_warehouse', function(req, res){

	var warehouse = {
		wid: req.body.Wid,
		wname: req.body.Wname,
		quantity: req.body.Quantity,
		fname: req.body.FoodName
	};

	userModel.updatedWarehouse(warehouse, function(status){
		if(status){
			res.redirect('/distributor/warehousereport');	


		}else{

			res.redirect('/distributor/warehousereport');
		}
	});
});


router.post('/delete_warehouse', function(req, res){

	var warehouse = {
		wid: req.body.Wid
	};

	userModel.deletedWarehouse(warehouse, function(status){
		if(status){
			res.redirect('/distributor/warehousereport');
		}else{
			res.redirect('/distributor/warehousereport');
		}
	});
});
///warehouse ends


//employee report starts

router.get('/employeereport', function(req, res){
	
	userModel.getAlldemployees(function(results){
		if(results.length > 0){
			res.render('distributor/employeereport', {employeelist: results});
		}else{
			res.redirect('/distributor');
		}
	});
});




router.post('/addemployee', function(req, res){

	var employee = {
		
		Ename: req.body.Ename,
		Phone: req.body.Phone,
		Salary: req.body.Salary,
		Address: req.body.Address,
		Position: req.body.Position

		
	};

	userModel.insertdEmployee(employee, function(status){
		if(status){

			res.redirect('/distributor/employeereport');
		}else{
			res.redirect('/distributor/employeereport');
		}
	});
});


router.post('/update_employee', function(req, res){

	var employee = {
		Eid: req.body.Eid,
		Ename: req.body.Ename,
		Phone: req.body.Phone,
		Salary: req.body.Salary,
		Address: req.body.Address,
		Position: req.body.Position
	};

	userModel.updatedEmployee(employee, function(status){
		if(status){
			res.redirect('/distributor/employeereport');	


		}else{

			res.redirect('/distributor/employeereport');
		}
	});
});


router.post('/delete_employee', function(req, res){

	var employee = {
		Eid: req.body.Eid
	};

	userModel.deletedEmployee(employee, function(status){
		if(status){
			res.redirect('/distributor/employeereport');
		}else{
			res.redirect('/distributor/employeereport');
		}
	});
});

router.post('/searchEmployee', function(req, res){

	var employee = {
		
		Ename: req.body.search

	};

userModel.searchdEmployee(employee, function(results){
	if(results.length > 0){
		res.render('distributor/employeereport', {employeelist: results});
	}else{
		res.redirect('/distributor/employeereport');
	}
});
});

///employee ends


//Distributor Order report starts

router.get('/orderreport', function(req, res){
	
	userModel.getAlldorders(function(results){
		if(results.length > 0){
			res.render('distributor/orderreport', {orderlist: results});
		}else{
			res.redirect('/distributor');
		}
	});
});


router.post('/update_order', function(req, res){

	var order = {
		Status: req.body.Status,
		Order_id:req.body.Order_id
		
	};

	userModel.updatedOrder(order, function(status){
		if(status){
			res.redirect('/distributor/orderreport');	


		}else{

			res.redirect('/distributor/orderreport');
		}
	});
});

router.post('/searchorder', function(req, res){

	var order = {
		
		Fname: req.body.search

	};

userModel.searchdOrder(order, function(results){
	if(results.length > 0){
		res.render('distributor/orderreport', {orderlist: results});
	}else{
		res.redirect('/distributor/orderreport');
	}
});
});

///Order ends

//distributor report starts

router.get('/distributorreport', function(req, res){
	
	userModel.getAllddistributors(function(results){
		if(results.length > 0){
			res.render('distributor/distributorreport', {distributorlist: results});
		}else{
			res.redirect('/distributor');
		}
	});
});



router.post('/delete_distributor', function(req, res){

	var distributor = {
		Cus_id: req.body.Cus_id
	};

	userModel.deleteddistributor(distributor, function(status){
		if(status){
			res.redirect('/distributor/distributorreport');
		}else{
			res.redirect('/distributor/distributorreport');
		}
	});
});

router.post('/searchdistributor', function(req, res){

	var distributor = {
		
		name: req.body.search

	};

userModel.searchddistributor(distributor, function(results){
	if(results.length > 0){
		res.render('distributor/distributorreport', {distributorlist: results});
	}else{
		res.redirect('/distributor/distributorreport');
	}
});
});

///distributor ends

// Distributor profile starts

	router.get('/profile/:id', function(req, res){
		userModel.getBydUname(req.session.uname, function(result){
			res.render('distributor/profile/:id', {user: result});
		});
	});


//  Distributor profile ends
//abid
	
	router.get('/food_details/:id', function(req, res){
		userModel.getByIdFood(req.params.id, function(results){
			userModel.getKnowFood(results[0].Type,function(results1){
				res.render('distributor/food_details', {Dis_id: req.session.Dis_id,foodlist: results,foodlist1: results1});

			});
			
		});
	});
router.get('/fruit', function(req, res){
	
		userModel.getAllFruits(function(results){
			if(results.length > 0){
				res.render('distributor/fruit', {foodlist: results});
			}else{
				res.redirect('/distributor');
			}
		});
});

router.get('/crops', function(req, res){
	
		userModel.getAllCrops(function(results){
			if(results.length > 0){
				res.render('distributor/crops', {foodlist: results});
			}else{
				res.redirect('/distributor');
			}
		});
});

router.get('/vegetable', function(req, res){
	
		userModel.getAllVegetable(function(results){
			if(results.length > 0){
				res.render('distributor/vegetable', {foodlist: results});
			}else{
				res.redirect('/distributor');
			}
		});
});

//abid
	
	router.get('/food_details/:id', function(req, res){
		userModel.getByIdFood(req.params.id, function(results){
			userModel.getKnowFood(results[0].Type,function(results1){
				res.render('distributor/food_details', {foodlist: results,foodlist1: results1,user: req.session.Dis_id});

			});
			
		});
	});
router.get('/fruit', function(req, res){
	
		userModel.getAllFruits(function(results){
			if(results.length > 0){
				res.render('distributor/fruit', {foodlist: results});
			}else{
				res.redirect('/distributor');
			}
		});
});

router.get('/crops', function(req, res){
	
		userModel.getAllCrops(function(results){
			if(results.length > 0){
				res.render('distributor/crops', {foodlist: results});
			}else{
				res.redirect('/distributor');
			}
		});
});

router.get('/vegetable', function(req, res){
	
		userModel.getAllVegetable(function(results){
			if(results.length > 0){
				res.render('distributor/vegetable', {foodlist: results});
			}else{
				res.redirect('/distributor');
			}
		});
});


//abid ends

//cart starts

router.get('/shop', function(req, res){
	//userModel.getCartRow(function(results){
	//	if(results.length > 0){
			res.render('distributor/shop');
	//	}else{
	//		res.render('distributor/shop');
	//	}
	//});
	

		});

//cart starts

router.post('/addcart/:id/Dis_id/Fprice', function(req, res){

	var cart = {
		
		quantity: req.body.Quantity,
		Fid:req.params.id,
		Dis_id:req.params.Dis_id,
		Fprice:req.params.Fprice
		
		
	};

	userModel.insertCart(cart, function(status){
		if(status){

			res.render('distributor/cart',{cartlist:results});
		}else{
			res.redirect('/distributor/');
		}
	});
});



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
		res.render('distributor/index', {user: result});
	});
});

	router.post('/', function(req, res){
		res.render('index');
	});

router.get('/foodreport', function(req, res){
	
		userModel.getAllFoods(function(results){
			if(results.length > 0){
				res.render('distributor/foodreport', {foodlist: results});
			}else{
				res.redirect('/distributor');
			}
		});
});




router.post('/addfood',upload.array('file', 3), function(req, res){
	
		var food = {
			
			fimage: req.files[0].filename,
			fimage1: req.files[1].filename,
			fimage2: req.files[2].filename,
			foodname: req.body.fname,
			quantity: req.body.Quantity,
			type: req.body.Type,
			PRate: req.body.pRate,
			SRate: req.body.sRate,
			description: req.body.description
		};

		userModel.insertFood(food, function(status){
			if(status){

				res.redirect('/distributor/foodreport');
			}else{
				res.redirect('/distributor/foodreport');
			}
		});
});


router.post('/update_food', function(req, res){
	
		var food = {
			fid: req.body.Fid,
			foodname: req.body.food_name,
			quantity: req.body.quantity,
			type: req.body.type,
			PRate: req.body.PRate,
			SRate: req.body.SRate,
			description: req.body.Description
		};

		userModel.updateFood(food, function(status){
			if(status){
				console.log(food.PRate);
				res.redirect('/distributor/foodreport');	


			}else{

				res.redirect('/distributor/foodreport');
			}
		});
});




router.post('/delete_food', function(req, res){
	
		var food = {
			fid: req.body.Fid
		};

		userModel.deleteFood(food, function(status){
			if(status){
				res.redirect('/distributor/foodreport');
			}else{
				res.redirect('/distributor/foodreport');
			}
		});
});


router.post('/searchFood', function(req, res){

	var food = {
		
		foodname: req.body.search

	};
	
	userModel.searchFoods(food, function(results){
		if(results.length > 0){
			res.render('distributor/foodreport', {foodlist: results});
		}else{
			res.redirect('/distributor/foodreport');
		}
	});
});

router.get('/food_details/:id', function(req, res){
		userModel.getByIdFood(req.params.id, function(results){
		userModel.getKnowFood(results[0].Type,function(results1){
				res.render('distributor/food_details', {foodlist: results,foodlist1: results1,user: req.session.Dis_id});

			});
			
		});
	});
//cart starts

router.get('/shop', function(req, res){
	//userModel.getCartRow(function(results){
	//	if(results.length > 0){
			res.render('distributor/shop');
	//	}else{
	//		res.render('distributor/shop');
	//	}
	//});
	

		});
		
		router.get('/cart', function(req, res){
			userModel.getAllCart(function(results){
				if(results.length > 0){
					res.render('distributor/cart', {cartlist: results});
				}else{
					res.render('distributor/shop');
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

			res.render('distributor/shop');
		}else{
			res.render('distributor/shop');
		}
	});
});


router.post('/delete_cart/:id', function(req, res){

	var deleteCart = {
		
		
		Fid:req.params.id,
		
		
	};

	userModel.deleteCart(deleteCart, function(status){
		if(status){

			userModel.getAllCart(function(results){
				if(results.length > 0){
					res.render('distributor/cart', {cartlist: results});
				}else{
					res.render('distributor/shop');
				}
		});
		}else{
			res.render('distributor/shop');
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

			userModel.getAllCart(function(results){
				if(results.length > 0){
					res.render('distributor/cart', {cartlist: results});
				}else{
					res.render('distributor/');
				}
		});
		}else{
			res.render('distributor/shop');
		}
	});
});

//food report ends

	router.get('/food_details/:id', function(req, res){
		userModel.getByIdFood(req.params.id, function(results){
			userModel.getKnowFood(results[0].Type,function(results1){
				res.render('distributor/food_details', {foodlist: results,foodlist1: results1,user: req.session.Cus_id});

			});
			
		});
	});
router.get('/fruit', function(req, res){
	
		userModel.getAllFruits(function(results){
			if(results.length > 0){
				res.render('distributor/fruit', {foodlist: results});
			}else{
				res.redirect('/distributor');
			}
		});
});

router.get('/crops', function(req, res){
	
		userModel.getAllCrops(function(results){
			if(results.length > 0){
				res.render('distributor/crops', {foodlist: results});
			}else{
				res.redirect('/distributor');
			}
		});
});

router.get('/vegetable', function(req, res){
	
		userModel.getAllVegetable(function(results){
			if(results.length > 0){
				res.render('distributor/vegetable', {foodlist: results});
			}else{
				res.redirect('/distributor');
			}
		});
});


	// distributor profile starts





	router.post('/changePass/:id', function(req, res){
		var pass={
				old: req.body.old_pass,
				new: req.body.new_pass,
				con: req.body.con_pass,
				id:req.params.id
		};	
		userModel.getBydid(req.params.id, function(results){
			if(results.password==req.body.old_pass){
				if( req.body.new_pass== req.body.con_pass){
					userModel.updatedPass(pass,function(status){
						res.redirect('/home');			
					});
				}
			}
			
		});
	});






// distributor profile ends




// distributor profile 
router.get('/profile/:id', function(req, res){
		userModel.getBydid(req.params.id, function(results){
			res.render('distributor/profile', {user: results});
		});
	});




//cart
router.post('/addcart/:id/:Dis_id/:Fprice', function(req, res){

	var cart = {
		
		quantity: req.body.Quantity,
		Fid:req.params.id,
		Dis_id:req.params.Dis_id,
		Fprice:req.params.Fprice
		
		
	};

	userModel.insertdCart(cart, function(status){
		if(status){
			userModel.getAlldCart(function(results){
				if(results.length > 0){
					
					res.render('distributor/cart', {cartlist: results,cartCount:results.length});
			
		}else{
			res.render('distributor/shop');
		}
	});
}
});
});


router.post('/delete_cart/:id', function(req, res){

	var deleteCart = {
		
		
		Fid:req.params.id,
		
		
	};

	userModel.deletedCart(deleteCart, function(status){
		if(status){

			userModel.getAlldCart(function(results){
				if(results.length > 0){
					res.render('distributor/cart', {cartlist: results,cartCount:results.length});
				}else{
					res.render('distributor/shop');
				}
		});
		}else{
			res.render('distributor/shop');
		}
	});
});


router.post('/update_cart/:id', function(req, res){

	var updateCart = {
		
		
		Fid:req.params.id,
		qty:req.body.qty
		
	};

	userModel.updatedCart(updateCart, function(status){
		if(status){

			userModel.getAlldCart(function(results){
				if(results.length > 0){
					res.render('distributor/cart', {cartlist: results,cartCount:results.length});
				}else{
					res.render('distributor/shop');
				}
		});
		}else{
			res.render('distributor/shop');
		}
	});
});


//checkout

router.get('/checkout', function(req, res){
	userModel.getBydid(req.session.Dis_id, function(result){
		console.log(result);
	userModel.getAlldCart(function(results){
		if(results.length > 0){
			
				res.render('distributor/checkout',{cartlist: results,user:result,cartCount:results.length});
			}
			
	

	});
});

});


router.post('/checkout', function(req, res){

	

	userModel.getAlldCart(function(results){

		for(var i=0; i<results.length;i++){
			var checkout = {
		
				Cmail: req.body.email,
				Cname:req.body.name,
				Cid:req.session.Dis_id,
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

		userModel.deleteCart(checkout,function(status){

			
		});

	});


	userModel.getAlldCart(function(results){
		res.render('distributor/shop',{cartCount:results.length})
		
		});
	
});



router.post('/changePic',upload.single("file"), function(req, res){
	
		var data = {
			
			Cid: req.session.Dis_id,
			pic: req.file.filename
		};
		
		userModel.updatedPic(data, function(status){
			if(status){

				res.redirect('/home');
			}else{
				res.redirect('/home');
			}
		});
});

router.post('/searchFruits', function(req, res){

	var fruit = {
		
		Fname: req.body.search

	};
	
	userModel.searchFruits(fruit, function(results){
		if(results.length > 0){
			res.render('distributor/fruit', {foodlist: results});
		}else{
			res.redirect('/distributor/fruit');
		}
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
			
			userModel.getAllCart(req.session.Dis_id,function(results){
				if(results.length >=0){
					
					res.render('distributor/shop', {cartlist: results,cartCount:results.length,name:req.session.name,Dis_id:req.session.Dis_id});
			
		}else{
			res.render('distributor/shop');
		}
	});
}
});
});

	















	module.exports = router;


