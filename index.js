const express = require('express');
const helmet = require('helmet');
const mysql = require('mysql');
const app = express();

var connection = mysql.createPool({
  connectionLimit: 50,
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'tokocrypto'
});

app.get("/", function(req, resp){
    connection.getConnection(function(error, tempCount){
  		if(!!error){
  			tempCount.release();
  		}else{
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

var fibonacci = [];

app.get("/soal1", function(req, resp){

  var xn = 0;
  var a = 0;
  var b = 1;
  var limit = 10

  for(z=0; z<limit; z++){
    xn = a + b ;
    view(xn);
    a = b;
    b = xn;
  }

  resp.send(fibonacci);

});

function view(xn) {
  fibonacci.push(xn);
  console.log("masuk fandu = "+xn);
}

app.get("/soal2", function(req, resp){

  var a = [1, 2, 0, 5, 8, 1, 3];
  var b = [3, 0, 7, 5, 1, 9];

  var benar = 0;
  var salah = 0;

  b.forEach(function(item, index, array){
    var status = false;
    a.forEach(function(item_a, index_a, array_a){
      if ( item === item_a){
        status = true;
      }
    });
    console.log("soal nomor 2 = apakah tabel B yaitu "+item+" subarray dari tabel A = "+status);

    if (status){
      benar++;
    } else {
      salah++;
    }

  });

  resp.send("Jumlah Array Benar "+ benar +" dan Salah "+salah);

});

//var soal3 = require('./router/soal3');
//app.use('/soal3', soal3);


app.listen(1337, function(){
  console.log("Server sudah jalan di port 1337");
});
