async function pedirHorarios(){
    return await apiGet('/horarios')
}

async function pedirHorario(idHorario) {
    return await apiGet(`/horarios/${idHorario}`)
}

async function actualizarHorarioCancion(actualizacion) {
    return await apiPatch(actualizacion, '/horarios')
}

async function eliminarHorario(idHorario) {
    return await apiDelete(`/horarios/${idHorario}`)
}

async function guardarHorario(horario) {
    return await apiPost(horario, `/horarios`)
}