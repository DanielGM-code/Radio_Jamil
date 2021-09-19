let listaCanciones = ["El Drip - Natanael Cano", "Amor tumbado - Natanael Cano", "El triste - José José",
                "Life Goes On - Oliver Tree", "Oops! - Britney Spears", 
                "Que maldición - BandaMS ft. SnoopDog"];

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
const $botonReproducir = document.querySelector("#buttonReproducir"),
    $botonPausar = document.querySelector("#buttonPausar");
    
// La cancion que podemos reproducir o pausar
var numeroDeCancion = 0;
var numeroCanciones = listaCanciones.length;
var nombreCancion = obtenerCancion(numeroDeCancion);
var cancion = cargarCancion("resources/tracks/" + nombreCancion + ".flac");

$botonReproducir.onclick = () => {
    cancion.pause();
    nombreCancion = obtenerCancion(numeroDeCancion);
    cancion = cargarCancion("resources/tracks/" + nombreCancion + ".flac");
    cancion.play();

    if(numeroDeCancion < numeroCanciones){
        numeroDeCancion += 1;
    }else{
        numeroDeCancion = 0;
    }
};

$botonPausar.onclick = () => {
    cancion.pause();
};

function obtenerCancion(numeroDeCancion) {
    let cancionObtenida = listaCanciones[numeroDeCancion];

    return cancionObtenida;
}