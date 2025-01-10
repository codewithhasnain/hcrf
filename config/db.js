const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'mysql-2b175d8d-kumailnaqvi382-5c70.c.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_f9fjsOaNRKY6S-BNsRj',
    database: 'defaultdb', 
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = connection;
