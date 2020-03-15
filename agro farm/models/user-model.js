var db = require('./db');
var alert = require('alert-node');

module.exports= {
	getById : function(id, callback){
		var sql = "select * from user where Uid=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getByIdBook : function(id, callback){
		var sql = "select * from book where id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from user";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllFoods : function(callback){
		var sql = "select * from food";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	


	getAllAdmins : function(callback){
		var sql = "select * from user where type='Admin'";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	validate: function(user, callback){
		var sql ="SELECT * FROM user where Email=?";
		db.getResults(sql, [user.Email], function(results){

			if(results.length > 0){
				const bcrypt = require('bcrypt');
		const saltRounds = 10;
				bcrypt.compare(user.Password, results[0].Password, function (err, result) {
        if (result == true) {
            callback(results);
        } 
      });
				
			}else{
				var sql ="SELECT * FROM customer where email=?";
		db.getResults(sql, [user.Email], function(results){

			if(results.length > 0){
				const bcrypt = require('bcrypt');
		const saltRounds = 10;
				bcrypt.compare(user.Password, results[0].password, function (err, result) {
        if (result == true) {
            callback(results);
        } 
      });

				
			}else{
				var sql ="SELECT * FROM distributor where email=?";
		db.getResults(sql, [user.Email], function(results){

			if(results.length > 0){
				const bcrypt = require('bcrypt');
		const saltRounds = 10;
				bcrypt.compare(user.Password, results[0].password, function (err, result) {
        if (result == true) {
            callback(results);
        } 
      });
			}else{
				
			}
		});
				
			}
		});
				
			}
		});
	},
	getByUname: function(username, callback){
		var sql = "select * from user where Uname=?";
		db.getResults(sql, [username], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},

	getByCid:function(id, callback){
		var sql = "select * from customer where Cus_id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},

	insert: function(user, callback){
		var sql = "insert into user values(?,?,?,?)";
		db.execute(sql, [null, user.username, user.password, user.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	insertFood: function(food, callback){
		var sql = "INSERT INTO `food`(`Fname`, `Quantity`, `Type`, `PRate`, `SRate`, `Description`, `Fimage`, `Fimage1`, `Fimage2`) VALUES (?,?,?,?,?,?,?,?,?)";
		db.execute(sql, [food.foodname, food.quantity, food.type, food.PRate, food.SRate, food.description, food.fimage, food.fimage1, food.fimage2], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

		var sql1 = "INSERT INTO `transaction`(`TRname`, `TRType`, `Price`, `Description`, `Date`) VALUES (CONCAT(?,' Production'),'debit',?*?,'Production Expense',CURDATE())";

		db.execute(sql1, [food.foodname, food.quantity, food.PRate], function(status){});

		var sql2 = "UPDATE `warehouse` SET `Quantity`=Quantity+ ? WHERE `FoodName`= ?";
		db.execute(sql2, [food.quantity, food.foodname], function(status){});

	},
	updateFood: function(food, callback){
		
		var sql1 = "select * from food where Fid=?";

		db.getResults(sql1, [food.fid], function(results){
			if(results[0].Quantity < food.quantity){
				
				var pr=(food.quantity-results[0].Quantity)*food.PRate;
				var sql2= "INSERT INTO `transaction`(`TRname`, `TRType`, `Price`, `Description`, `Date`) VALUES (CONCAT(?,' Production'),'debit',?,'Production Adjusting',CURDATE())";
			
				db.execute(sql2, [food.foodname, pr], function(status){});

				var sql3="UPDATE `warehouse` SET `Quantity`=Quantity+(?-?) WHERE `FoodName`=?";
				db.execute(sql3, [food.quantity, results[0].Quantity, food.foodname], function(status){});

			}

			else if(results[0].Quantity > food.quantity){
				
				var pr=(results[0].Quantity-food.quantity)*food.PRate;
				var sql2= "INSERT INTO `transaction`(`TRname`, `TRType`, `Price`, `Description`, `Date`) VALUES (CONCAT(?,' Production'),'credit',?,'Production Adjusting',CURDATE())";
			
				db.execute(sql2, [food.foodname, pr], function(status){});

				var sql3="UPDATE `warehouse` SET `Quantity`=Quantity-(?-?) WHERE `FoodName`=?";
				db.execute(sql3, [results[0].Quantity, food.quantity, food.foodname], function(status){});
			}
		});

		var sql = "UPDATE `food` SET `Fname`=?,`Quantity`=?,`Type`=?,`PRate`=?,`SRate`=?,`Description`=? WHERE Fid=?";
		db.execute(sql, [food.foodname, food.quantity, food.type, food.PRate, food.SRate, food.description, food.fid], function(status){
			if(status){

				callback(true);
			}else{
				callback(false);
			}
		});

	},
	deleteFood: function(food, callback){
		var sql = "delete from food where Fid=?";
		db.execute(sql, [food.fid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	deleteBook: function(book, callback){
		var sql = "delete from book where id=?";
		db.execute(sql, [book.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},


	
	searchFoods: function(food, callback){
		var sql ="SELECT * from `food` WHERE `Fname` LIKE ?";

		db.getResults(sql,[food.foodname+'%'], function(results){

			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	//seed queries

	getAllseeds : function(callback){
		var sql = "select * from seed";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	insertSeed: function(seed, callback){
		var sql = "INSERT INTO `seed`(`Sname`, `Type`, `Rate`,`Quantity` ) VALUES (?,?,?,?)";
		db.execute(sql, [seed.Sname, seed.Type, seed.Rate, seed.Quantity], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateSeed: function(seed, callback){
		var sql = "UPDATE `seed` SET `Sname`=?,`Type`=?,`Rate`=?,`Quantity`=? WHERE Sid=?";
		db.execute(sql, [seed.Sname, seed.type, seed.Rate, seed.quantity, seed.Sid], function(status){
			if(status){

				callback(true);
			}else{
				callback(false);
			}
		});
	},
	deleteSeed: function(seed, callback){
		var sql = "delete from seed where Sid=?";
		db.execute(sql, [seed.Sid], function(status){
			if(status){
				callback(true);
				
			}else{
				callback(false);
			}
		});
	},

	//seed ends	

	//user queries

	getAllusers : function(callback){
		var sql = "select * from user";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	insertUser: function(user, callback){
		const bcrypt = require('bcrypt');
		const saltRounds = 10;
		bcrypt.hash(user.Password, saltRounds, function(err, hash) {
		var sql = "INSERT INTO `user`(`Uname`, `Phone`, `Email`,`Address`,`Position`,`Password` ) VALUES (?,?,?,?,?,?)";
		db.execute(sql, [user.Uname, user.Phone, user.Email, user.Address,user.Position,hash], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

		});
	},
	updateUser: function(user, callback){
		var sql = "UPDATE `user` SET `Uname`=?,`Phone`=?,`Email`=?,`Address`=?,`Position`=? WHERE Uid=?";
		db.execute(sql, [user.Uname, user.Phone, user.Email, user.Address,user.Position ,user.Uid], function(status){
			if(status){

				callback(true);
			}else{
				callback(false);
			}
		});
	},
	deleteUser: function(user, callback){
		var sql = "delete from user where Uid=?";
		db.execute(sql, [user.Uid], function(status){
			if(status){
				callback(true);
				
			}else{
				callback(false);
			}
		});
	},

	searchUsers: function(user, callback){
		var sql ="SELECT * from `user` WHERE `Uname` LIKE ?";

		db.getResults(sql,[user.Uname+'%'], function(results){

			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	//user ends	

		//employee queries

		getAllemployees : function(callback){
			var sql = "select * from employee";
			db.getResults(sql, null, function(results){
				if(results.length > 0){
					callback(results);
				}else{
					callback([]);
				}
			});
		},
	
		insertEmployee: function(employee, callback){
			var sql = "INSERT INTO `employee`(`FullName`, `Address`, `Phone`,`Position`,`Salary` ) VALUES (?,?,?,?,?)";
			db.execute(sql, [employee.Ename, employee.Address, employee.Phone, employee.Position,employee.Salary], function(status){
				if(status){
					callback(true);
				}else{
					callback(false);
				}
			});
		},
		updateEmployee: function(employee, callback){
			var sql = "UPDATE `employee` SET `FullName`=?,`Address`=?,`Phone`=?,`Position`=?,`Salary`=? WHERE Eid=?";
			db.execute(sql, [employee.Ename, employee.Address, employee.Phone, employee.Position,employee.Salary ,employee.Eid], function(status){
				if(status){
	
					callback(true);
				}else{
					callback(false);
				}
			});
		},
		deleteEmployee: function(employee, callback){
			var sql = "delete from employee where Eid=?";
			db.execute(sql, [employee.Eid], function(status){
				if(status){
					callback(true);
					
				}else{
					callback(false);
				}
			});
		},
	
		searchEmployee: function(employee, callback){
			var sql ="SELECT * from `employee` WHERE `FullName` LIKE ?";
	
			db.getResults(sql,[employee.Ename+'%'], function(results){
	
				if(results.length > 0){
					callback(results);
				}else{
					callback([]);
				}
			});
		},
	
	
	
		//employee ends	
	
				//Customer queries

				getAllcustomers : function(callback){
					var sql = "select * from customer";
					db.getResults(sql, null, function(results){
						if(results.length > 0){
							callback(results);
						}else{
							callback([]);
						}
					});
				},
				deleteCustomer: function(customer, callback){
					var sql = "delete from customer where Cus_id=?";
					db.execute(sql, [customer.Cus_id], function(status){
						if(status){
							callback(true);
							
						}else{
							callback(false);
						}
					});
				},
			
				searchEmployee: function(customer, callback){
					var sql ="SELECT * from `customer` WHERE `name` LIKE ?";
			
					db.getResults(sql,[customer.name+'%'], function(results){
			
						if(results.length > 0){
							callback(results);
						}else{
							callback([]);
						}
					});
				},
			
			
			
				//customer  ends
				
				
							//distributor queries

							getAlldistributors : function(callback){
								var sql = "select * from distributor";
								db.getResults(sql, null, function(results){
									if(results.length > 0){
										callback(results);
									}else{
										callback([]);
									}
								});
							},
						
							insertDistributor: function(distributor, callback){
								var sql = "INSERT INTO `distributor`(`name`, `email`, `phone`,`address`,`pic`) VALUES (?,?,?,?,?)";
								db.execute(sql, [distributor.name, distributor.email, distributor.phone, distributor.address,'user22.png'], function(status){
									if(status){
										callback(true);
									}else{
										callback(false);
									}
								});
							},
							updateDistributor: function(distributor, callback){
								var sql = "UPDATE `distributor` SET `name`=?,`email`=?,`phone`=?,`address`=? WHERE Dis_id=?";
								db.execute(sql, [distributor.name, distributor.email, distributor.phone, distributor.address,distributor.Dis_id], function(status){
									if(status){
						
										callback(true);
									}else{
										callback(false);
									}
								});
							},
							deleteDistributor: function(distributor, callback){
								var sql = "delete from distributor where Dis_id=?";
								db.execute(sql, [distributor.Dis_id], function(status){
									if(status){
										callback(true);
										
									}else{
										callback(false);
									}
								});
							},
						
							searchDistributor: function(distributor, callback){
								var sql ="SELECT * from `distributor` WHERE `name` LIKE ?";
						
								db.getResults(sql,[distributor.name+'%'], function(results){
						
									if(results.length > 0){
										callback(results);
									}else{
										callback([]);
									}
								});
							},
						
						
						
							//employee ends	
						
							
						
				//order queries

				getAllorders : function(callback){
					var sql = "select * from orders order by Status";
					db.getResults(sql, null, function(results){
						if(results.length > 0){
							callback(results);
						}else{
							callback([]);
						}
					});
				},
							
				searchOrder: function(order, callback){
					var sql ="SELECT * from `orders` WHERE `Fname` LIKE ?";
			
					db.getResults(sql,[order.Fname+'%'], function(results){
			
						if(results.length > 0){
							callback(results);
						}else{
							callback([]);
						}
					});
				},
			
				updateOrder: function(order, callback){

					var sql3= "select * from food where Fid=?";
					db.getResults(sql3,[order.Fid], function(results){
			
						if(results[0].Quantity >= order.quantity){
							var sql4 = "UPDATE `warehouse` SET `Quantity`=(Quantity-?) WHERE `FoodName`=?";
							db.execute(sql4, [order.quantity,order.Fname], function(status){});
							var sql2 ="UPDATE `food` SET `Quantity`=(Quantity-?) WHERE `Fid`=?";
					db.execute(sql2, [order.quantity,order.Fid], function(status){});
					var sql1="INSERT INTO `transaction`(`TRname`, `TRType`, `Price`, `Description`, `Date`) VALUES (CONCAT(?,' Sold'),'credit',?,'Order Approved',CURDATE())";
					db.execute(sql1, [order.Fname,order.Price], function(status){});
					var sql = "UPDATE `orders` SET `Status`=? WHERE Order_id=?";
					db.execute(sql, [order.Status,order.Order_id], function(status){
						if(status){
			
							callback(true);
						}else{
							callback(false);
						}
					});
						}else{
							alert(order.quantity+" kg not available in Warehouse!!");
							callback([]);
						}
					});

					
				},
			
				//order  ends	

		
				//appointment queries

				getAllappointments : function(callback){
					var sql = "select * from appointment";
					db.getResults(sql, null, function(results){
						if(results.length > 0){
							callback(results);
						}else{
							callback([]);
						}
					});
				},
							
				searchAppointment: function(appointment, callback){
					var sql ="SELECT * from `appointment` WHERE `name` LIKE ?";
			
					db.getResults(sql,[appointment.name+'%'], function(results){
			
						if(results.length > 0){
							callback(results);
						}else{
							callback([]);
						}
					});
				},
			
				updateAppointment: function(appointment, callback){
					var sql = "UPDATE `appointment` SET `status`=? WHERE id=?";
					db.execute(sql, [appointment.Status,appointment.id], function(status){
						if(status){
			
							callback(true);
						}else{
							callback(false);
						}
					});
				},

				insertAppointment: function(appointment, callback){
					var sql = "INSERT INTO `appointment`(`name`, `date`, `status`) VALUES (?,?,?)";
					db.execute(sql, [appointment.name, appointment.date,'Pending'], function(status){
						if(status){
							callback(true);
						}else{
							callback(false);
						}
					});
				},
				
			
				//appointment  ends	


				///fertilizer start


	searchFertilizers: function(fertilizer, callback){
		var sql ="SELECT * from `fertilizer` WHERE `FrName` LIKE ?";

		db.getResults(sql,[fertilizer.frname+'%'], function(results){

			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	getAllfertilizers : function(callback){
		var sql = "select * from fertilizer";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	insertFertilizer: function(fertilizer, callback){
		var sql = "INSERT INTO `fertilizer`(`FrName`, `Rate`,`Quantity` ) VALUES (?,?,?)";
		db.execute(sql, [fertilizer.frname, fertilizer.rate, fertilizer.quantity], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

		var sql1 = "INSERT INTO `transaction`(`TRname`, `TRType`, `Price`, `Description`, `Date`) VALUES (CONCAT(?,' Expense'),'debit',?*?,'Fertilizer Expense',CURDATE())";

		db.execute(sql1, [fertilizer.frname, fertilizer.rate, fertilizer.quantity], function(status){});
	},
	updateFertilizer: function(fertilizer, callback){

		var sql1 = "select * from fertilizer where Frid=?";
		db.getResults(sql1,[fertilizer.frid], function(results){

			if(results.length > 0){
				
				var pr=(fertilizer.quantity- results[0].Quantity)*fertilizer.rate;

				var sql2 = "INSERT INTO `transaction`(`TRname`, `TRType`, `Price`, `Description`, `Date`) VALUES (CONCAT(?,' Expense'),'debit',?,'Fertilizer Expense',CURDATE())";

				db.execute(sql2, [fertilizer.frname, pr], function(status){});


			}else{
				callback([]);
			}
		});


		var sql = "UPDATE `fertilizer` SET `FrName`=?,`Rate`=?,`Quantity`=? WHERE Frid=?";
		db.execute(sql, [fertilizer.frname, fertilizer.rate, fertilizer.quantity, fertilizer.frid], function(status){
			if(status){

				callback(true);
			}else{
				callback(false);
			}
		});
	},
	deleteFertilizer: function(fertilizer, callback){
		var sql = "delete from fertilizer where Frid=?";
		db.execute(sql, [fertilizer.frid], function(status){
			if(status){
				callback(true);
				
			}else{
				callback(false);
			}
		});
	},


///fertilizer ends


//pesticide queries

	searchPesticides: function(pesticide, callback){
		var sql ="SELECT * from `pesticide` WHERE `Pname` LIKE ?";

		db.getResults(sql,[pesticide.pname+'%'], function(results){

			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	getAllpesticides : function(callback){
		var sql = "select * from pesticide";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	insertPesticide: function(pesticide, callback){
		var sql = "INSERT INTO `pesticide`(`Pname`, `Ptype`, `Rate`,`Quantity` ) VALUES (?,?,?,?)";
		db.execute(sql, [pesticide.pname, pesticide.type, pesticide.rate, pesticide.quantity], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updatePesticide: function(pesticide, callback){
		var sql = "UPDATE `pesticide` SET `Pname`=?,`Ptype`=?,`Rate`=?,`Quantity`=? WHERE Pid=?";
		db.execute(sql, [pesticide.pname, pesticide.type, pesticide.rate, pesticide.quantity, pesticide.pid], function(status){
			if(status){

				callback(true);
			}else{
				callback(false);
			}
		});
	},
	deletePesticide: function(pesticide, callback){
		var sql = "delete from pesticide where Pid=?";
		db.execute(sql, [pesticide.pid], function(status){
			if(status){
				callback(true);
				
			}else{
				callback(false);
			}
		});
	},

	//pesticide ends	


//treatment queries

	searchTreatments: function(treatment, callback){
		var sql ="SELECT * from `treatment` WHERE `Symptom` LIKE ?";

		db.getResults(sql,[treatment.symptom+'%'], function(results){

			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	getAlltreatments : function(callback){
		var sql = "select * from treatment";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	insertTreatment: function(treatment, callback){
		var sql = "INSERT INTO `treatment`(`Tname`, `Symptom`, `Pname`,`Frname` ) VALUES (?,?,?,?)";
		db.execute(sql, [treatment.tname, treatment.symptom, treatment.pname, treatment.frname], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateTreatment: function(treatment, callback){
		var sql = "UPDATE `treatment` SET `Tname`=?,`Symptom`=?,`Pname`=?,`Frname`=? WHERE Tid=?";
		db.execute(sql, [treatment.tname, treatment.symptom, treatment.pname, treatment.frname, treatment.tid], function(status){
			if(status){

				callback(true);
			}else{
				callback(false);
			}
		});
	},
	deleteTreatment: function(treatment, callback){
		var sql = "delete from treatment where Tid=?";
		db.execute(sql, [treatment.tid], function(status){
			if(status){
				callback(true);
				
			}else{
				callback(false);
			}
		});
	},

	//treatment ends	


	///warehouse start


	searchWarehouses: function(warehouse, callback){
		var sql ="SELECT * from `warehouse` WHERE `FoodName` LIKE ?";

		db.getResults(sql,[warehouse.fname+'%'], function(results){

			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	getAllwarehouses : function(callback){
		var sql = "select * from warehouse";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	insertWarehouse: function(warehouse, callback){
		var sql = "INSERT INTO `warehouse`(`Wname`, `FoodName`, `Quantity` ) VALUES (?,?,?)";
		db.execute(sql, [warehouse.wname, warehouse.fname, warehouse.quantity], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateWarehouse: function(warehouse, callback){
		var sql = "UPDATE `warehouse` SET `Wname`=?,`FoodName`=?,`Quantity`=? WHERE Wid=?";
		db.execute(sql, [warehouse.wname, warehouse.fname, warehouse.quantity, warehouse.wid], function(status){
			if(status){

				callback(true);
			}else{
				callback(false);
			}
		});
	},
	deleteWarehouse: function(warehouse, callback){
		var sql = "delete from warehouse where Wid=?";
		db.execute(sql, [warehouse.wid], function(status){
			if(status){
				callback(true);
				
			}else{
				callback(false);
			}
		});
	},


///warehouse ends



//transaction queries

	searchTransactions: function(transaction, callback){
		var sql ="SELECT * from `transaction` WHERE `TRname` LIKE ?";

		db.getResults(sql,[transaction.trname+'%'], function(results){

			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	getAlltransactions : function(callback){
		var sql = "select * from transaction";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},


	
	insertTransaction: function(transaction, callback){
		var sql = "INSERT INTO `transaction`(`TRname`, `TRType`, `Price`,`Description`,`Date` ) VALUES (?,?,?,?,CURDATE())";
		db.execute(sql, [transaction.trname, transaction.type, transaction.price, transaction.description], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateTransaction: function(transaction, callback){
		var sql = "UPDATE `transaction` SET `TRname`=?,`TRType`=?,`Price`=?,`Description`=? WHERE TRid=?";
		db.execute(sql, [transaction.trname, transaction.type, transaction.price, transaction.description, transaction.trid], function(status){
			if(status){

				callback(true);
			}else{
				callback(false);
			}
		});
	},
	deleteTransaction: function(transaction, callback){
		var sql = "delete from transaction where TRid=?";
		db.execute(sql, [transaction.trid], function(status){
			if(status){
				callback(true);
				
			}else{
				callback(false);
			}
		});
	},

	//transaction ends

//profile starts
updatePass: function(pass, callback){
	var sql ="SELECT * FROM user where Uid=?";
		db.getResults(sql, [pass.id], function(results){

			if(results.length > 0){
				const bcrypt = require('bcrypt');
		const saltRounds = 10;
				bcrypt.compare(pass.old, results[0].Password, function (err, result) {
        if (result == true) {
            bcrypt.hash(pass.new, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    var sql1 = "UPDATE `user` SET `Password`=? WHERE `Uid`=?";
		db.execute(sql1, [hash,pass.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
});
        } 
      });
				
			}
		});
},


//abid

	
getAllFruits : function(callback){
	var sql = "select * from food where Type='Fruit'";
	db.getResults(sql, null, function(results){
		if(results.length > 0){
			callback(results);
		}else{
			callback([]);
		}
	});
},
//extra


getKnowFood : function(type,callback){
	var sql = "select * from food where Type=? order by RAND() LIMIT 3";
	db.getResults(sql, [type], function(results1){
		if(results1.length > 0){
			callback(results1);
		}else{
			callback([]);
		}
	});
},

getAllCrops : function(callback){
	var sql = "select * from food where Type='Crops'";
	db.getResults(sql, null, function(results){
		if(results.length > 0){
			callback(results);
		}else{
			callback([]);
		}
	});
},
getAllVegetable : function(callback){
	var sql = "select * from food where Type='Vegetable'";
	db.getResults(sql, null, function(results){
		if(results.length > 0){
			callback(results);
		}else{
			callback([]);
		}
	});
},
getByIdFood : function(id, callback){
	var sql = "select * from food where Fid=?";
	db.getResults(sql, [id], function(results){
		if(results.length > 0){
			callback(results);
		}else{
			callback([]);
		}
	});
},

//cart

insertCart:function(cart, callback){

	var sql1= "select * from food where Fid=?";
	db.getResults(sql1, [cart.Fid], function(results1){
		if(results1[0].Quantity >= cart.quantity){
			var sql = "INSERT INTO `cart`(`Fid`,`Fname`,`Fimage`, `qty`,`price`, `Cus_id`) VALUES (?,(select Fname from food where Fid=?),(select Fimage from food where Fid=?),?,(?*?),?)";
	db.execute(sql, [cart.Fid,cart.Fid,cart.Fid,cart.quantity,cart.quantity,cart.Fprice,cart.Cid], function(status){
		if(status){
			callback(true);
		}else{
			callback(false);
		}
	});
		}else{
			alert("Order "+results1[0].Quantity+" Kg or less!");
			callback([]);
		}
	});

	
},

deleteCart: function(deleteCart, callback){
	var sql = "delete from cart where Fid=? AND Cus_id=?";
	db.execute(sql, [deleteCart.Fid,deleteCart.Cid], function(status){
		if(status){
			callback(true);
			
		}else{
			callback(false);
		}
	});
},


updateCart: function(updateCart, callback){
	
	var sql = "UPDATE `cart` SET price=((select SRate from food where Fid=?)*?), `qty`=? WHERE Fid=?";
	db.execute(sql, [updateCart.Fid,updateCart.qty[0],updateCart.qty[0],updateCart.Fid], function(status){
		if(status){
			callback(true);
			
		}else{
			callback(false);
		}
	});
},


getCartRow: function( callback){
	var sql = "SELECT COUNT(*) as  'CartRow' FROM cart;";
	db.getResults(sql, function(results){
		if(results.length > 0){
			callback(results);
		}else{
			callback([]);
		}
	});
},



//checkout insert

insertOrder:function(checkout, callback){
	var sql = "INSERT INTO `orders`(`Cus_id`, `name`, `email`, `phone`, `address`, `Fid`, `Fname`, `Quantity`, `Total_price`, `Status`) VALUES (?,?,?,?,?,?,?,?,?,?)";
	db.execute(sql, [checkout.Cid,checkout.Cname,checkout.Cmail,checkout.Cphone,checkout.Caddress,checkout.Fid,checkout.Fname,checkout.qty,checkout.price,'Pending'], function(status){
		if(status){
			callback(true);
		}else{
			callback(false);
		}
	});
},

deleteCartch:function(checkout,callback){
var sql = "DELETE FROM `cart` WHERE Cus_id=? ";
db.execute(sql, [checkout.Cid], function(status){
	if(status){
		callback(true);
	}else{
		callback(false);
	}
});


},

updateCusPass: function(pass, callback){
	var sql ="SELECT * FROM customer where Cus_id=?";
		db.getResults(sql, [pass.id], function(results){

			if(results.length > 0){
				const bcrypt = require('bcrypt');
		const saltRounds = 10;
				bcrypt.compare(pass.old, results[0].password, function (err, result) {
        if (result == true) {
            bcrypt.hash(pass.new, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    var sql1 = "UPDATE `customer` SET `password`=? WHERE `Cus_id`=?";
		db.execute(sql1, [hash,pass.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
});
        } 
      });
				
			}
		});
},

updateCustomer: function(cus, callback){
	var sql = "UPDATE `customer` SET `name`=? ,`email`=? ,`phone`=? ,`address`=?  WHERE Cus_id=?";
	db.execute(sql, [cus.name,cus.email,cus.phone,cus.address,cus.Cid], function(status){
		if(status){

			callback(true);
		}else{
			callback(false);
		}
	});
},

updateCusPic: function(data, callback){
	var sql = "UPDATE `customer` SET `pic`=?  WHERE Cus_id=?";
	
	db.execute(sql, [data.pic,data.Cid], function(status){
		if(status){

			callback(true);
		}else{
			callback(false);
		}
	});
},

getTransactionGraph : function(callback){
		var sql = "select * from transaction";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	insertCustomer: function(customer, callback){
		const bcrypt = require('bcrypt');
		const saltRounds = 10;
		bcrypt.hash(customer.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    var sql = "INSERT INTO `customer`(`name`,`email`, `phone`, `password`,`address`,`type` ) VALUES (?,?,?,?,?,?)";
		db.execute(sql, [customer.name, customer.email, customer.phone,hash,customer.address,'customer'], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
});
		
	},

	getAllCorders : function(cid,callback){
		var sql = "select * from orders where Cus_id=?";
		db.getResults(sql, [cid], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
				
	searchCOrder: function(order, callback){
		var sql ="SELECT * from `orders` WHERE `Fname` LIKE ? AND  Cus_id=? ";

		db.getResults(sql,[order.Fname+'%',order.cid], function(results){

			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},


	getAllCart : function(cid,callback){
		var sql = "select * from cart where Cus_id=?";
		db.getResults(sql,[cid] ,function(results){
			if(results.length >= 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},


	

	//review


	insertReview:function(review, callback){
		
		var sql = "INSERT INTO `review`(`Cus_id`,name, `Fid`, `Fname`, `comment`) VALUES (?,(select name from customer where Cus_id=?),?,(select Fname from food where Fid=?),?)";
		db.execute(sql, [review.Cid,review.Cid,review.Fid,review.Fid,review.text], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAllReview : function(id,callback){
		var sql = "select * from review where Fid=?";
		db.getResults(sql,[id] ,function(results){
			if(results.length >= 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},


	//search fruit


	searchFruit:function(fruit, callback){
		var sql ="SELECT * from `food` WHERE `Type`=? AND `Fname`LIKE ?";

		db.getResults(sql,['Fruit',fruit.Fname+'%'], function(results){

			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	
	searchCrop:function(crop, callback){
		var sql ="SELECT * from `food` WHERE `Type`=? AND `Fname`LIKE ?";

		db.getResults(sql,['Crops',crop.Fname+'%'], function(results){

			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	
	searchVeg:function(veg, callback){
		var sql ="SELECT * from `food` WHERE `Type`=? AND `Fname`LIKE ?";

		db.getResults(sql,['Vegetable',veg.Fname+'%'], function(results){

			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	}




}