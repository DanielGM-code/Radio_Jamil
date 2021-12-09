async function pedirPatrones(){
    return await apiGet('/patrones')
}

async function pedirPatron(id){
    return await apiGet(`/patrones/${id}`)
}

async function agregarPatron(patron){
    return await apiPost(patron, '/patrones')
}

async function eliminarPatron(id){
    return await apiDelete(`/patrones/${id}`)
}