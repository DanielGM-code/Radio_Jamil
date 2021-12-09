const path = require('path');

const dbConnection = require(path.join(__dirname, 'dbConnection.js'))

function obtenerTodos(callback){
    dbConnection.query('call SP_Read_All_Patron()', (err, rows, fields) =>{
        if(err){
            return callback(err)
        }
        else{
            callback(null, rows[0])
        }
    })
}

function obtener(id, callback){
    dbConnection.query('call SP_Read_Patron(?)', [id], (err, rows, fields) =>{
        if(err){
            return callback(err)
        }
        else{
            callback(null, rows[0][0])
        }
    })
}

function agregar(patron, callback){
    dbConnection.query('call SP_Create_Patron(?);', [patron.nombre], (err, rows, fields) => {
        if(err){
            callback(err)
        }
        else{
            callback(null, rows)
        }
    })
}

function ajustarInactivo(id, callback){
    dbConnection.query('call SP_Delete_Patron(?)', [id], (err, rows, fields) => {
        if(err){
            callback(err)
        }
        else{
            callback(null, rows)
        }
    })
}

module.exports = {obtener, obtenerTodos, agregar, ajustarInactivo}