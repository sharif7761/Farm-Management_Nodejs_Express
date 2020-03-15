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

  	if(req.session.uname==null){
  		res.redirect('/home');
  	}else{

  		res.render('owner/index', {username: req.session.uname, userid: req.session.Uid});
  		
  	}
	
		

});

  router.get('/about', function(req, res){


  	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		res.render('owner/about',{username: req.session.uname, userid: req.session.Uid});
  	}
	
	
	
});

router.get('/shop', function(req, res){
	
	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		res.render('owner/shop',{username: req.session.uname, userid: req.session.Uid});
  	}


	
	
});

router.get('/foodreport', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAllFoods(function(results){
			if(results.length > 0){
				res.render('owner/foodreport', {foodlist: results,username: req.session.uname, userid: req.session.Uid});
			}else{
				res.redirect('/owner');
			}
		});
  	}
	
		
});




router.post('/addfood',upload.array('file', 3), function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
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

				res.redirect('/owner/foodreport');
			}else{
				res.redirect('/owner/foodreport');
			}
		});
  	}
	
		
});


router.post('/update_food', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
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
				res.redirect('/owner/foodreport');	


			}else{

				res.redirect('/owner/foodreport');
			}
		});
  	}
	
		
});




router.post('/delete_food', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var food = {
			fid: req.body.Fid
		};

		userModel.deleteFood(food, function(status){
			if(status){
				res.redirect('/owner/foodreport');
			}else{
				res.redirect('/owner/foodreport');
			}
		});

  	}
	
		});


router.post('/searchFood', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var food = {
		
		foodname: req.body.search

	};
	
	userModel.searchFoods(food, function(results){
		if(results.length > 0){
			res.render('owner/foodreport', {foodlist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner/foodreport');
		}
	});
  	}

	
});



//food report ends

//seed report starts

router.get('/seedreport', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAllseeds(function(results){
		if(results.length > 0){
			res.render('owner/seedreport', {seedlist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner');
		}
	});
  	}
	
	
});




router.post('/addseed', function(req, res){


	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var seed = {
		
		Sname: req.body.Sname,
		Quantity: req.body.Quantity,
		Type: req.body.Type,
		Rate: req.body.Rate
		
	};

	userModel.insertSeed(seed, function(status){
		if(status){

			res.redirect('/owner/seedreport');
		}else{
			res.redirect('/owner/seedreport');
		}
	});
  	}

	
});


router.post('/update_seed', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var seed = {
		Sid: req.body.Sid,
		Sname: req.body.Sname,
		quantity: req.body.Quantity,
		type: req.body.type,
		Rate: req.body.Rate
	};

	userModel.updateSeed(seed, function(status){
		if(status){
			res.redirect('/owner/seedreport');	


		}else{

			res.redirect('/owner/seedreport');
		}
	});
  	}

	
});


router.post('/delete_seed', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var seed = {
		Sid: req.body.Sid
	};

	userModel.deleteSeed(seed, function(status){
		if(status){
			res.redirect('/owner/seedreport');
		}else{
			res.redirect('/owner/seedreport');
		}
	});
  	}

	
});

///seed ends


//user report starts

router.get('/userreport', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAllusers(function(results){
		if(results.length > 0){
			res.render('owner/userreport', {userlist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner');
		}
	});
  	}
	
	
});




router.post('/adduser', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var user = {
		
		Uname: req.body.Uname,
		Phone: req.body.Phone,
		Email: req.body.Email,
		Address: req.body.Address,
		Position: req.body.Position,
		Password: req.body.Password

		
	};

	userModel.insertUser(user, function(status){
		if(status){

			res.redirect('/owner/userreport');
		}else{
			res.redirect('/owner/userreport');
		}
	});
  	}

	
});


router.post('/update_user', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var user = {
		Uid: req.body.Uid,
		Uname: req.body.Uname,
		Phone: req.body.Phone,
		Email: req.body.Email,
		Address: req.body.Address,
		Position: req.body.Position

	};

	userModel.updateUser(user, function(status){
		if(status){
			res.redirect('/owner/userreport');	


		}else{

			res.redirect('/owner/userreport');
		}
	});
  	}

	
});


router.post('/delete_user', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var user = {
		Uid: req.body.Uid
	};

	userModel.deleteUser(user, function(status){
		if(status){
			res.redirect('/owner/userreport');
		}else{
			res.redirect('/owner/userreport');
		}
	});
  	}

	
});

router.post('/searchUser', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var user = {
		
		Uname: req.body.search

	};

userModel.searchUsers(user, function(results){
	if(results.length > 0){
		res.render('owner/userreport', {userlist: results,username: req.session.uname, userid: req.session.Uid});
	}else{
		res.redirect('/owner/userreport');
	}
});
  	}

	
});

///user ends

//employee report starts

router.get('/employeereport', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAllemployees(function(results){
		if(results.length > 0){
			res.render('owner/employeereport', {employeelist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner');
		}
	});
  	}
	
	
});




router.post('/addemployee', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var employee = {
		
		Ename: req.body.Ename,
		Phone: req.body.Phone,
		Salary: req.body.Salary,
		Address: req.body.Address,
		Position: req.body.Position

		
	};

	userModel.insertEmployee(employee, function(status){
		if(status){

			res.redirect('/owner/employeereport');
		}else{
			res.redirect('/owner/employeereport');
		}
	});
  	}

	
});


router.post('/update_employee', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var employee = {
		Eid: req.body.Eid,
		Ename: req.body.Ename,
		Phone: req.body.Phone,
		Salary: req.body.Salary,
		Address: req.body.Address,
		Position: req.body.Position
	};

	userModel.updateEmployee(employee, function(status){
		if(status){
			res.redirect('/owner/employeereport');	


		}else{

			res.redirect('/owner/employeereport');
		}
	});
  	}

	
});


router.post('/delete_employee', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var employee = {
		Eid: req.body.Eid
	};

	userModel.deleteEmployee(employee, function(status){
		if(status){
			res.redirect('/owner/employeereport');
		}else{
			res.redirect('/owner/employeereport');
		}
	});
  	}

	
});

router.post('/searchEmployee', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var employee = {
		
		Ename: req.body.search

	};

userModel.searchEmployee(employee, function(results){
	if(results.length > 0){
		res.render('owner/employeereport', {employeelist: results,username: req.session.uname, userid: req.session.Uid});
	}else{
		res.redirect('/owner/employeereport');
	}
});
  	}

	
});

///employee ends

//Customer report starts

router.get('/customerreport', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAllcustomers(function(results){
		if(results.length > 0){
			res.render('owner/customerreport', {customerlist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner');
		}
	});
  	}
	
	
});



router.post('/delete_customer', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var customer = {
		Cus_id: req.body.Cus_id
	};

	userModel.deleteCustomer(customer, function(status){
		if(status){
			res.redirect('/owner/customerreport');
		}else{
			res.redirect('/owner/customerreport');
		}
	});
  	}

	
});

router.post('/searchcustomer', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var customer = {
		
		name: req.body.search

	};

userModel.searchCustomer(customer, function(results){
	if(results.length > 0){
		res.render('owner/customerreport', {customerlist: results,username: req.session.uname, userid: req.session.Uid});
	}else{
		res.redirect('/owner/customerreport');
	}
});
  	}

	
});

///Customer ends

//Distributor starts


router.get('/distributorreport', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAlldistributors(function(results){
		if(results.length > 0){
			res.render('owner/distributorreport', {distributorlist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner');
		}
	});
  	}
	
	
});




router.post('/adddistributor', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var distributor = {
		
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		address: req.body.address,
		pic: req.body.pic

		
	};

	userModel.insertDistributor(distributor, function(status){
		if(status){

			res.redirect('/owner/distributorreport');
		}else{
			res.redirect('/owner/distributorreport');
		}
	});
  	}

	
});


router.post('/update_distributor', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var distributor = {
		Dis_id: req.body.Dis_id,
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		address: req.body.address
	};

	userModel.updateDistributor(distributor, function(status){
		if(status){
			res.redirect('/owner/distributorreport');	


		}else{

			res.redirect('/owner/distributorreport');
		}
	});
  	}

	
});


router.post('/delete_distributor', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var distributor = {
		Dis_id: req.body.Dis_id
	};

	userModel.deleteDistributor(distributor, function(status){
		if(status){
			res.redirect('/owner/distributorreport');
		}else{
			res.redirect('/owner/distributorreport');
		}
	});
  	}

	
});

router.post('/searchDistributor', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var distributor = {
		
		name: req.body.search

	};

userModel.searchDistributor(distributor, function(results){
	if(results.length > 0){
		res.render('owner/distributorreport', {distributorlist: results,username: req.session.uname, userid: req.session.Uid});
	}else{
		res.redirect('/owner/distributorreport');
	}
});
  	}

	
});

///distributor ends



//Order report starts

router.get('/orderreport', function(req, res){


	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAllorders(function(results){
		if(results.length > 0){
			res.render('owner/orderreport', {orderlist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner');
		}
	});
  	}
	
	
});


router.post('/update_order', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var order = {
		Price: req.body.Total_price,
		Fname: req.body.food_name,
		Fid: req.body.Fid,
		quantity: req.body.quantity,
		Status: req.body.Status,
		Order_id: req.body.Order_id
		
	};

	userModel.updateOrder(order, function(status){
		if(status){
			res.redirect('/owner/orderreport');	


		}else{

			res.redirect('/owner/orderreport');
		}
	});
  	}

	
});

router.post('/searchorder', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var order = {
		
		Fname: req.body.search

	};

userModel.searchOrder(order, function(results){
	if(results.length > 0){
		res.render('owner/orderreport', {orderlist: results,username: req.session.uname, userid: req.session.Uid});
	}else{
		res.redirect('/owner/orderreport');
	}
});
  	}

	
});

///Order ends


//appointment report starts

router.get('/appointmentreport', function(req, res){
	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAllappointments(function(results){
		if(results.length > 0){
			res.render('owner/appointmentreport', {appointmentlist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner');
		}
	});
  	}
	
	
});


router.post('/update_appointment', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var appointment = {
		Status: req.body.Status,
		id:req.body.id
		
	};

	userModel.updateAppointment(appointment, function(status){
		if(status){
			res.redirect('/owner/appointmentreport');	


		}else{

			res.redirect('/owner/appointmentreport');
		}
	});
  	}

	
});

router.post('/searchappointment', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var appointment = {
		
		name: req.body.search

	};


	userModel.searchAppointment(appointment, function(results){
	if(results.length > 0){
		res.render('owner/appointmentreport', {appointmentlist: results,username: req.session.uname, userid: req.session.Uid});
	}else{
		res.redirect('/owner/appointmentreport');
	}
});
  	}

	
});

router.post('/addappointment', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var appointment = {
		
		name: req.body.name,
		date:req.body.date
		
		
	};

	userModel.insertAppointment(appointment, function(status){
		if(status){

			res.redirect('/owner/appointmentreport');
		}else{
			res.redirect('/owner/appointmentreport');
		}
	});
  	}

	
});


///appointment ends

//


//fertilizer report starts

router.post('/searchFertilizer', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var fertilizer = {
		
		frname: req.body.search

	};
	
	userModel.searchFertilizers(fertilizer, function(results){
		if(results.length > 0){
			res.render('owner/fertilizerreport', {fertilizerlist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner/fertilizerreport');
		}
	});
  	}

	
});


router.get('/fertilizerreport', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAllfertilizers(function(results){
		if(results.length > 0){
			res.render('owner/fertilizerreport', {fertilizerlist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner');
		}
	});
  	}
	
	
});




router.post('/addfertilizer', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var fertilizer = {
		
		frname: req.body.Frname,
		quantity: req.body.Quantity,
		rate: req.body.Rate
		
	};

	userModel.insertFertilizer(fertilizer, function(status){
		if(status){

			res.redirect('/owner/fertilizerreport');
		}else{
			res.redirect('/owner/fertilizerreport');
		}
	});
  	}

	
});


router.post('/update_fertilizer', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var fertilizer = {
		frid: req.body.Frid,
		frname: req.body.Frname,
		quantity: req.body.Quantity,
		rate: req.body.Rate
	};

	userModel.updateFertilizer(fertilizer, function(status){
		if(status){
			res.redirect('/owner/fertilizerreport');	


		}else{

			res.redirect('/owner/fertilizerreport');
		}
	});
  	}

	
});


router.post('/delete_fertilizer', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var fertilizer = {
		frid: req.body.Frid
	};

	userModel.deleteFertilizer(fertilizer, function(status){
		if(status){
			res.redirect('/owner/fertilizerreport');
		}else{
			res.redirect('/owner/fertilizerreport');
		}
	});
  	}

	
});


///fertilizer ends

/////pesticide start


router.post('/searchPesticide', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var pesticide = {
		
		pname: req.body.search

	};
	
	userModel.searchPesticides(pesticide, function(results){
		if(results.length > 0){
			res.render('owner/pesticidereport', {pesticidelist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner/pesticidereport');
		}
	});
  	}

	
});


router.get('/pesticidereport', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAllpesticides(function(results){
		if(results.length > 0){
			res.render('owner/pesticidereport', {pesticidelist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner');
		}
	});
  	}
	
	
});




router.post('/addpesticide', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var pesticide = {
		
		pname: req.body.Pname,
		quantity: req.body.Quantity,
		type: req.body.Type,
		rate: req.body.Rate
		
	};

	userModel.insertPesticide(pesticide, function(status){
		if(status){

			res.redirect('/owner/pesticidereport');
		}else{
			res.redirect('/owner/pesticidereport');
		}
	});
  	}

	
});


router.post('/update_pesticide', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var pesticide = {
		pid: req.body.Pid,
		pname: req.body.Pname,
		quantity: req.body.Quantity,
		type: req.body.Type,
		rate: req.body.Rate
	};

	userModel.updatePesticide(pesticide, function(status){
		if(status){
			res.redirect('/owner/pesticidereport');	


		}else{

			res.redirect('/owner/pesticidereport');
		}
	});
  	}

	
});


router.post('/delete_pesticide', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var pesticide = {
		pid: req.body.Pid
	};

	userModel.deletePesticide(pesticide, function(status){
		if(status){
			res.redirect('/owner/pesticidereport');
		}else{
			res.redirect('/owner/pesticidereport');
		}
	});
  	}

	
});



/////pesticide ends



/////treatment start


router.post('/searchTreatment', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var treatment = {
		
		symptom: req.body.search

	};
	
	userModel.searchTreatments(treatment, function(results){
		if(results.length > 0){
			res.render('owner/treatmentreport', {treatmentlist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner/treatmentreport');
		}
	});
  	}

	
});


router.get('/treatmentreport', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAlltreatments(function(results){
		if(results.length > 0){
			res.render('owner/treatmentreport', {treatmentlist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner');
		}
	});
  	}
	
	
});




router.post('/addtreatment', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var treatment = {
		
		tname: req.body.Tname,
		symptom: req.body.Symptom,
		pname: req.body.Pname,
		frname: req.body.Frname
		
	};

	userModel.insertTreatment(treatment, function(status){
		if(status){

			res.redirect('/owner/treatmentreport');
		}else{
			res.redirect('/owner/treatmentreport');
		}
	});
  	}

	
});


router.post('/update_treatment', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var treatment = {
		tid: req.body.Tid,
		tname: req.body.Tname,
		symptom: req.body.Symptom,
		pname: req.body.Pname,
		frname: req.body.Frname
	};

	userModel.updateTreatment(treatment, function(status){
		if(status){
			res.redirect('/owner/treatmentreport');	


		}else{

			res.redirect('/owner/pesticidereport');
		}
	});
  	}

	
});


router.post('/delete_treatment', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var treatment = {
		tid: req.body.Tid
	};

	userModel.deleteTreatment(treatment, function(status){
		if(status){
			res.redirect('/owner/treatmentreport');
		}else{
			res.redirect('/owner/treatmentreport');
		}
	});
  	}

	
});



/////treatment ends


////warehouse report starts

router.post('/searchWarehouse', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var warehouse = {
		
		fname: req.body.search

	};
	
	userModel.searchWarehouses(warehouse, function(results){
		if(results.length > 0){
			res.render('owner/warehousereport', {warehouselist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner/warehousereport');
		}
	});
  	}

	
});


router.get('/warehousereport', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAllwarehouses(function(results){
		if(results.length > 0){
			res.render('owner/warehousereport', {warehouselist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner');
		}
	});
  	}
	
	
});




router.post('/addwarehouse', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var warehouse = {
		
		wname: req.body.Wname,
		quantity: req.body.Quantity,
		fname: req.body.FoodName
		
	};

	userModel.insertWarehouse(warehouse, function(status){
		if(status){

			res.redirect('/owner/warehousereport');
		}else{
			res.redirect('/owner/warehousereport');
		}
	});
  	}

	
});


router.post('/update_warehouse', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var warehouse = {
		wid: req.body.Wid,
		wname: req.body.Wname,
		quantity: req.body.Quantity,
		fname: req.body.FoodName
	};

	userModel.updateWarehouse(warehouse, function(status){
		if(status){
			res.redirect('/owner/warehousereport');	


		}else{

			res.redirect('/owner/warehousereport');
		}
	});
  	}

	
});


router.post('/delete_warehouse', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var warehouse = {
		wid: req.body.Wid
	};

	userModel.deleteWarehouse(warehouse, function(status){
		if(status){
			res.redirect('/owner/warehousereport');
		}else{
			res.redirect('/owner/warehousereport');
		}
	});
  	}

	
});


///warehouse ends


/////transaction start


router.post('/searchTransaction', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var transaction = {
		
		trname: req.body.search

	};
	
	userModel.searchTransactions(transaction, function(results){
		if(results.length > 0){
			res.render('owner/transactionreport', {transactionlist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner/transactionreport');
		}
	});
  	}

	
});


router.get('/transactionreport', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAlltransactions(function(results){
		if(results.length > 0){
			res.render('owner/transactionreport', {transactionlist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner');
		}
	});
  	}
	
	
});

router.post('/transactionreport', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAlltransactions(function(results){
		if(results.length > 0){
			res.render('owner/transactionreport', {transactionlist: results,username: req.session.uname, userid: req.session.Uid});
		}else{
			res.redirect('/owner');
		}
	});
  	}
	
	
});



router.post('/addtransaction', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var transaction = {
		
		trname: req.body.Trname,
		description: req.body.Description,
		type: req.body.Type,
		price: req.body.Price
		
	};

	userModel.insertTransaction(transaction, function(status){
		if(status){

			res.redirect('/owner/transactionreport');
		}else{
			res.redirect('/owner/transactionreport');
		}
	});
  	}

	
});


router.post('/update_transaction', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var transaction = {
		trid: req.body.Trid,
		trname: req.body.Trname,
		description: req.body.Description,
		type: req.body.Type,
		price: req.body.Price
	};

	userModel.updateTransaction(transaction, function(status){
		if(status){
			res.redirect('/owner/transactionreport');	


		}else{

			res.redirect('/owner/transactionreport');
		}
	});
  	}

	
});


router.post('/delete_transaction', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var transaction = {
		trid: req.body.Trid
	};

	userModel.deleteTransaction(transaction, function(status){
		if(status){
			res.redirect('/owner/transactionreport');
		}else{
			res.redirect('/owner/transactionreport');
		}
	});
  	}

	
});



//transaction ends


// owner profile starts




	router.get('/profile/:id', function(req, res){

		if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getById(req.params.id, function(results){
			res.render('owner/profile', {user: results,username: req.session.uname, userid: req.session.Uid});
		});
  	}

		
	});



	router.post('/changePass/:id', function(req, res){


		if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		var pass={
				old: req.body.old_pass,
				new: req.body.new_pass,
				con: req.body.con_pass,
				id:req.params.id
		};	
		
			
				if( req.body.new_pass== req.body.con_pass){
					userModel.updatePass(pass,function(status){
						res.redirect('/home');			
					});
				}
  	}
		
			
			
		
	});




// owner profile ends



	
	
	router.get('/food_details/:id', function(req, res){


		if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getByIdFood(req.params.id, function(results){
			userModel.getKnowFood(results[0].Type,function(results1){
				userModel.getAllReview(req.params.id,function(results5){
				res.render('owner/food_details', {review5:results5 ,foodlist: results,foodlist1: results1,username: req.session.uname, userid: req.session.Uid});

			});
			});
			
		});
  	}
		
	});
router.get('/Fruit', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAllFruits(function(results){
			if(results.length > 0){
				res.render('owner/fruit', {foodlist: results,username: req.session.uname, userid: req.session.Uid});
			}else{
				res.redirect('/owner');
			}
		});
  	}
	
		
});

router.get('/Crops', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAllCrops(function(results){
			if(results.length > 0){
				res.render('owner/crops', {foodlist: results,username: req.session.uname, userid: req.session.Uid});
			}else{
				res.redirect('/owner');
			}
		});
  	}
	
		
});

router.get('/Vegetable', function(req, res){

	if(req.session.uname==null){
		res.redirect('/home');
  	}else{
  		userModel.getAllVegetable(function(results){
			if(results.length > 0){
				res.render('owner/vegetable', {foodlist: results,username: req.session.uname, userid: req.session.Uid});
			}else{
				res.redirect('/owner');
			}
		});
  	}
	
		
});



////abid/////


router.get('/transactiongraph', function(req, res){
	
		
				res.render('owner/transactiongraph',{username: req.session.uname, userid: req.session.Uid,x: 2016});
			console.log('graph');
			
		});



module.exports = router;