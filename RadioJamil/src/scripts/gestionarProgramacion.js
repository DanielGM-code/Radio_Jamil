const txtBuscadorHorario = document.getElementById('textFieldBuscadorHorario')
const tablaHorario = document.getElementById('tablaCuerpoHorarios')
const btnLimpiarTxtHorario = document.getElementById('buttonLimpiarTextFieldHorario')

const txtBuscadorCancion = document.getElementById('textFieldBuscadorCancion')
const tablaCancion = document.getElementById('tablaCuerpoCanciones')
const btnLimpiarTxtCancion = document.getElementById('buttonLimpiarTextFieldCancion')

const txtCancionSeleccionada = document.getElementById('textFieldCancionSeleccionada')
const txtCancion = document.getElementById('textFieldCancion')
const resultadosCancion = document.getElementById('resultadosCancion')
const btnCambiar = document.getElementById('buttonCambiar')

window.onload = () => {
    pedirHorarios().then(horarios => {
        cargarItemsHorario(horarios)
        txtBuscadorHorario.addEventListener('input', evento => {
            buscarEnTablaHorario(horarios, evento.target.value)
        })
        btnLimpiarTxtHorario.addEventListener('click', evento => {
            txtBuscadorHorario.value = ''
            buscarEnTablaHorario(horarios, evento.target.value)
        })
    })
    

    pedirCanciones().then(canciones => {
        txtCancion.addEventListener('input', evento => {
            if (evento.target.value) {
                autocompletar(canciones, evento.target.value, resultadosCancion, 'idCancionReemplazo')
            }
            else {
                resultadosCancion.style.display = 'none'
            }
        })
        
    })

    resultadosCancion.addEventListener('click', evento => {
        clickCompletar(txtCancion, resultadosCancion, evento)
    })

    btnCambiar.addEventListener('click', event => {
        if (validarCampos()) {
            actualizacion = {
                idHorario : horarioSeleccionado.id,
                idCancionActual : cancionSeleccionada.id,
                idCancionReemplazo : idCancionReemplazo
            }
            actualizarHorarioCancion(actualizacion)
            limpiarCampos()
            window.alert("Registro actualizado")
            window.location.reload(true)
        }
        else {
            window.alert("Asegúrese de Seleccionar un horario, una cancion y especificar una cancion de reemplazo.")
        }
        
    })

    
}

var idCancionReemplazo = 0

var horarioSeleccionado = {
    id: 0,
    idPrograma: 0,
    idPatron: 0,
    dia: "",
    hora: ""
}

var cancionSeleccionada = {
    id: 0,
    nombre: '',
    idArtista: 0,
    idGenero: 0,
    idCategoria: 0,
    nombreArtista: '',
    nombreGenero: '',
    nombreCategoria: ''
}

function cargarItemsHorario(horarios) {
    tablaHorario.innerHTML = ''
    horarios.forEach(horario => {
        var fila = tablaHorario.insertRow()
        var programa = fila.insertCell(0)
        programa.innerHTML = horario.nombrePrograma
        var dia = fila.insertCell(1)
        dia.innerHTML = horario.dia
        var hora = fila.insertCell(2)
        hora.innerHTML = horario.hora

        fila.setAttribute('onclick', `clickFilaHorario(${horario.id})`)
    })
}

function clickFilaHorario(idHorario) {
    horarioSeleccionado.id = idHorario
    pedirCancionesHorario(idHorario).then(canciones => {
        cargarItemsCancion(canciones)
        txtBuscadorCancion.addEventListener('input', evento => {
            buscarEnTablaCancion(canciones, evento.target.value)
        })
        btnLimpiarTxtCancion.addEventListener('click', evento => {
            txtBuscadorCancion.value = ''
            buscarEnTablaCancion(canciones, evento.target.value)
        })
    })
}



function cargarItemsCancion(canciones) {
    console.log(canciones)
    tablaCancion.innerHTML = ''
    canciones.forEach(cancion => {
        var fila = tablaCancion.insertRow()
        var nombre = fila.insertCell(0)
        nombre.innerHTML = cancion.nombre
        var artista = fila.insertCell(1)
        artista.innerHTML = cancion.nombreArtista

        fila.setAttribute('onclick', `clickFilaCancion(${cancion.id})`)
    })

    
}

function clickFilaCancion(idCancion) {
    cancionSeleccionada.id = idCancion
    pedirCancion(idCancion).then(cancion => {
        cancionSeleccionada.nombre = cancion.nombre
        cancionSeleccionada.idArtista = cancion.idArtista
        cancionSeleccionada.idGenero = cancion.idGenero
        cancionSeleccionada.idCategoria = cancion.idCategoria

        txtCancionSeleccionada.value = cancionSeleccionada.nombre

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
        console.log(seleccionados)
        cargarItemsHorario(seleccionados)
    }
    else {
        cargarItemsHorario(array)
    }
}

function buscarEnTablaCancion(array, buscar) {
    seleccionados = []

    if(buscar){
        seleccionados = array.filter(cancion => 
            cancion.nombre.toLowerCase().includes(buscar.toLowerCase()) 
            ||
            cancion.nombreArtista.toLowerCase().includes(buscar.toLowerCase()) 
        )
    }

    if(seleccionados.length > 0){ 
        console.log(seleccionados)
        cargarItemsCancion(seleccionados)
    }
    else{
        cargarItemsCancion(array)
    }
}

function limpiarCampos() {
    txtCancion.value = ''
    txtCancionSeleccionada.value = ''
    cargarItemsHorario([])
    cargarItemsCancion([])
    idCancionReemplazo = 0
    horarioSeleccionado.id = 0
    cancionSeleccionada.id = 0
}

function validarCampos() {
    return idCancionReemplazo !== 0
        && horarioSeleccionado.id !== 0
        && cancionSeleccionada.id !== 0
}