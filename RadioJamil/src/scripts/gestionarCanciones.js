//Esto va para otro archivo encargado de hacer peticiones
async function pedirCanciones(){
    const respuesta = await fetch('http://192.168.1.65:2610/canciones');
    const jsonCanciones = await respuesta.json();
    
    return jsonCanciones
}

async function pedirCancion(id){
    const respuesta = await fetch(`http://192.168.1.65:2610/canciones/${id}`);
    const jsonCanciones = await respuesta.json();
    
    return jsonCanciones
}

//Codigo
function cargarItems(items) {
    const cuerpoTabla = document.getElementById("tablaCuerpo");
    items.forEach( item => {
        var fila = cuerpoTabla.insertRow();

        var nombre = fila.insertCell(0);
        nombre.innerHTML = item.idCancion;
        var nombre = fila.insertCell(1);
        nombre.innerHTML = item.nombreCancion;
        var artista = fila.insertCell(2);
        artista.innerHTML = item.idArtista;

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
        txtArtista.value = cancion.idArtista
        txtGenero.value = cancion.idGenero
        txtCategoria.value = cancion.idCategoria
    })
}

//Se ejecuta al cargar la página
window.onload = () =>{
    pedirCanciones().then(x => {
        cargarItems(x)
    })
}