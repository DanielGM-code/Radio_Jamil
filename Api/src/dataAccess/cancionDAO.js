const path = require('path');

const parentFolder = path.resolve(__dirname, '..')
const dbConnection = require(path.join(parentFolder, 'util', 'dbConnection.js'))

function getAll(callback){
    dbConnection.query('call SP_Read_All_Cancion()', callback)
}

function add(cancion, callback){
    dbConnection.query('call SP_Create_Cancion(?, ?, ?, ?, ?, ?, ?, @estado, @mensaje); SELECT @estado as estado, @mensaje as mensaje', [cancion.nombreCancion, cancion.idArtista, cancion.idGenero, cancion.idCategoria, cancion.referencia, cancion.esPeticion, cancion.diasReproduccion], callback)
}

function get(id, callback){
    dbConnection.query('call SP_Read_Cancion(?)', [id], callback)
}

function update(id, cancion, callback){
    dbConnection.query('call SP_Update_Cancion(?, ?, ?, ?, ?, ?, ?, ?, @estado, @Mensaje); SELECT @estado as estado, @mensaje as mensaje',
    [id, cancion.nombreCancion, cancion.idArtista, cancion.idGenero, cancion.idCategoria, cancion.referencia, cancion.esPeticion, cancion.diasReproduccion],callback)
}

function setInactive(id, callback){
    dbConnection.query('call SP_Delete_Cancion(?)', [id], callback)
}

module.exports = {getAll, add, get, update, setInactive}