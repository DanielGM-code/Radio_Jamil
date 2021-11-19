async function pedirCanciones(){
    const respuesta = await fetch('http://192.168.1.65:2610/canciones');
    const jsonCanciones = await respuesta.json();
    
    return jsonCanciones
}

function cargarItems(items) {
    const cuerpoTabla = document.getElementById("tablaCuerpo");
    items.forEach( item => {
        var fila = cuerpoTabla.insertRow();

        var nombre = fila.insertCell(0);
        nombre.innerHTML = item.nombreCancion;
        var artista = fila.insertCell(1);
        artista.innerHTML = item.idArtista;
    })
}

cargarItems([{
    nombreCancion : 'Oninoninoninoninoni',
    idArtista : 'Oliverio Arbol'
}])

pedirCanciones().then(x => console.log(x))