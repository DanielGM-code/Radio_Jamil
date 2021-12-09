const express = require('express')
const path = require('path')
const router = express.Router()
const programaDAO = require(path.join(path.resolve(__dirname, '..'), 'dataAccess', 'programaDAO.js'))

router.route('/programas')
    .get((req, res) => {
        programaDAO.obtenerTodos((err, respuesta) => {
            if (err) {
                console.log(err)
                res.status(400).json(err)
            }
            res.status(200).json(respuesta)
        })
    })
    .post((req, res) => {
        var data = req.body
        programaDAO.guardar(data.id, data.nombre, data.descripcion, (err, respuesta) => {
            if (err) {
                console.log(err)
                res.status(400).json(err)
            }
            res.status(201).json({Mensaje : "Registro realizado."})
        })
    })
router.route('/programas/:id')
    .get((req, res) => {
        programaDAO.obtenerPrograma(req.params.id, (err, respuesta) => {
            if (err) {
                console.log(err)
                res.status(400).json(err)
            }
            res.status(200).json(respuesta)
        })
    })
    .delete((req, res) => {
        programaDAO.eliminar(req.params.id, (err, respuesta) => {
            if (err) {
                console.log(err)
                res.status(400).json(err)
            }
            res.status(200).json({Mensaje : "Registro eliminado."})
        })
    })
    
module.exports = router