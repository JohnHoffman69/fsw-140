const express = require('express');

const mysql = require('mysql')

const PORT = 5000;

// Database Connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'nbajerseys'
    }
);

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySQL Database is Connected');
});

//Setup Express Server
const app = express();


// Create Database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nbajerseys';
     //execute sql query
     db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        
        console.log("Database nbajerseys Created Successfully!");
    }); 
});

//Create a New Table
app.get('/createtable', (req, res) => {
    let sql = "CREATE TABLE postings (id INT AUTO_INCREMENT, title VARCHAR(50), message VARCHAR(50), PRIMARY KEY(id)) ";
    //execute sql query
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        console.log("Postings Table Created Susccessfully!");
   });

});
// Insert New Record 1
app.post('/instertrow1', (req, res) => {
    let post = {title:'MichealJ', message:'ChicagoBulls'};
    let sql =  "INSERT INTO posting SET ?";
    db.query(sql, post, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        console.log("Row1 Inserted!!");
    });
});
// Insert New Record 2
app.post('/instertrow2', (req, res) => {
    let post = {title:'Lebron James', message:'LA Lakers'};
    let sql =  "INSERT INTO posting SET ?";
    db.query(sql, post, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        console.log("Row2 Inserted!!");
    });

});

// Select Rows
app.get('/getposts/:id', (req, res) => {
    let sql = `SELECT * FROM postings WHERE id = ${reg.params.id}`;
     //execute sql query
     db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
       console.log("Record Retreived Created Successfully!");
    }); 
});

// UDATE COMMAND
app.get('/updateposts/:id', (req, res) => {
    let newTitle = "This is updated title via hardcoaded value";
    let sql = `UPDATE postings SET title = ${newTitle} WHERE id = ${req.params.id}`;
     //execute sql query
     db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(sql);
        console.log(result);
       console.log("UPDATE Query Executed Successfully!");
    }); 
});

// DELETE Command
// Execute a DELETE Command
app.get('/deleteposts/id', (req, res) => {
    let sql = `DELETE FROM postings WHERE id = ${req.params.id}`;
     //execute sql query
     db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        
        console.log(result);
       console.log("DELETE Command Executed Successfully!");
    }); 
});
//Open the default port and listen for the connection
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});


