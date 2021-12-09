const rutaAPI = 'http://localhost:2610'

async function apiGet(subruta){
    var respuesta = await fetch(rutaAPI.concat(subruta));
    return await respuesta.json();
}

function apiPost(objeto, subruta){
    var post = new XMLHttpRequest()
    post.open('POST', rutaAPI.concat(subruta), true)
    post.setRequestHeader('Content-Type', 'application/json')
    post.send(JSON.stringify(objeto))
}