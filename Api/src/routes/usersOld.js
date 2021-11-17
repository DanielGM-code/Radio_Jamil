const express = require("express");
const path = require('path');
const router = express.Router();

const parentFolder = path.resolve(__dirname, '..')
const dbConnection = require(path.join(parentFolder, 'util', 'dbConnection.js'))

router.route('/users')
    .get((req, res) =>{ //Obtener TODOS los usuaruios
        dbConnection.query('SELECT * FROM usuario WHERE estado = ?;', ['activo'], (err, rows, fields) =>{
            if(err){
                console.log(err)
                return
            }
            res.status(200).json(rows)
        })
    })
    .post((req, res) =>{ //Insertar un usuario
        const newUser = req.body
        dbConnection.query('INSERT INTO usuario(nombre, password, estado) VALUES(?, ?, ?);', [newUser.nombre, newUser.password, 'activo'] ,(err, rows, fields) =>{
            if(err){
                console.log(err)
                return
            }
            res.status(201).json({Status: 'Usuario agregado'})
        })
    });

router.route('/users/:id')
    .get((req, res) =>{ //Obtener UN SOLO usuario
        dbConnection.query('SELECT * FROM usuario WHERE id = ? AND estado = ?;', [req.params.id, 'activo'] ,(err, rows, fields) =>{
            if(err){
                console.log(err)
                return
            }
            if(rows[0]){
                res.status(200).json(rows[0])
            }
            else{
                res.status(404).json({Message : 'User not found'})
            }

        })
    })
    .put((req, res) =>{ //Actualizar un usuario
        const newUser = req.body
        dbConnection.query('UPDATE usuario SET nombre = ? WHERE id = ?', [newUser.nombre, req.params.id] ,(err, rows, fields) =>{
            if(err){
                console.log(err)
                return
            }
            res.status(200).json({Status: 'Usuario modificado'})
        })
    })
    .delete((req, res) =>{ //Borrar un usuario
        dbConnection.query('UPDATE usuario SET estado = ? WHERE id = ?;', ['inactivo', req.params.id] ,(err, rows, fields) =>{
            if(err){
                console.log(err)
                return
            }
            res.status(200).json({Status: 'Eliminado'})
        })
    });

module.exports = router