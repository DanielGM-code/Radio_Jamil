async function pedirCanciones(){
    return await apiGet('/canciones')
}

async function pedirCancion(id){
    return await apiGet(`/canciones/${id}`)
}

async function pedirCancionesHorario(id){
    return await apiGet(`/cancioneshorario/${id}`)
}

async function agregarCancion(cancion){
    // apiPost(cancion, '/canciones')
    return await apiPost(cancion, '/canciones')
}

async function eliminarCancion(id){
    return await apiDelete(`/canciones/${id}`)
}

async function generarProgramacion(){
    return await apiPost({id : ""}, '/cancionesprogramacion')
}
