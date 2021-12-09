async function pedirHorarios(){
    return await apiGet('/horarios')
}

async function actualizarHorarioCancion(actualizacion) {
    return await apiPatch(actualizacion, '/horarios')
}