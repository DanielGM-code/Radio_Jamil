const txtCancion = document.getElementById('textFieldCancion')
const resultadosArtista = document.getElementById('resultadosArtista')
const txtArtista = document.getElementById('textFieldArtista')
const resultadosGenero = document.getElementById('resultadosGenero')
const txtGenero = document.getElementById('textFieldGenero')
const resultadosCategoria = document.getElementById('resultadosCategoria')
const txtCategoria = document.getElementById('textFieldCategoria')
const cuerpoTabla = document.getElementById("tablaCuerpo")


function cargarItems(items) {
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
}

//Se ejecuta al cargar la página
window.onload = () =>{
    pedirCanciones().then(canciones => {
        cargarItems(canciones)
    })

    pedirArtistas().then(artistas => {
        return artistas.map(artista => {
            return artista.nombre
        })
    })
    .then(artistas => {
        txtArtista.addEventListener('input', evento =>{
            autocompletar(artistas, evento.target.value, resultadosArtista)
        })

        resultadosArtista.addEventListener('click', evento => {
            clickCompletar(txtArtista, resultadosArtista, evento)
        })  
    }) 
    
    pedirGeneros().then(generos => {
        return generos.map(genero => {
            return genero.nombre
        })
    })
    .then(generos => {
        txtGenero.addEventListener('input', evento =>{
            autocompletar(generos, evento.target.value, resultadosGenero)
        })

        resultadosGenero.addEventListener('click', evento => {
            clickCompletar(txtGenero, resultadosGenero, evento)
        })  
    }) 

    pedirCategorias().then(categorias => {
        return categorias.map(categorias => {
            return categorias.nombre
        })
    })
    .then(categorias => {
        txtCategoria.addEventListener('input', evento =>{
            autocompletar(categorias, evento.target.value, resultadosCategoria)
        })

        resultadosCategoria.addEventListener('click', evento => {
            clickCompletar(txtCategoria, resultadosCategoria, evento)
        })  
    }) 
}
