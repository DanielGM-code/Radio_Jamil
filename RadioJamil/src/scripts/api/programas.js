async function pedirProgramas() {
    return await apiGet('/programas')
}

async function pedirPrograma(idPrograma) {
    return await apiGet(`/programas/${idPrograma}`)
}

async function eliminarPrograma(idPrograma) {
    return await apiDelete(`/programas/${idPrograma}`)
}

async function guardarPrograma(programa) {
    return await apiPost(programa, `/programas`)
}