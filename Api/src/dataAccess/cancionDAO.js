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
    dbConnection.query('call SP_Create_Cancion(?, ?, ?, ?, ?, ?, ?, @estado, @mensaje); SELECT @estado as estado, @mensaje as mensaje',
        [cancion.nombreCancion, cancion.idArtista, cancion.idGenero, cancion.idCategoria, cancion.referencia, cancion.esPeticion, cancion.diasReproduccion], (err, rows, fields) => {
            if(err){
                callback(err)
            }
            else{
                callback(null, rows[1][0])
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
            dbConnection.query('call SP_Read_Artista(?)', [respuesta.id], (err, rows, fields) =>{
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

function actualizar(id, cancion, callback){
    dbConnection.query('call SP_Update_Cancion(?, ?, ?, ?, ?, ?, ?, ?, @estado, @Mensaje); SELECT @estado as estado, @mensaje as mensaje',
    [id, cancion.nombreCancion, cancion.idArtista, cancion.idGenero, cancion.idCategoria, cancion.referencia, cancion.esPeticion, cancion.diasReproduccion],(err, rows, fields) => {
        if(err){
            callback(err)
        }
        else{
            callback(null, rows[1][0])
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

module.exports = {obtenerTodos, agregar, obtener, actualizar, ajustarInactivo}