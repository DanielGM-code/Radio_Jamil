const express = require('express')
const path = require('path')
const PDFDocument = require("pdfkit")
const fs = require("fs");
const router = express.Router()

const pathPadre = path.resolve(__dirname, '..')
const directrioPdf = path.join(pathPadre, 'pdf')
const cancionDAO = require(path.join(pathPadre, 'dataAccess', 'cancionDAO.js'))

function crearPDF(datos, path, nombreReporte) {
    var doc = new PDFDocument({ size: "A4", margin: 50 });
  
    doc
      .fontSize(20)
      .text(nombreReporte, 50, 300, { align: "center" })

    doc.addPage()
    crearTablaCanciones(doc, datos);
    
    doc.end();
    doc.pipe(fs.createWriteStream(path));   
  }

function crearTablaCanciones(doc, datos) {
    let i;
    const y = 30;
  
    doc.font("Helvetica-Bold");
    agregarColumna(doc, y, {
        nombre: "Nombre",
        nombreArtista: "Artista",
        Genero: "Genero",
        Categoria: "Categoria"
    })
    crearLinea(doc, y + 20);
    doc.font("Helvetica");
  
    for (i = 0; i < datos.length; i++) {
        pos = i % 25
        if(pos === 24){
            doc.addPage()
        }
        const item = datos[i];
        const position = y + (pos + 1) * 30;
        agregarColumna(doc, position, item)
    
        crearLinea(doc, position + 20);
    }
}

function crearLinea(doc, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  }

function agregarColumna(doc, y, valores) {
    doc
      .fontSize(10)
      .text(valores.nombre, 50, y)
      .text(valores.nombreArtista, 300, y)
      .text(valores.Genero, 350, y, { width: 90, align: "right" })
      .text(valores.Categoria, 420, y, { width: 90, align: "right" })
  }

router.route('/reportes')
    .post((req, res) =>{ 
        cancionDAO.obtenerReporte((err, respuesta) =>{ 
            if(err){
                console.log(err)
                res.status(400).json(err)
                return
            }
            crearPDF(respuesta, path.join(directrioPdf, 'reporteCanciones.pdf'), 'REPORTE: Canciones activas')
            res.status(201).json({Mensaje : "Reportes creados"})
        })
    })


module.exports = router