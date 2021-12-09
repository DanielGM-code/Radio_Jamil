const express = require("express")
const path =  require("path")
const router = express.Router()

const horarioDAO = require(path.join(path.resolve(__dirname, '..'), 'dataAccess', 'horarioDAO.js'))

router.route('/horarios')
    .get((req, res) => {
        horarioDAO.obtenerTodos((err, respuesta) => {
            if (err) {
                console.log(err)
                res.status(400).json(err)
            }
            res.status(200).json(respuesta)
        })
    })
    .patch((req, res) => {
        var data = req.body
        horarioDAO.actualizarCancionHorario(data.idHorario, data.idCancionActual, data.idCancionReemplazo, (err, respuesta) => {
            if (err) {
                console.log(err)
                res.status(400).json(err)
            }
            res.status(200).json({Mensaje : "Registro actualizado."})
        })
    })
    .post((req, res) => {
        var data = req.body
        horarioDAO.guardar(data.id, data.dia, data.hora, data.idPrograma, data.idPatron, (err, respuesta) => {
            if (err) {
                console.log(err)
                res.status(400).json(err)
            }
            res.status(201).json({Mensaje : "Registro exitoso."})
        })
    })

router.route('/horarios/:id')
    .get((req, res) => {
        horarioDAO.obtenerHorario(req.params.id, (err, respuesta) => {
            if (err) {
                console.log(err)
                res.status(400).json(err)
            }
            res.status(200).json(respuesta)
        })
    })
    .delete((req, res) => {
        horarioDAO.eliminar(req.params.id, (err, respeusta) => {
            if (err) {
                console.log(err)
                res.status(400).json(err)
            }
            res.status(200).json({Mensaje : "Registro eliminado"})
        })
    })

    
module.exports = router