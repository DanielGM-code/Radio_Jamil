const express = require("express");
const path = require('path');
const router = express.Router();

const generoDAO = require(path.join(path.resolve(__dirname, '..'), 'dataAccess', 'generoDAO.js'))

router.route('/generos')
    .get((req, res) =>{ 
        generoDAO.obtenerTodos((err, respuesta) =>{ 
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(200).json(respuesta)
        })
    })
    .post((req, res) =>{
        const genero = req.body
        if(genero.hasOwnProperty('nombre')){
            generoDAO.agregar(genero, (err, respuesta) =>{
                if(err){
                    console.log(err)
                    res.status(400).json(err)
                    return
                }
                res.status(201).json({Mensaje : 'Genero agregado'})
            })
        }
        else{
            res.status(400).json({Mensaje : 'datos invalidos'})
        }
    });

router.route('/generos/:id')
    .get((req, res) =>{
        generoDAO.obtener(req.params.id,(err, respuesta) =>{
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            if(respuesta){
                res.status(200).json(respuesta)
            }
            else{
                res.status(404).json({Mensaje : 'genero no encontrada'})
            }

        })
    })

module.exports = router