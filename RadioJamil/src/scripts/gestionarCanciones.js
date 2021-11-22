function cargarItems(items) {
    const cuerpoTabla = document.getElementById("tablaCuerpo");
    items.forEach( item => {
        var fila = cuerpoTabla.insertRow();

        var nombre = fila.insertCell(0);
        nombre.innerHTML = item.nombreCancion;
        var artista = fila.insertCell(1);
        artista.innerHTML = item.nombreArtista;

        fila.setAttribute('onclick',`clickFila(${item.idCancion})`)
    })
}

function clickFila(idCancion){
    var txtCancion = document.getElementById('textFieldCancion')
    var txtArtista = document.getElementById('textFieldArtista')
    var txtGenero = document.getElementById('textFieldGenero')
    var txtCategoria = document.getElementById('textFieldCategoria')

    pedirCancion(idCancion).then(cancion => {
        txtCancion.value = cancion.nombreCancion
        txtArtista.value = cancion.artista.nombre
        txtGenero.value = cancion.nombreGenero
        txtCategoria.value = cancion.nombreCategoria
    })
}

//Se ejecuta al cargar la página
window.onload = () =>{
    pedirCanciones().then(x => {
        cargarItems(x)
    })
}