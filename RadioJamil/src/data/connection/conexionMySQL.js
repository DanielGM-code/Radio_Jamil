const mysql = require('mysql');

export class ConexionMySQL{
    constructor(){
        var connection = mysql.createConnection({
            host: 'maisonbleue2020.ddns.net',
            user: 'yamil',
            password: 'mugroso117',
            database: 'prueba'
        });
        
        connection.connect((error) => {
            if(error){
                console.error('Error Connecting: ' + error.stack);
                return;
            }
        
            console.log('Conected as:' + connection.threadId);
        });

        return connection;
    }
}
