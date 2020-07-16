
const mysql = require('promise-mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.en.DB_NAME
})

const getConnection = () => connection;

module.exports = { getConnection }