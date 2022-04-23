
const mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'testing'
});



const exports_connector = {
    returnPool: () => {
        console.log("Hello, world!");
        return pool;
    }
};

module.exports = exports_connector;
