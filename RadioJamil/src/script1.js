// Carga un sonido a través de su fuente y lo inyecta de manera oculta
const cargarSonido = function (fuente) {
    const sonido = document.createElement("audio");
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
const sonido = cargarSonido("resources/tracks/AmorTumbado.flac");
$botonReproducir.onclick = () => {
    sonido.play();
};
$botonPausar.onclick = () => {
    sonido.pause();
};
$botonReiniciar.onclick = () => {
    sonido.currentTime = 0;
	sonido.play();
};