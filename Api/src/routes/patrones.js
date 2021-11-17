const express = require("express");
const path = require('path');
const router = express.Router();

const patronDAO = require(path.join(path.resolve(__dirname, '..'), 'dataAccess', 'patronDAO.js'))

router.route('/patrones')
    .get((req, res) =>{ 
        patronDAO.getAll((err, rows, fields) =>{
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(200).json(rows[0])
        })
    })
    .post((req, res) =>{
        const patron = req.body
        if(patronValido(patron)){
            patronDAO.add(patron, (err, rows, fields) =>{
                if(err){
                    console.log(err)
                    res.status(400).json(err)
                    return
                }
                res.status(201).json({Mensaje : 'Patron agregado'})
            })
        }
        else{
            res.status(400).json({Mensaje : 'datos invalidos'})
        }
    });

router.route('/patrones/:id')
    .get((req, res) =>{
        patronDAO.get(req.params.id,(err, rows, fields) =>{
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            if(rows[0][0]){
                res.status(200).json(rows[0][0])
            }
            else{
                res.status(404).json({Message : 'patron no encontrada'})
            }

        })
    })
    .put((req, res) =>{ 
        const patron = req.body
        if(patronValido(patron)){
            patronDAO.update(req.params.id, patron, (err, rows, fields) =>{
                if(err){
                    console.log(err)
                    res.status(400).json(err)
                    return
                }
                res.status(201).json({Mensaje : 'Patron actualizado'})
            })
        }
        else{
            res.status(400).json({Mensaje : 'datos invalidos'})
        }
    })
    .delete((req, res) =>{
        patronDAO.setInactive([req.params.id], (err, rows, fields) =>{
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            res.status(200).json({Mensaje: 'Eliminado'})
        })
    });

function patronValido(patron){
    if(patron.hasOwnProperty('nombrePatron')){
        return true
    }
    return false
}

module.exports = router