const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: '6-pillars',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

