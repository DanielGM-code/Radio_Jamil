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

var esRegistro = true
var idArtista = 0;
var idGenero = 0;
var idCategoria = 0;

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
    pedirCancion(idCancion).then(cancion => {
        txtCancion.value = cancion.nombre
        txtArtista.value = cancion.artista.nombre
        txtGenero.value = cancion.nombreGenero
        txtCategoria.value = cancion.nombreCategoria
    })
    .then( () => {
        esRegistro = false
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

//Se ejecuta al cargar la página
window.onload = () =>{
    pedirCanciones().then(canciones => {
        cargarItems(canciones)
        txtBuscador.addEventListener('input', evento =>{
            buscarEnTabla(canciones, evento.target.value)
        })
    })

    pedirArtistas()/*.then(artistas => {
        return artistas.map(artista => {
            return artista.nombre
        })
    })*/
    .then(artistas => {
        txtArtista.addEventListener('input', evento =>{
            autocompletar(artistas, evento.target.value, resultadosArtista, 'idArtista')
        })

        resultadosArtista.addEventListener('click', evento => {
            clickCompletar(txtArtista, resultadosArtista, evento)
        })  
    }) 
    
    pedirGeneros()/*.then(generos => {
        return generos.map(genero => {
            return genero.nombre
        })
    })*/
    .then(generos => {
        txtGenero.addEventListener('input', evento =>{
            autocompletar(generos, evento.target.value, resultadosGenero, 'idGenero')
        })

        resultadosGenero.addEventListener('click', evento => {
            clickCompletar(txtGenero, resultadosGenero, evento)
        })  
    }) 

    pedirCategorias()/*.then(categorias => {
        return categorias.map(categorias => {
            return categorias.nombre
        })
    })*/
    .then(categorias => {
        txtCategoria.addEventListener('input', evento =>{
            autocompletar(categorias, evento.target.value, resultadosCategoria, 'idCategoria')
        })

        resultadosCategoria.addEventListener('click', evento => {
            clickCompletar(txtCategoria, resultadosCategoria, evento)
        })  
    }) 

    btnCancelar.addEventListener('click', evento => {
        txtCancion.value = ''
        txtArtista.value = ''
        txtGenero.value = ''
        txtCategoria.value = ''

        btnCancelar.value = '  Cancelar'
        btnAceptar.value = '  Registrar'

        esRegistro = true
    })

    btnAceptar.addEventListener('click', evento => {
        if(esRegistro){
            console.log('Voy a registrar')
        }
        else{
            console.log('Estoy editando')
        }
        console.log(idArtista)
        console.log(idGenero)
        console.log(idCategoria)
    })
}
