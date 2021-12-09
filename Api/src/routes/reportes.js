const express = require('express')
const path = require('path')
const PDFDocument = require("pdfkit")
const fs = require("fs");
const router = express.Router()

const pathPadre = path.resolve(__dirname, '..')
const directrioPdf = path.join(pathPadre, 'pdf')
const cancionDAO = require(path.join(pathPadre, 'dataAccess', 'cancionDAO.js'))
const patronDAO = require(path.join(pathPadre, 'dataAccess', 'patronDAO.js'))
const programaDAO = require(path.join(pathPadre, 'dataAccess', 'programaDAO.js'))

function crearPDFCanciones(datos, path, nombreReporte) {
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
    agregarColumnaCanciones(doc, y, {
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
        agregarColumnaCanciones(doc, position, item)
    
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

function agregarColumnaCanciones(doc, y, valor) {
    doc
      .fontSize(10)
      .text(valor.nombre, 50, y)
      .text(valor.nombreArtista, 300, y)
      .text(valor.Genero, 350, y, { width: 90, align: "right" })
      .text(valor.Categoria, 420, y, { width: 90, align: "right" })
  }

function crearPDFPatrones(datos, path, nombreReporte, campo1, campo2) {
    var doc = new PDFDocument({ size: "A4", margin: 50 });
  
    doc
      .fontSize(20)
      .text(nombreReporte, 50, 300, { align: "center" })

    doc.addPage()
    crearTablaPatron(doc, datos, campo1, campo2);
    
    doc.end();
    doc.pipe(fs.createWriteStream(path));   
  }

function agregarColumnaPatron(doc, y, valor) {
    doc
      .fontSize(10)
      .text(valor.col1, 50, y)
      .text(valor.col2, 300, y)
}

function crearTablaPatron(doc, datos, col1, col2) {
    let i;
    const y = 30;
  
    doc.font("Helvetica-Bold");
    agregarColumnaPatron(doc, y, {
        col1,
        col2,
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
        agregarColumnaPatron(doc, position, item)
    
        crearLinea(doc, position + 20);
    }
}

function ordenarCanciones(x, y){
    if(x.nombre < y.nombre){
        return -1
    }
    if(x.nombre > y.nombre){
        return 1
    }
    return 0
}

function ordenarColumnas(x, y){
    if(x.nombre < y.nombre){
        return -1
    }
    if(x.nombre > y.nombre){
        return 1
    }
    return 0
}

router.route('/reportes')
    .post((req, res) =>{ 
        cancionDAO.obtenerReporteActivas()
            .then(reportes =>{
                return reportes.sort(ordenarCanciones)
            })
            .then(reportes =>{
                crearPDFCanciones(reportes, path.join(directrioPdf, 'cancionesActivas.pdf'), 'REPORTE: Canciones activas')
            })
            .then(() => cancionDAO.obtenerReporteUsadas())
            .then(reportes =>{
                return reportes.sort(ordenarCanciones)
            })
            .then(reportes =>{
                crearPDFCanciones(reportes, path.join(directrioPdf, 'cancionesUtilizadas.pdf'), 'REPORTE: Canciones utilizadas')
            })
            .then(() => cancionDAO.obtenerReporteNoUsadas())
            .then(reportes =>{
                return reportes.sort(ordenarCanciones)
            })
            .then(reportes =>{
                crearPDFCanciones(reportes, path.join(directrioPdf, 'cancionesNoUtilizadas.pdf'), 'REPORTE: Canciones no utilizadas')
            })
            .then(() => patronDAO.obtenerReporte())
            .then(reportes =>{
                return reportes.sort(ordenarColumnas)
            })
            .then(reportes =>{
                crearPDFPatrones(reportes, path.join(directrioPdf, 'Patrones.pdf'), 'REPORTE: Patrones', 'Patron', 'Categoria')
            })
            .then(() => programaDAO.obtenerReporte())
            .then(reportes =>{
                return reportes.sort(ordenarColumnas)
            })
            .then(reportes =>{
                crearPDFPatrones(reportes, path.join(directrioPdf, 'Programas.pdf'), 'REPORTE: Programas', 'Programa', 'Cancion')
            })
            .then(()=> res.status(201).json({Mensaje : "Reportes creados"}))
            .catch(err => res.status(400).json(err))
    })


module.exports = router