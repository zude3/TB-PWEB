const mysql = require('mysql2/promise');

/**
 * Connection pool MySQL.
 * Di-import oleh modul lain yang membutuhkan akses database.
 */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pweb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = pool;
