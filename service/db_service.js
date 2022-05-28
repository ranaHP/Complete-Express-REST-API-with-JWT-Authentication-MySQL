const mysql = require('mysql');
const conn = mysql.createConnection({
 host: "localhost",
 user: "root", // your my sql user name. By default it's 'root' 
 password: "", //your my mysql password. By default it's '' (empty string)
 database: "abc_school", // here your database name 
});

conn.connect();

module.exports = conn;