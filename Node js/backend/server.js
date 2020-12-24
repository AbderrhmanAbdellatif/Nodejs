var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser')
app.set('view engine', 'html');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
});
app.get('/', function(req, res) {
    connection.connect();

    connection.query('SELECT * FROM customers', function(err, rows, fields) { // get all row in db
        // connection.end();

        if (err) throw err;
        res.json(rows);

    });
});

app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    var id = req.body.id; // get id 
    var lang = req.body.lang; // get lang اللهجة
    var stu = req.body.intent; // get stu الحاله 
    console.log("print", id, lang, stu);
    console.log("Connected!");
    var sql = `UPDATE customers SET LANG = '${lang}' , STU = '${stu}' WHERE id = '${id}'`; // update the db and insert the value
    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });


});
app.get('/submit', function(req, res) {
    res.sendFile('index.html', { root: "C:\\Users\\someo" }); // my html 
});



app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});