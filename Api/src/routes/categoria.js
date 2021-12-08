const express = require("express");
const path = require('path');
const router = express.Router();

const categoriaDAO = require(path.join(path.resolve(__dirname, '..'), 'dataAccess', 'categoriaDAO.js'))

router.route('/categorias')
    .get((req, res) =>{ 
        categoriaDAO.obtenerTodos((err, respuesta) =>{ 
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(200).json(respuesta)
        })
    })
    .post((req, res) =>{
        const categoria = req.body
        if(categoria.hasOwnProperty('nombre')){
            categoriaDAO.agregar(categoria, (err, respuesta) =>{
                if(err){
                    console.log(err)
                    res.status(400).json(err)
                    return
                }
                res.status(201).json({Mensaje : 'categoria agregado'})
            })
        }
        else{
            res.status(400).json({Mensaje : 'datos invalidos'})
        }
    });

router.route('/categorias/:id')
    .get((req, res) =>{
        categoriaDAO.obtener(req.params.id,(err, respuesta) =>{
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            if(respuesta){
                res.status(200).json(respuesta)
            }
            else{
                res.status(404).json({Mensaje : 'Categoria no encontrada'})
            }

        })
    })

module.exports = router