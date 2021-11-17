const express = require("express");
const path = require('path');
const router = express.Router();

const cancionDAO = require(path.join(path.resolve(__dirname, '..'), 'dataAccess', 'cancionDAO.js'))//Conexión al DAO, maneja la conexión a DB y sentencia SQL

router.route('/canciones')
    .get((req, res) =>{ //Obtener TODAS las canciones
        cancionDAO.getAll((err, rows, fields) =>{ //Método del DAO (Con un callback)
            //Manejamos la respuesta de la DB
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(200).json(rows[0])
        })
    })
    .post((req, res) =>{ //Insertar una cancion
        const cancion = req.body
        if(cancionValida(cancion)){ //Verificamos que lo que recibimos sea lo que necesitamos
            cancionDAO.add(cancion, (err, rows, fields) =>{ //Método del DAO (Con un callback)
            //Manejamos la respuesta de la DB
                if(err){
                    console.log(err)
                    res.status(400).json(err)
                    return
                }
                res.status(201).json(rows[1][0])
            })
        }
        else{
            res.status(400).json({Mensaje : 'datos invalidos'})
        }
    });

router.route('/canciones/:id')
    .get((req, res) =>{ //Obtener UNA SOLA cancion
        cancionDAO.get(req.params.id,(err, rows, fields) =>{ //Método del DAO (Con un callback)
            //Manejamos la respuesta de la DB
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            if(rows[0][0]){
                res.status(200).json(rows[0][0])
            }
            else{
                res.status(404).json({Message : 'Cancion no encontrada'})
            }

        })
    })
    .put((req, res) =>{ //Actualizar una cancion
        const cancion = req.body
        if(cancionValida(cancion)){
            cancionDAO.update(req.params.id, cancion, (err, rows, fields) =>{ //Método del DAO (Con un callback)
                //Manejamos la respuesta de la DB
                if(err){
                    console.log(err)
                    res.status(400).json(err)
                    return
                }
                res.status(201).json(rows[1][0])
            })
        }
        else{
            res.status(400).json({Mensaje : 'datos invalidos'})
        }
    })
    .delete((req, res) =>{ //Borrar una cancion
        cancionDAO.setInactive([req.params.id], (err, rows, fields) =>{ //Método del DAO (Con un callback)
            //Manejamos la respuesta de la DB
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(200).json({Mensaje: 'Eliminado'})
        })
    });

function cancionValida(cancion){
    if(cancion.hasOwnProperty('nombreCancion') 
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