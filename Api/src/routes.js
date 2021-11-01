const express = require("express");
const path = require('path');
const router = express.Router();

dbConnection = require(path.join(__dirname, 'DbConnection.js'))

//Main route que no se por qué puse XD
router.get('/', (req, res) =>{
    res.json({Status: 'jaja nel'})
});

//Obtener TODOS los usuaruios
router.get('/users', (req, res) =>{
    dbConnection.query('SELECT * FROM usuario WHERE estado = ?;', ['activo'], (err, rows, fields) =>{
        if(err){
            console.log(err)
            return
        }
        res.json(rows)
    })
});

//Obtener UN SOLO usuario
router.get('/users/:id', (req, res) =>{
    dbConnection.query('SELECT * FROM usuario;', (err, rows, fields) =>{
        dbConnection.query('SELECT * FROM usuario WHERE id = ? AND estado = ?;', [req.params.id, 'activo'] ,(err, rows, fields) =>{
            if(err){
                console.log(err)
                return
            }
            res.json(rows[0])
        })
    })
});

//Borrar un usuario
router.delete('/users/:id', (req, res) =>{
    dbConnection.query('UPDATE usuario SET estado = ? WHERE id = ?;', ['inactivo', req.params.id] ,(err, rows, fields) =>{
        if(err){
            console.log(err)
            return
        }
        res.json({Status: 'Eliminado'})
    })
});

//Insertar un usuario
router.post('/users', (req, res) =>{
    const newUser = req.body
    dbConnection.query('INSERT INTO usuario(nombre, estado) VALUES(?, ?);', [newUser.nombre, 'activo'] ,(err, rows, fields) =>{
        if(err){
            console.log(err)
            return
        }
        res.json({Status: 'Usuario agregado'})
    })
});


//Actualizar un usuario
router.put('/users/:id', (req, res) =>{
    const newUser = req.body
    dbConnection.query('UPDATE usuario SET nombre = ? WHERE id = ?', [newUser.nombre, req.params.id] ,(err, rows, fields) =>{
        if(err){
            console.log(err)
            return
        }
        res.json({Status: 'Usuario modificado'})
    })
});

module.exports = router