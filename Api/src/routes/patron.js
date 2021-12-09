const express = require("express");
const path = require('path');
const router = express.Router();

const patronDAO = require(path.join(path.resolve(__dirname, '..'), 'dataAccess', 'patronDAO.js'))

router.route('/patrones')
    .get((req, res) =>{ 
        patronDAO.obtenerTodos((err, respuesta) =>{ 
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(200).json(respuesta)
        })
    })
    .post((req, res) =>{
        const patron = req.body
        if(patron.hasOwnProperty('nombre')){
            patronDAO.agregar(patron, (err, respuesta) =>{
                if(err){
                    console.log(err)
                    res.status(400).json(err)
                    return
                }
                res.status(201).json(respuesta)
            })
        }
        else{
            res.status(400).json({Mensaje : 'datos invalidos'})
        }
    });

router.route('/patrones/:id')
    .get((req, res) =>{
        patronDAO.obtener(req.params.id,(err, respuesta) =>{
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            if(respuesta){
                res.status(200).json(respuesta)
            }
            else{
                res.status(404).json({Mensaje : 'Artista no encontrada'})
            }

        })
    })
    .delete((req, res) =>{
        patronDAO.ajustarInactivo([req.params.id], (err, respuesta) =>{ 
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(204).json({Mensaje: 'Eliminado'})
        })
    });

router.route('/patronCategoria')
    .post((req, res) =>{
        const patron = req.body.idPatron
        const arrayCategorias = req.body.categorias

        patronDAO.agregarCategoria(patron, arrayCategorias, (err, respuesta) =>{
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(201).json({Mensaje: 'Categorias registradas'})
        })
    });

router.route('/patronCategoria/:id')
    .get((req, res) =>{ 
        patronDAO.obtenerCategorias(req.params.id, (err, respuesta) =>{ 
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(200).json(respuesta)
        })
    })

module.exports = router