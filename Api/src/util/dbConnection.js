const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'reww4n.xyz',
    user: 'nodejs',
    password: 'WeHate2021',
    database: 'prueba',
    multipleStatements: true
  });
  
  mysqlConnection.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    }
    // console.log('db is connected');
  });
  
  module.exports = mysqlConnection;