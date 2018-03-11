//Jay Swaminarayan - Swami Shreeji
// Controls if quick suggestions should show up or not while typing

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs290_trivediu',
    password        : '2126',
    database        : 'cs290_trivediu'
});

module.exports.pool = pool;