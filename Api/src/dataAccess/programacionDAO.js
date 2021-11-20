const path = require('path');
const dbConnection = require(path.join(__dirname,  'dbConnection.js'))

function getAll(callback){
    dbConnection.query('call SP_Read_All_Programacion()', callback)
}

function add(programacion, callback){
    dbConnection.query('call SP_Create_Programacion(?)', [programacion.nombre], callback)
}

function get(id, callback){
    dbConnection.query('call SP_Read_Programacion(?)', [id], callback)
}

function update(id, programacion, callback){
    dbConnection.query('call SP_Update_Programacion(?, ?, ?)', [id, programacion.nombre, programacion.estado],callback)
}

function setInactive(id, callback){
    dbConnection.query('call SP_Delete_programacion(?)', [id], callback)
}

module.exports = {getAll, add, get, update, setInactive}