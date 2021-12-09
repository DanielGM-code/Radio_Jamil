const express = require("express");
const path = require('path');
const router = express.Router();

const cancionDAO = require(path.join(path.resolve(__dirname, '..'), 'dataAccess', 'cancionDAO.js'))

router.route('/canciones')
    .get((req, res) =>{ 
        cancionDAO.obtenerTodos((err, respuesta) =>{ 
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(200).json(respuesta)
        })
    })
    .post((req, res) =>{
        const cancion = req.body
        if(cancionValida(cancion)){
            // cancionDAO.agregar(cancion, (err, respuesta) =>{
            //     if(err){
            //         console.log(err)
            //         res.status(400).json(err)
            //         return
            //     }
            //     res.status(201).json(respuesta)
            // })
            res.status(201).json(cancion)
            console.log(cancion)
        }
        else{
            res.status(400).json({Mensaje : 'datos invalidos'})
        }
    });

router.route('/canciones/:id')
    .get((req, res) =>{
        cancionDAO.obtener(req.params.id,(err, respuesta) =>{
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            if(respuesta){
                res.status(200).json(respuesta)
            }
            else{
                res.status(404).json({Mensaje : 'Cancion no encontrada'})
            }

        })
    })
    .patch((req, res) =>{
        const cancion = req.body
        if(cancionValida(cancion)){
            cancionDAO.actualizar(req.params.id, cancion, (err, respuesta) =>{ 
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
    })
    .delete((req, res) =>{
        cancionDAO.ajustarInactivo([req.params.id], (err, respuesta) =>{ 
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(204).json({Mensaje: 'Eliminado'})
        })
    });

function cancionValida(cancion){
    if(cancion.hasOwnProperty('nombre') 
    && cancion.hasOwnProperty('idArtista') 
    && cancion.hasOwnProperty('idGenero') 
    && cancion.hasOwnProperty('idCategoria') 
    && cancion.hasOwnProperty('referencia') 
    && cancion.hasOwnProperty('esPeticion') 
    && cancion.hasOwnProperty('diasReproduccion')){
        return true
    }
    return false
}

module.exports = router