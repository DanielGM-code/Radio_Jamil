async function pedirArtistas(){
    return await apiGet('/artistas')
}

async function pedirGeneros(){
    return await apiGet('/generos')
}

async function pedirCategorias(){
    return await apiGet('/categorias')
}

async function pedirCategoria(id){
    return await apiGet(`/categorias/${id}`)
}
