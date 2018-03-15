module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
    var app = express();
    
    function getWorkouts(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name, reps, weight, date, lbs FROM workouts", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            
            //Convert the boolean result into either Kilograms or Pounds
            for (var i = 0 ; i < results.length; i++){
                if (results[i].lbs === 0){
                    results[i].lbs = "kg";
                } else if (results[i].lbs === 1){
                    results[i].lbs = "lbs";
                }
            }

            //Trim the date result, because JS tends to append the time to it also
            for (var j = 0; j < results.length; j++){
                results[j].date = (JSON.stringify(results[j].date)).substring(1,11);
                
            }

            // console.log("Output test:");
            // console.log(results);
            // var test1 = JSON.stringify(results[0].date);
            // var test2 = JSON.stringify(results[1].date);
            // console.log(test1.substring(1,11));
            // console.log(test2.substring(1,11));
            // results[0].date = test1.substring(1,11);
            // results[1].date = test2.substring(1,11);
            context.workouts = results;
            complete();
        });
    }
    
    
    function getPlanets(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name FROM bsg_planets", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.planets  = results;
            complete();
        });
    }

    function getPeople(res, mysql, context, complete){
        mysql.pool.query("SELECT bsg_people.id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }



    //both functions below are for the purpose of updating the table
    function getWork(res, mysql, context, id, complete){
        var sql = "SELECT id, name, reps, weight, date, lbs FROM workouts WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.workouts = results[0];
            results[0].date = (JSON.stringify(results[0].date)).substring(1,11);
            console.log(results[0].date);
            complete();
        });
    }

    function getPerson(res, mysql, context, id, complete){
        var sql = "SELECT id, fname, lname, homeworld, age FROM bsg_people WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.person = results[0];
            complete();
        });
    }

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js"];
        var mysql = req.app.get('mysql');
         getPeople(res, mysql, context, complete);
         getPlanets(res, mysql, context, complete);
        getWorkouts(res,mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('people', context);
            }

        }
    });



    // router.get('/', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["deleteperson.js"];
    //     var mysql = req.app.get('mysql');
    //     getPeople(res, mysql, context, complete);
    //     getPlanets(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('people', context);
    //         }

    //     }
    // });

    /* Display one person for the specific purpose of updating people */

   
    
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedUnits.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
        getPerson(res, mysql, context, req.params.id, complete);
        getPlanets(res, mysql, context, complete);
        getWork(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('update-person', context);
            }

        }
    });



    // router.get('/:id', function(req, res){
    //     callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["selectedplanet.js", "updateperson.js"];
    //     var mysql = req.app.get('mysql');
    //     getPerson(res, mysql, context, req.params.id, complete);
    //     getPlanets(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('update-person', context);
    //         }

    //     }
    // });

    /* Adds a person, redirects to the people page after adding */



// app.get('/reset-table',function(req,res,next){
//   var context = {};
//    var mysql = req.app.get('mysql');
//   mysql.pool.query.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
//     var createString = "CREATE TABLE workouts("+
//     "id INT PRIMARY KEY AUTO_INCREMENT,"+
//     "name VARCHAR(255) NOT NULL,"+
//     "reps INT,"+
//     "weight INT,"+
//     "date DATE,"+
//     "lbs BOOLEAN)";
//     mysql.pool.query.query(createString, function(err){
//       //context.results = "Table reset";
//       res.render('people.handlebars');
//     })
//   });
// });


    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?,?,?,?,?)";
        var inserts = [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/people');
            }
        });
    });

    /* The URI that update data is sent to in order to update a person */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?";
        var inserts = [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });


    // router.put('/:id', function(req, res){
    //     var mysql = req.app.get('mysql');
    //     var sql = "UPDATE bsg_people SET fname=?, lname=?, homeworld=?, age=? WHERE id=?";
    //     var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age, req.params.id];
    //     sql = mysql.pool.query(sql,inserts,function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }else{
    //             res.status(200);
    //             res.end();
    //         }
    //     });
    // });


    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM workouts WHERE id = ?"; //bsg_people
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();