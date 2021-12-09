async function pedirCanciones(){
    return await apiGet('/canciones')
}

async function pedirCancion(id){
    return await apiGet(`/canciones/${id}`)
}

async function pedirCancionesHorario(id){
    return await apiGet(`/cancioneshorario/${id}`)
}

async function pedirArtistas(){
    return await apiGet('/artistas')
}

async function pedirGeneros(){
    return await apiGet('/generos')
}

async function pedirCategorias(){
    return await apiGet('/categorias')
}

async function agregarCancion(cancion){
    apiPost(cancion, '/canciones')
}

async function eliminarCancion(id){
    return await apiDelete(`/canciones/${id}`)
}
