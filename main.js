//Jay Swaminarayan - Swami Shreeji

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app     = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.set('mysql', mysql);


app.use('/', require('./workout.js'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

























// /*******************************************************************************************
// Select all the data in the table to display
// ********************************************************************************************/
// app.get('/',function(req,res,next){
//     var context = {};
//     mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
//       if(err){
//         next(err);
//         return;
//       }
//       context.results = JSON.stringify(rows);
//       res.render('home', context);
//     });
//   });



// /*******************************************************************************************
// Insert data in the table to display
// ********************************************************************************************/

//   app.get('/insert',function(req,res,next){
//     var context = {};
//     mysql.pool.query("INSERT INTO workouts (`id`) VALUES (?)", [req.query.c], function(err, result){
//       if(err){
//         next(err);
//         return;
//       }
//       context.results = "Inserted id " + result.insertId;
//       res.render('home',context);
//     });
//   });



// /*******************************************************************************************
// Reset the database table and then take the user back to the homepage
// ********************************************************************************************/
// app.get('/reset-table',function(req,res,next){
//     var context = {};
//     mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
//       var createString = "CREATE TABLE workouts("+
//       "id INT PRIMARY KEY AUTO_INCREMENT,"+
//       "name VARCHAR(255) NOT NULL,"+
//       "reps INT,"+
//       "weight INT,"+
//       "date DATE,"+
//       "lbs BOOLEAN)";
//       mysql.pool.query(createString, function(err){
//         context.results = "Table reset";
//         res.render('home',context);
//       })
//     });
//   });



// /*******************************************************************************************
// Publish page app to the appropriate port
// ********************************************************************************************/
//   app.listen(app.get('port'), function(){
//     console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
//   });