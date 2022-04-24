const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const connector = require(path.join(__dirname,'scripts','connector.js'));

const app = express();
const port = 5000;

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"index.html"));
});

app.get("/test", (req,res) => {
    let pool = connector.returnPool();
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from USERS', (err, rows) => {
            connection.release() // return the connection to pool
    
            if (!err) {
                console.log(rows);
                res.send(rows);
            } else {
                console.log(err);
            };
    
            // if(err) throw err
            //console.log('The data from beer table are: \n', rows)
        })
    })
});

app.post("/createAccount", (req, res) => {
    let pool = connector.returnPool();
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId)
        connection.query(`INSERT INTO USERS (USERNAME, PASSWORD) VALUES ("`+req.body.username+`", "`+req.body.password+`");`, (err, rows) => {
            connection.release() // return the connection to pool
    
            if (!err) {
                console.log(rows);
                res.sendStatus(200);
            } else {
                console.log(err);
            };
    
            // if(err) throw err
            //console.log('The data from beer table are: \n', rows)
        })
    })
});

app.get("/applyNow", (req, res) => {
    res.sendFile(path.join(__dirname,"public","pages","applyNow.html"));
});

app.get("/students", (req, res) => {
    res.sendFile(path.join(__dirname,"public","pages","students.html"));
});

app.post("/fetchStudents", (req, res) => {
    console.log("Done");
    let pool = connector.returnPool();
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId)
        connection.query(`SELECT FIRST_NAME, LAST_NAME, CITY, APPROVED FROM APPLICANTS;`, (err, rows) => {
            connection.release(); // return the connection to pool
    
            if (!err) {
                console.log(rows);
                res.send(rows);
            } else {
                console.log(err);
            };
    
            // if(err) throw err
            //console.log('The data from beer table are: \n', rows)
        })
    });
});

app.post("/applyNow", (req, res) => {
    let pool = connector.returnPool();
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId)
        connection.query(`INSERT INTO APPLICANTS (FIRST_NAME, LAST_NAME, DOB, ADDRESS, ZIP_CODE, CITY, COUNTRY, EMAIL, PHONE_NUMBER) VALUES ('`+req.body.first_name+`', '`+req.body.last_name+`',STR_TO_DATE('`+req.body.month+`/`+req.body.day+`/`+req.body.year+`','%m/%d/%Y')`+`,'`+req.body.address+`','`+req.body.zip_code+`','`+req.body.city+`','`+req.body.country+`','`+req.body.email+`','`+req.body.phone_number+`');`, (err, rows) => {
            connection.release() // return the connection to pool
    
            if (!err) {
                console.log(rows);
                res.sendFile(path.join(__dirname, "public", "pages", "success.html"));
            } else {
                console.log(err);
            };
    
            // if(err) throw err
            //console.log('The data from beer table are: \n', rows)
        })
    })
});