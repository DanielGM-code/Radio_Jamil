const express = require("express");
const path = require('path');
const router = express.Router();

const artistaDAO = require(path.join(path.resolve(__dirname, '..'), 'dataAccess', 'artistaDAO.js'))

router.route('/artistas')
    .get((req, res) =>{ 
        artistaDAO.obtenerTodos((err, respuesta) =>{ 
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(200).json(respuesta)
        })
    })
    .post((req, res) =>{
        const artista = req.body
        if(artistaValido(artista)){
            artistaDAO.agregar(artista, (err, respuesta) =>{
                if(err){
                    console.log(err)
                    res.status(400).json(err)
                    return
                }
                res.status(201).json({Mensaje : 'Artista agregado'})
            })
        }
        else{
            res.status(400).json({Mensaje : 'datos invalidos'})
        }
    });

router.route('/artistas/:id')
    .get((req, res) =>{
        artistaDAO.obtener(req.params.id,(err, respuesta) =>{
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

function artistaValido(artista){
    if(artista.hasOwnProperty('nombre')){
        return true
    }
    return false
}

module.exports = router