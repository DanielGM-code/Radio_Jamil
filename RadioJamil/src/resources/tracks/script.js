// Carga un sonido a través de su fuente y lo inyecta de manera oculta
const cargarSonido = function (fuente) {
    var sonido = document.createElement("audio");
    sonido.src = fuente;
    sonido.setAttribute("preload", "auto");
    sonido.setAttribute("controls", "none");
    sonido.style.display = "none"; // <-- oculto
    document.body.appendChild(sonido);
    return sonido;
};
const $botonReproducir = document.querySelector("#buttonReproducir"),
    $botonPausar = document.querySelector("#buttonPausar"),
    $botonReiniciar = document.querySelector("#buttonReiniciar");
    
// El sonido que podemos reproducir o pausar
var cancion = cancionAleatoria(1, 7).toString();
var sonido = cargarSonido(cancion + ".flac");
$botonReproducir.onclick = () => {
    sonido.pause();
    cancion = cancionAleatoria(1, 7).toString();
    sonido = cargarSonido(cancion + ".flac");
    sonido.play();
};
$botonPausar.onclick = () => {
    sonido.pause();
};

function cancionAleatoria(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}