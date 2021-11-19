const bcrypt = require('bcrypt');
dbConnection = require('./dbConnection.js')

function getUser(id){
    return new Promise((resolve, reject) =>{
        dbConnection.query('SELECT * FROM usuario WHERE id = ? AND estado = ?;', [id, 'activo'] , (err, rows, fields) =>{
            if(err){
                reject(err)
            }
            resolve(rows[0])
        })
    })
}

function insertUser(user, hashedPass){
    return new Promise((resolve, reject) =>{
        dbConnection.query('INSERT INTO usuario(nombre, password, estado) VALUES(?, ?, ?);', 
        [user.nombre, hashedPass, 'activo'] ,(err, rows, fields) =>{
            if(err){
                reject(err)
            }
            resolve(rows.insertId)
        })
    })
}

function registerUser(user, cb){
    bcrypt.hash(user.password, 10)
    .then((hashedPass) => insertUser(user, hashedPass))
    .then(cb)
    .catch((err) => console.log(err))
}

function checkCredentials(id, password, done){
    getUser(id)
    .then((user) => bcrypt.compare(password, user.password, done))
    .catch((err) => console.log(err))
}

module.exports =  {registerUser, getUser, checkCredentials}