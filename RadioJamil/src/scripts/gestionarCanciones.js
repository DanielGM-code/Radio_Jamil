const txtBuscador = document.getElementById('textFieldBuscador')

const txtCancion = document.getElementById('textFieldCancion')
const resultadosArtista = document.getElementById('resultadosArtista')
const txtArtista = document.getElementById('textFieldArtista')
const resultadosGenero = document.getElementById('resultadosGenero')
const txtGenero = document.getElementById('textFieldGenero')
const resultadosCategoria = document.getElementById('resultadosCategoria')
const txtCategoria = document.getElementById('textFieldCategoria')
const cuerpoTabla = document.getElementById('tablaCuerpo')

const btnCancelar = document.getElementById('buttonCancelar')
const btnAceptar = document.getElementById('buttonRegistrar')
const btnEliminar = document.getElementById('buttonEliminar')

var cancionSeleccionada = {
    id: 0,
    nombre: '',
    idArtista: 0,
    idGenero: 0,
    idCategoria: 0,
    referencia: 0,
    estado: "activo",
    esPeticion: null,
    diasReproduccion: 1234567
}

function cargarItems(items) {
    cuerpoTabla.innerHTML = ''

    items.forEach( item => {
        var fila = cuerpoTabla.insertRow();

        var nombre = fila.insertCell(0);
        nombre.innerHTML = item.nombre;
        var artista = fila.insertCell(1);
        artista.innerHTML = item.nombreArtista;

        fila.setAttribute('onclick',`clickFila(${item.id})`)
    })
}

function clickFila(idCancion){
    cancionSeleccionada.id = idCancion
    btnEliminar.style.display = 'block'

    pedirCancion(idCancion).then(cancion => {
        txtCancion.value = cancion.nombre
        txtArtista.value = cancion.artista.nombre
        txtGenero.value = cancion.nombreGenero
        txtCategoria.value = cancion.nombreCategoria
        
        cancionSeleccionada.nombre = cancion.nombre
        cancionSeleccionada.idArtista = cancion.idArtista
        cancionSeleccionada.idGenero = cancion.idGenero
        cancionSeleccionada.idCategoria = cancion.idCategoria

    })
    .then( () => {
        btnCancelar.value = '  Limpiar'
        btnAceptar.value = '  Guardar'
    })
}

function buscarEnTabla(array, buscar){
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
        cargarItems(seleccionados)
    }
    else{
        cargarItems(array)
    }
}

function reiniciarCampos(){
    btnEliminar.style.display = 'none'

    txtCancion.value = ''
    txtArtista.value = ''
    txtGenero.value = ''
    txtCategoria.value = ''

    cancionSeleccionada.id = 0
    cancionSeleccionada.idArtista = 0
    cancionSeleccionada.idGenero = 0
    cancionSeleccionada.idCategoria = 0
    cancionSeleccionada.nombre = ''

    btnCancelar.value = '  Cancelar'
    btnAceptar.value = '  Registrar'
}

function guardarCancion(){
    cancionSeleccionada.nombre = txtCancion.value

    if(cancionSeleccionada.id === 0){
        agregarCancion(cancionSeleccionada)
    }
    else{
        editarCancion(cancionSeleccionada)
    }
}

function borrarCancion(){
    if(cancionSeleccionada.id > 0){
        eliminarCancion(cancionSeleccionada.id)
    }
}

//Se ejecuta al cargar la página
window.onload = () =>{
    pedirCanciones().then(canciones => {
        cargarItems(canciones)
        txtBuscador.addEventListener('input', evento =>{
            buscarEnTabla(canciones, evento.target.value)
        })
    })

    pedirArtistas().then(artistas => {
        txtArtista.addEventListener('input', evento =>{
            if(evento.target.value){
                autocompletar(artistas, evento.target.value, resultadosArtista, 'cancionSeleccionada.idArtista')
            }
            else{
                cancionSeleccionada.idArtista = 0
            }
        })
    }) 
    
    pedirGeneros().then(generos => {
        txtGenero.addEventListener('input', evento =>{
            if(evento.target.value){
                autocompletar(generos, evento.target.value, resultadosGenero, 'cancionSeleccionada.idGenero')
            }
            else{
                cancionSeleccionada.idGenero = 0
            }
        })
    }) 

    pedirCategorias().then(categorias => {
        txtCategoria.addEventListener('input', evento =>{
            if(evento.target.value){
                autocompletar(categorias, evento.target.value, resultadosCategoria, 'cancionSeleccionada.idCategoria')
            }
            else{
                cancionSeleccionada.idCategoria = 0
            }
        }) 
    })

    txtCancion.addEventListener('input', evento =>{
        if(!evento.target.value){
            cancionSeleccionada.id = 0
        }
    })
        
    resultadosGenero.addEventListener('click', evento => {
        clickCompletar(txtGenero, resultadosGenero, evento)
    })  

    resultadosArtista.addEventListener('click', evento => {
        clickCompletar(txtArtista, resultadosArtista, evento)
    })  

    resultadosCategoria.addEventListener('click', evento => {
        clickCompletar(txtCategoria, resultadosCategoria, evento)
    }) 

    btnCancelar.addEventListener('click', evento => {
        reiniciarCampos()
    })

    btnAceptar.addEventListener('click', evento => {
        guardarCancion()
    })

    btnEliminar.addEventListener('click', evento => {
        borrarCancion()
    })
}
