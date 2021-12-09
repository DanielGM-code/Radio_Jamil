const path = require('path');

const dbConnection = require(path.join(__dirname, 'dbConnection.js'))

function obtenerTodos(callback){
    dbConnection.query('call SP_Read_All_Cancion()', (err, rows, fields) =>{
        if(err){
            return callback(err)
        }
        else{
            callback(null, rows[0])
        }
    })
}

function agregar(cancion, callback){
    dbConnection.query('call SP_Create_Cancion(?, ?, ?, ?, ?, ?, ?, ?)',
        [cancion.id, cancion.nombre, cancion.idArtista, cancion.idGenero, cancion.idCategoria, cancion.nombreArtista, cancion.nombreGenero, cancion.nombreCategoria], (err, rows, fields) => {
            if(err){
                callback(err)
            }
            else{
                callback(null, rows)
            }
        })
}

function obtener(id, callback){
    dbConnection.query('call SP_Read_Cancion(?)', [id], (err, rows, fields) =>{
        respuesta = rows[0][0]
        if(err || !respuesta){
            return callback(err)
        }
        else{
            dbConnection.query('call SP_Read_Artista(?)', [respuesta.idArtista], (err, rows, fields) =>{
                if(err){
                    return callback(err)
                }
                else{
                    respuesta.artista = rows[0][0]
                    callback(null, respuesta)
                }
            })
        }
    })
}

function ajustarInactivo(id, callback){
    dbConnection.query('call SP_Delete_Cancion(?)', [id], (err, rows, fields) => {
        if(err){
            callback(err)
        }
        else{
            callback(null, rows)
        }
    })
}

function obtenerCancionesHorario(idHorario, callback) {
    dbConnection.query('call SP_Read_Canciones_Horario(?)', [idHorario], (err, rows, fields) => {
        if (err) {
            callback(err)
        }
        callback(null, rows[0])
    })
}

module.exports = {obtenerTodos, agregar, obtener, ajustarInactivo, obtenerCancionesHorario}