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
    nombreArtista: '',
    nombreGenero: '',
    nombreCategoria: ''
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
    btnCancelar.style.display = 'block'

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
    btnCancelar.style.display = 'none'

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
    cancionSeleccionada.nombreArtista = txtArtista.value
    cancionSeleccionada.nombreGenero = txtGenero.value
    cancionSeleccionada.nombreCategoria = txtCategoria.value

    if(cancionSeleccionada.nombre === '' 
    || cancionSeleccionada.nombreArtista === '' 
    || cancionSeleccionada.nombreGenero === '' 
    || cancionSeleccionada.nombreCategoria === ''){
        window.alert("Los campos no pueden estar vacíos. Favor de verificar")
    }
    else{
        agregarCancion(cancionSeleccionada)
        window.location.reload(true)
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
            cancionSeleccionada.idArtista = 0
            if(evento.target.value){
                autocompletar(artistas, evento.target.value, resultadosArtista, 'cancionSeleccionada.idArtista')
            }
            else{
                resultadosArtista.style.display = 'none'
            }
        })
    }) 
    
    pedirGeneros().then(generos => {
        txtGenero.addEventListener('input', evento =>{
            cancionSeleccionada.generos = 0
            if(evento.target.value){
                autocompletar(generos, evento.target.value, resultadosGenero, 'cancionSeleccionada.idGenero')
            }
            else{
                resultadosGenero.style.display = 'none'
            }
        })
    }) 

    pedirCategorias().then(categorias => {
        txtCategoria.addEventListener('input', evento =>{
            cancionSeleccionada.idCategoria = 0
            if(evento.target.value){
                autocompletar(categorias, evento.target.value, resultadosCategoria, 'cancionSeleccionada.idCategoria')
            }
            else{
                resultadosCategoria.style.display = 'none'
            }
        }) 
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
