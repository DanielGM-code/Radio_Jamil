const btn = document.getElementById('buttonGenerarReporte')

btn.addEventListener('click', evento => {
    generarReportes().then(() => window.alert('Los reportes se han actualizado'))
})