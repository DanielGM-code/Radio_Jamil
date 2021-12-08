function autocompletar(array, buscar, listaHTML, tipo){
    listaHTML.innerHTML = ''
    var seleccionados = []  

    if(buscar){
        seleccionados = array.filter(elemento => elemento.nombre.toLowerCase().includes(buscar.toLowerCase()))
    }

    if(seleccionados.length > 0){
        seleccionados.map(item => listaHTML.innerHTML += `<p class="contenido-dropdown" onclick="${tipo}=${item.id}">${item.nombre}</p>`)
        listaHTML.style.display = 'block'
    }
}

function clickCompletar(txtInput, cajaResultado, evento){
    if(evento.target && evento.target.nodeName == 'P'){
        txtInput.value = evento.target.innerHTML
        cajaResultado.innerHTML = ''
        cajaResultado.style.display = 'none'
    }
}