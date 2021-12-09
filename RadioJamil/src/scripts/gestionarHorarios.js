const txtBuscadorHorario = document.getElementById('textFieldBuscadorHorario')
const btnLimpiarTxtHorario = document.getElementById('buttonLimpiarTextFieldHorario')
const tablaHorarios = document.getElementById('cuerpoTablaHorarios')
const txtDia = document.getElementById('textFieldDia')
const txtHora = document.getElementById('textFieldHora')
const txtNombrePrograma = document.getElementById('textFieldNombrePrograma')
const btnEliminarHorario = document.getElementById('buttonEliminarHorario')
const btnRegistrarHorario = document.getElementById('buttonRegistrarHorario')
const resultadosPrograma = document.getElementById('resultadosPrograma')
const txtPatron = document.getElementById('textFieldPatron')
const resultadosPatron = document.getElementById('resultadosPatron')

const txtBuscadorPrograma = document.getElementById('textFieldBuscadorPrograma')
const btnLimpiarTxtPrograma = document.getElementById('buttonLimpiarTextFieldPrograma')
const tablaProgramas = document.getElementById('tablaCuerpoProgramas')
const txtNombre = document.getElementById('textFieldNombre')
const txtDescripcion = document.getElementById('textFieldDescripcion')
const btnElimiarPrograma = document.getElementById('buttonEliminarPrograma')
const btnRegistrarPrograma = document.getElementById('buttonRegistrarPrograma')

var idHorarioSeleccionado = 0
var idProgramaSeleccionado = 0
var idProgramaHorarioSeleccionado = 0
var idPatronSeleccionado = 0

window.onload = () => {
    pedirHorarios().then(horarios => {
        cargarItemsHorario(horarios)
        txtBuscadorHorario.addEventListener('input', event => {
            buscarEnTablaHorario(horarios, event.target.value)
        })
        btnLimpiarTxtHorario.addEventListener('click', event => {
            txtBuscadorHorario.value = ''
            buscarEnTablaHorario(horarios, event.target.value, resultadosPrograma)
        })
    })

    pedirProgramas().then(programas => {
        cargarItemsPrograma(programas)
        txtBuscadorPrograma.addEventListener('input', event => {
            buscarEnTablaPrograma(programas, event.target.value)
        })

        btnLimpiarTxtPrograma.addEventListener('input', event => {
            txtBuscadorPrograma.value = ''
            buscarEnTablaPrograma(programas, event.target.value)
        })

        txtNombrePrograma.addEventListener('input', event => {
            if (event.target.value) {
                autocompletar(programas, event.target.value, resultadosPrograma, 'idProgramaHorarioSeleccionado')
            } else {
                resultadosPrograma.style.display = 'none'
            }
        })
    })

    pedirPatrones().then(patrones => {
        txtPatron.addEventListener(`input`, event => {
            if (event.target.value) {
                autocompletar(patrones, event.target.value, resultadosPatron, 'idPatronSeleccionado')
            }
            else {
                resultadosPatron.style.display = 'none'
            }
        })
    })

    resultadosPrograma.addEventListener(`click`, event => {
        clickCompletar(txtNombrePrograma, resultadosPrograma, event)
    })

    resultadosPatron.addEventListener(`click`, event => {
        clickCompletar(txtPatron, resultadosPatron, event)
    })

    btnElimiarPrograma.addEventListener(`click`, event => {
        if (idProgramaSeleccionado !== 0) {
            eliminarPrograma(idProgramaSeleccionado)
            window.alert("Programa eliminado.")
            window.location.reload(true)
        }
        else {
            window.alert("Asegurese de seleccionar un programa para eliminarlo.")
        }
    })

    btnRegistrarPrograma.addEventListener(`click`, event => {
        if (txtNombre.value !== '') {
            var programa = {
                id : idProgramaSeleccionado,
                nombre : txtNombre.value,
                descripcion : (txtDescripcion.value === "sin descripcion" ? "" : txtDescripcion.value)
            }

            guardarPrograma(programa)
            var mensaje = "El registro se ha realizado con exito."
            if (idProgramaSeleccionado !== 0) { 
                mensaje = "Se ha actualizado la informacion del programa."
            }

            window.alert(mensaje)
            window.location.reload(true)
        }
        else {
            window.alert("El nombre del Programa no puede estar vacio.")
        }
    })

    btnEliminarHorario.addEventListener(`click`, event => {
        if (idHorarioSeleccionado !== 0) {
            eliminarHorario(idHorarioSeleccionado)
            window.alert("Horario eliminado.")
        }
        else {
            window.alert("Debe seleccionar un horario para eliminarlo.")
        }
    })

    btnRegistrarHorario.addEventListener(`click`, event => {
        if (validarHorario()) {
            var horario = {
                id : idHorarioSeleccionado,
                dia : txtDia.value,
                hora : txtHora.value,
                idPrograma : idProgramaHorarioSeleccionado,
                idPatron : idPatronSeleccionado
            }
            guardarHorario(horario)
            var mensaje = "Registro Exitoso"
            if (idHorarioSeleccionado !== 0) {
                mensaje = "Se ha actualizado el horario."
            }
            window.alert(mensaje)
            window.location.reload(true)
        }
        else {
            window.alert("Asegurese de llenar los campos del horario.")
        }
    })

    
}

function cargarItemsHorario(horarios) {
    tablaHorarios.innerHTML = ''
    horarios.forEach(horario => {
        var fila = tablaHorarios.insertRow()
        
        var dia = fila.insertCell(0)
        dia.innerHTML = horario.dia
        var hora = fila.insertCell(1)
        hora.innerHTML = horario.hora
        var programa = fila.insertCell(2)
        programa.innerHTML = horario.nombrePrograma

        fila.setAttribute('onclick', `clickFilaHorario(${horario.id})`)
    })
}

function cargarItemsPrograma(programas) {
    tablaProgramas.innerHTML = ''
    programas.forEach(programa => {
        var fila = tablaProgramas.insertRow()

        var nombre = fila.insertCell(0)
        nombre.innerHTML = programa.nombre

        fila.setAttribute(`onclick`, `clickFilaPrograma(${programa.id})`)
    })
}

function clickFilaHorario(idHorario) {
    idHorarioSeleccionado = idHorario
    pedirHorario(idHorario).then(horario => {
        txtDia.value = horario.dia
        txtHora.value = horario.hora
        txtNombrePrograma.value = horario.nombrePrograma
        txtPatron.value = horario.nombrePatron
    })
}

function clickFilaPrograma(idPrograma) {
    idProgramaSeleccionado = idPrograma
    pedirPrograma(idPrograma).then(programa => {
        txtNombre.value = programa.nombre
        txtDescripcion.value = (programa.descripcion ? programa.descripcion : 'sin descripcion')
    })
}

function buscarEnTablaHorario(array, buscar) {
    seleccionados = []

    if(buscar) {
        seleccionados = array.filter(horario => 
            horario.dia.toLowerCase().includes(buscar.toLowerCase())
            ||
            horario.hora.toLowerCase().includes(buscar.toLowerCase())    
        )
    }

    if(seleccionados.length > 0) {
    }
    else {
        cargarItemsHorario(array)
    }
}

function buscarEnTablaPrograma(array, buscar) {
    seleccionados = []
    if (buscar) {
        seleccionados = array.filter(programa =>
            programa.nombre.toLowerCase().includes(buscar.toLowerCase())    
        )
    }

    if (seleccionados.length > 0) {
        cargarItemsPrograma(seleccionados)
    }
    else {
        cargarItemsPrograma(array)
    }
}

function validarHorario() {
    return txtDia.value !== ""
        && txtHora.value !== ""
        && txtNombrePrograma.value !== ""
        && txtPatron.value !== ""
        && esHora(txtHora.value)
}

function esHora(hora) {
    var regEx = new RegExp('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')
    return regEx.test(hora)
}



