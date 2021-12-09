const rutaAPI = 'http://localhost:2610'

async function apiGet(subruta){
    var respuesta = await fetch(rutaAPI.concat(subruta));
    return await respuesta.json();
}

async function apiPost(objeto, subruta){
    var respuesta = await fetch(rutaAPI.concat(subruta), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(objeto)
    })
    return await respuesta.json();
}

async function apiPatch(objeto, subruta) {
    var respuesta = await fetch(rutaAPI.concat(subruta), {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(objeto)
    })
    return await respuesta.json();
}

async function apiDelete(subruta){
    var respuesta = await fetch(rutaAPI.concat(subruta), {
        method: 'DELETE',
    })
    // console.log(respuesta)
    return respuesta;
}