const txtBuscador = document.getElementById('textFieldBuscador')
const btnLimpiarCampo = document.getElementById('buttonLimpiarTextField')

const tablaPatron = document.getElementById('tablaCuerpoPatron')
const txtPatron = document.getElementById('nombrePatron')

const txtCategoria = document.getElementById('textFieldCategoria')
const resultadosCategoria = document.getElementById('resultadosCategoria')
const bntCategoria = document.getElementById('buttonAgregarCategoria')
const tablaCategorias = document.getElementById('tablaCuerpoCateria')

const btnCancelar = document.getElementById('buttonCancelar')
const btnAceptar = document.getElementById('buttonRegistrar')
const btnEliminar = document.getElementById('buttonEliminar')

var categoriaSeleccionada = 0
var categoriasPatron = []
var patronSeleccionado = {
    id: 0,
    nombre: ''
}

function cargarItems(items) {
    tablaPatron.innerHTML = ''

    items.forEach( item => {
        var fila = tablaPatron.insertRow();

        var nombre = fila.insertCell(0);
        nombre.innerHTML = item.nombre;

        fila.setAttribute('onclick',`clickFila(${item.id})`)
    })
}

function clickFila(id){
    patronSeleccionado.id = id
    btnEliminar.style.display = 'block'
    btnCancelar.style.display = 'block'
    
    pedirPatron(id).then(patron =>{
        patronSeleccionado.nombre = patron.nombre;
        txtPatron.value = patron.nombre
        return patron.id
    })
    .then(id => obtenerCategoriaPatron(id))
    .then(categorias => {
        cargarTablaCategoria(categorias)
        categoriasPatron = categorias
    })
    .then(() => {
        btnCancelar.value = '  Limpiar'
        btnAceptar.value = '  Guardar'
    })
}

function buscarEnTabla(array, buscar){
    seleccionados = []

    if(buscar){
        seleccionados = array.filter(patron => 
            patron.nombre.toLowerCase().includes(buscar.toLowerCase()) 
        )
    }

    if(seleccionados.length > 0){ 
        cargarItems(seleccionados)
    }
    else{
        cargarItems(array)
    }
}

function reiniciarCampos(){
    btnEliminar.style.display = 'none'

    patronSeleccionado.id = 0
    patronSeleccionado.nombre = 0

    txtPatron.value = ''
    categoriasPatron = []
    patronSeleccionado = {
        id: 0,
        nombre: ''
    }
    cargarTablaCategoria(categoriasPatron)

    btnCancelar.value = '  Cancelar'
    btnAceptar.value = '  Registrar'
}

function guardarPatron(){
    patronSeleccionado.nombre = txtPatron.value

    if(patronSeleccionado.nombre === ''
    || categoriasPatron.length === 0){
        window.alert("Los campos no pueden estar vacíos. Favor de verificar")
    }
    else{
        agregarPatron(patronSeleccionado).then(respuesta => 
            guardarCategoriaPatron(respuesta.id, categoriasPatron))
        .then(respuesta => {
            if(patronSeleccionado.id === 0){
                window.alert("El patrón se ha registrado correctamente")
            }
            else{
                window.alert("Se han guardado los cambios a patrón.")
            }
            window.location.reload(true)
        })
    }
}

function borrarPatron(){
    if(patronSeleccionado.id > 0){
        eliminarPatron(patronSeleccionado.id)
            .then(respuesta => {
                if(respuesta){
                    window.alert("El patrón se ha borrado exitosamente.")
                }
                window.location.reload(true)
            })
    }
}

function quitarCategoria(id){
    categoriasPatron.splice(id, 1)
    cargarTablaCategoria(categoriasPatron)
    console.log(categoriasPatron)
}

function cargarTablaCategoria(items){
    tablaCategorias.innerHTML = ''
    for(var cont = 0; cont < items.length; cont++){
        var fila = tablaCategorias.insertRow()
        var celda = fila.insertCell(0);
        celda.innerHTML = items[cont].nombre;
    
        fila.setAttribute('onclick',`quitarCategoria(${cont})`)
    }
}

function agregarCategoriaPatron(id){
    if(categoriaSeleccionada !== 0){
        pedirCategoria(id).then(categoria => {
            txtCategoria.value = ''
            categoriaSeleccionada = 0
    
            categoriasPatron.push(categoria)
            cargarTablaCategoria(categoriasPatron)
        })
    }
}

window.onload = () =>{
    pedirPatrones().then(patrones =>{
        return patrones.sort((x, y) =>{
            if(x.nombre < y.nombre){
                return -1
            }
            if(x.nombre > y.nombre){
                return 1
            }
            return 0
        })
    })  
    .then(patrones => {       
        cargarItems(patrones)
        txtBuscador.addEventListener('input', evento =>{
            buscarEnTabla(patrones, evento.target.value)
        })
        btnLimpiarCampo.addEventListener('click', evento => {
            txtBuscador.value = ''
            buscarEnTabla(patrones, evento.target.value)
        })
    })

    pedirCategorias().then(categorias => {
        txtCategoria.addEventListener('input', evento =>{
            categoriaSeleccionada = 0
            if(evento.target.value){
                autocompletar(categorias, evento.target.value, resultadosCategoria, 'categoriaSeleccionada')
            }
            else{
                resultadosCategoria.style.display = 'none'
            }
        }) 
    })

    resultadosCategoria.addEventListener('click', evento => {
        clickCompletar(txtCategoria, resultadosCategoria, evento)
    }) 

    bntCategoria.addEventListener('click', evento => {
        agregarCategoriaPatron(categoriaSeleccionada)
    })

    btnCancelar.addEventListener('click', evento => {
        reiniciarCampos()
    })

    btnAceptar.addEventListener('click', evento => {
        guardarPatron()
    })

    btnEliminar.addEventListener('click', evento => {
        borrarPatron()
    })
}