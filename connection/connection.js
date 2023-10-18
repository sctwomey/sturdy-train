const mysql = require('mysql2');

// This is the database connection.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employee_db'
},
    console.log(`Connected to the employee_db database.`)
);

module.exports = db;