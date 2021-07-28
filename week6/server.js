const express = require('express');
const morgan = require('morgan');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require('cors');
const PORT = 5000;


// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

    // Database Connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'manifest'
    }
);

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySQL Database is Connected');
});



// POST
app.post('/post', (req, res) => {
    let sql = "INSERT INTO manifest SET ?";
    let post = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          seatNum: req.body.seatNum,
          checkIn: req.body.checkIn
    };
    db.query(sql, post, (err, result) => {
        if(err){
            throw (err);
        }
        console.log(result);
        return res.send(result)
    });
  });
  
  // GET
  app.get("/get", (req, res) => {
    let sqlSelect = "SELECT * FROM manifest;";
    db.query(sqlSelect, (err, result) => {
        if(err){
            throw (err);
        }
        console.log(result);
        return res.send(result);
    });
  });
  
  // PUT
  app.put("/edit/:id", (req, res) => {
    let updateFirstName = req.body.firstName;
    let updateLastName = req.body.lastName;
    let updateSeatNum = req.body.seatNum;
    let updateCheckIn = req.body.checkIn;
    let sql = `UPDATE manifest SET 
    firstName = '${updateFirstName}',
    lastName = '${updateLastName}',
    seatNum = '${updateSeatNum}',
    checkIn = '${updateCheckIn}'
        WHERE id = '${req.params.id}'`
    db.query(sql, (err, result) => {
        if(err){
            throw (err);
        }
        console.log(result);
        return res.send(result);
    });
  });
  
  // DELETE
  app.delete("/delete/:id", (req, res) => {
    let sql = `DELETE FROM manifest WHERE id = '${req.params.id}'`
    db.query(sql, (err, result) => {
        if(err){
            throw (err);
        }
        console.log(result);
        return res.send("Information from Manifest has been successfully removed")
    });
  });
  
  // Error Handling
  app.use((err, req, res, next) => {
      return res.send({errMsg: err.message});
  });
  
  // Listen
  app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
  })
