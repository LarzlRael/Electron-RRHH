
const mysql = require('promise-mysql');
const connection = mysql.createConnection({
    host: process.env,
    user: process.env,
    password: process.env,
    database: process.env
})

const getConnection = () => connection;

module.exports = { getConnection }