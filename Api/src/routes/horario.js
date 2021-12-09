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

module.exports = router