const path = require('path')
const dbConnection = require(path.join(__dirname, 'dbConnection.js'))

function obtenerTodos(callback) {
    dbConnection.query('call SP_Read_All_Programa()', (err, rows, fields) => {
        if (err) {
            return callback(err)
        }
        callback(null, rows[0])
    })
}

function obtenerPrograma(idPrograma, callback) {
    dbConnection.query('call SP_Read_Programa(?)', [idPrograma], (err, rows, fields) => {
        if (err) { 
            return callback(err)
        }
        callback(null, rows[0][0])
    })
}

function eliminar(idPrograma, callback) {
    dbConnection.query('call SP_Delete_Programa(?)', [idPrograma], (err, rows, fields) => {
        if (err) {
            return callback(err)
        }
        callback(null, rows)
    })
}

function guardar(id, nombre, descripcion, callback) {
    dbConnection.query('call SP_Save_Programa(?, ?, ?)', [id, nombre, descripcion], (err, rows, fields) => {
        if (err) {
            return callback(err)
        }
        callback(null, rows)
    })
}

function obtenerReporte(){
    return new Promise((resolve, reject) => {
        dbConnection.query('call SP_Read_Programa_Reporte()', (err, rows, fields) =>{
            if(err){
                reject(err)
            }
            else{
                resolve(rows[0])
            }
        })
    })
}
module.exports = {obtenerTodos, obtenerPrograma, eliminar, guardar, obtenerReporte}