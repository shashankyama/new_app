const { json } = require("express");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Shashank@123",
  database: "usersdb",
  port: 3306,
  multipleStatements: true,
});

con.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected");
});

const insertData = (id, name, callback) => {
  const userData = [[id, name]];
  con.query(
    "INSERT INTO users (id, name) VALUES ?",
    [userData],
    function (err, result) {
      if (err) {
        console.error("Error inserting data:", err);
        callback(err, null);
      } else {
        console.log("Number of records inserted: " + result.affectedRows);
        callback(null, { id, name });
      }
    }
  );
};

const createAccount = (email_id, password, callback) => {
  const userData = [[email_id, password]];
  con.query(
    "INSERT INTO login (email_id, password) VALUES ?",
    [userData],
    function (err, result) {
      if (err) {
        console.error("Error inserting data:", err);
        callback(err, null);
      } else {
        console.log("Number of records inserted: " + result.affectedRows);
        callback(null, { email_id, password });
      }
    }
  );
};

const getData = (callback) => {
  con.query("SELECT * FROM users", function (err, result) {
    if (err) {
      console.error("Error retrieving data:", err);
      callback(err, null);
    } else {
      const jsonData = JSON.stringify(result);
      //console.log(jsonData);
      callback(null, jsonData);
    }
  });
};

const checkEmail = (email, callback) => {
  con.query(
    "SELECT COUNT(*) FROM login WHERE email_id = ?",
    email,
    function (err, result) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log(result);
        callback(null, result);
      }
    }
  );
};

module.exports = { getData, insertData, checkEmail, createAccount };
