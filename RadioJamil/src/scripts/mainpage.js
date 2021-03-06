let listaCanciones = ["Life Goes On - Oliver Tree", "El Drip - Natanael Cano",
					  "El triste - José José", 
					  "Oops! - Britney Spears",
					  "Amor tumbado - Natanael Cano",
               		  "Que maldición - BandaMS ft. Snoop Dogg"];

// Carga una canción a través de su fuente y lo inyecta de manera oculta
const cargarCancion = function (fuente) {
    var cancion = document.createElement("audio");
    cancion.src = fuente;
    cancion.setAttribute("preload", "auto");
    cancion.setAttribute("controls", "none");
    cancion.style.display = "none"; // <-- oculto
    document.body.appendChild(cancion);
    return cancion;
};

// Tengo acceso al botón mediante su id
const btnReproducir = document.querySelector("#buttonReproducir");
    
// La cancion que podemos reproducir o pausar
// TO DO: Canciones random? 
var numeroDeCancion = 0;
var numeroCanciones = listaCanciones.length;
var nombreCancion = obtenerCancion(numeroDeCancion);
var cancion = cargarCancion(`resources/tracks/${nombreCancion}.flac`);

btnReproducir.onclick = () => {
	// Primero se pausa la canción para que no se reproduzcan dos o más al mismo tiempo
    cancion.pause();
    nombreCancion = obtenerCancion(numeroDeCancion);
    cancion = cargarCancion(`resources/tracks/${nombreCancion}.flac`);
    cancion.volume = 0.2;
    cancion.play();
	
    //Actualizamos nombre de la canción:
    document.getElementById("labelNombreCancion").innerHTML = nombreCancion;

	// Si llego a la última canción, regreso a la primera
    if(numeroDeCancion < numeroCanciones-1){
        numeroDeCancion += 1;
    }else{
        numeroDeCancion = 0;
    }
};

function obtenerCancion(numeroDeCancion) {
    let cancionObtenida = listaCanciones[numeroDeCancion];

    return cancionObtenida;
}