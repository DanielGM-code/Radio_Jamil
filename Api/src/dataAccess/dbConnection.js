const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'reww4n.xyz',
    user: 'nodejs',
    password: 'WeHate2021',
    database: 'radio',
    multipleStatements: true
});
  
mysqlConnection.connect((err) => {
  if (err) {
     console.error(err);
     return;
  }
  // console.log('db is connected');
});
  
setInterval(() => {
  mysqlConnection.query('SELECT 1', () =>{
    var datetime = new Date();
    console.log(`${datetime} - MySQL: Connection reseted`)
  })
}, 60000);


  module.exports = mysqlConnection;