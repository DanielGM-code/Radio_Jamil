const path = require('path')
const dbConnection = require(path.join(__dirname, 'dbConnection.js'))

function obtenerTodos(callback) {
    dbConnection.query('call SP_Read_All_Horario()', (err, rows, fields) => {
        if(err) {
            return callback(err)
        }
        else {
            callback(null, rows[0])
        }
    })
}

function actualizarCancionHorario(idHorario, idCancionActual, idCancionReemplazo, callback) {
    dbConnection.query('call SP_Update_Horario_Cancion(?, ?, ?)', [idHorario, idCancionActual, idCancionReemplazo], (err, rows, fields) => {
        if  (err) {
            return callback(err)
        }
        callback(null, rows)
    })
}

module.exports = {obtenerTodos, actualizarCancionHorario}