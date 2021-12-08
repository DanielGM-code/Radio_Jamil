const express = require("express");
const path = require('path');
const router = express.Router();

const programacionDAO = require(path.join(path.resolve(__dirname, '..'), 'dataAccess', 'programacionDAO.js'))//Conexión al DAO, maneja la conexión a DB y sentencia SQL

router.route('/programaciones')
    .get((req, res) =>{ //Obtener TODAS las programaciones
        programacionDAO.getAll((err, rows, fields) =>{ //Método del DAO (Con un callback)
            //Manejamos la respuesta de la DB
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(200).json(rows[0])
        })
    })

    .post((req, res) =>{ //Insertar una programacion
        const programacion = req.body
        if(programacion.hasOwnProperty('nombre')){ //Verificamos que lo que recibimos sea lo que necesitamos
            programacionDAO.add(programacion, (err, rows, fields) =>{ //Método del DAO (Con un callback)
            //Manejamos la respuesta de la DB
                if(err){
                    console.log(err)
                    res.status(400).json(err)
                    return
                }
                res.status(201).json({Mensaje : 'programación agregada'})
            })
        }
        else{
            res.status(400).json({Mensaje : 'datos invalidos'})
        }
    });

router.route('/programaciones/:id')
    .get((req, res) =>{ //Obtener UNA SOLA programacion
        programacionDAO.get(req.params.id,(err, rows, fields) =>{ //Método del DAO (Con un callback)
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
                res.status(404).json({Mensaje : 'programacion no encontrada'})
            }

        })
    })

    .put((req, res) =>{ //Actualizar una programacion
        const programacion = req.body
        if(programacion.hasOwnProperty('nombre') && programacion.hasOwnProperty('estado')){
            programacionDAO.update(req.params.id, programacion, (err, rows, fields) =>{ //Método del DAO (Con un callback)
                //Manejamos la respuesta de la DB
                if(err){
                    console.log(err)
                    res.status(400).json(err)
                    return
                }
                res.status(201).json({Mensaje : 'programacion actualizada'})
            })
        }
        else{
            res.status(400).json({Mensaje : 'datos invalidos'})
        }
    })

    .delete((req, res) =>{ //Borrar una programacion
        programacionDAO.setInactive([req.params.id], (err, rows, fields) =>{ //Método del DAO (Con un callback)
            //Manejamos la respuesta de la DB
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(200).json({Mensaje: 'Eliminado'})
        })
    });

    module.exports = router