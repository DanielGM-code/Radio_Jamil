async function pedirCanciones(){
    return await apiGet('/canciones')
}

async function pedirCancion(id){
    return await apiGet(`/canciones/${id}`)
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
    console.log('Agregando')
    console.log(cancion)

    apiPost(cancion, '/canciones')
}

async function editarCancion(cancion){
    console.log('Editando')
    console.log(cancion)
}

async function eliminarCancion(cancionId){
    console.log(cancionId)
}
