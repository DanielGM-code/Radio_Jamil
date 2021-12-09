const btnGenerarProgramacion = document.getElementById('buttonHorarios')

window.onload = () => {
    btnGenerarProgramacion.addEventListener(`click`, event => {
        generarProgramacion()
        window.alert("Horarios Generados")
    })
}