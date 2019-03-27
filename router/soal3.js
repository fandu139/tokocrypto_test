var express = require('express');
var router = express.Router();
const mysql = require('mysql');

var connection = mysql.createPool({
  connectionLimit: 50,
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'tokocrypto'
});

router.get('/get_users', function(req, resp, next) {
	connection.getConnection(function(error, tempCount){
		if(!!error){
			tempCount.release();
			console.log('Error');
		}else{
			console.log('Conncected');
			tempCount.query('select * from user', function(error, row, fields){
				if(!!error){
					console.log('Error in query');
				}else{
					console.log('Success');

					var students = {"tampil":row}

					resp.json(students);
				}
			});
		}
	});
});

module.exports = router;
