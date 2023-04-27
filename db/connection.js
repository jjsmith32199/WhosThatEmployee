const mysql = require('mysql12');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees',
});

connection.connect(function (err){
    if (err) throw err;
});

module.exports = connection;