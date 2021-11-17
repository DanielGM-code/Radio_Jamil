const path = require('path');

const parentFolder = path.resolve(__dirname, '..')
const dbConnection = require(path.join(parentFolder, 'util', 'dbConnection.js'))

function getAll(callback){
    dbConnection.query('call SP_Read_All_Patron()', callback)
}

function add(patron, callback){
    dbConnection.query('call SP_Create_Patron(?)', [patron.nombrePatron], callback)
}

function get(id, callback){
    dbConnection.query('call SP_Read_Patron(?)', [id], callback)
}

function update(id, patron, callback){
    dbConnection.query('call SP_Update_Patron(?, ?, ?)',
    [id, patron.nombrePatron, patron.estadoPatron],callback)
}

function setInactive(id, callback){
    dbConnection.query('call SP_Delete_Patron(?)', [id], callback)
}

module.exports = {getAll, add, get, update, setInactive}