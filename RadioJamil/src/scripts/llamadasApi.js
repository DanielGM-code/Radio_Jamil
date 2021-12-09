async function pedirCanciones(){
    const respuesta = await fetch('http://localhost:2610/canciones');
    const json = await respuesta.json();
    
    return json
}

async function pedirCancion(id){
    const respuesta = await fetch(`http://localhost:2610/canciones/${id}`);
    const json = await respuesta.json();
    
    return json
}

async function pedirArtistas(){
    const respuesta = await fetch('http://localhost:2610/artistas');
    const json = await respuesta.json();
    
    return json
}

async function pedirGeneros(){
    const respuesta = await fetch('http://localhost:2610/generos');
    const json = await respuesta.json();
    
    return json
}

async function pedirCategorias(){
    const respuesta = await fetch('http://localhost:2610/categorias');
    const json = await respuesta.json();
    
    return json 
}

async function agregarCancion(cancion){
    console.log(cancion)
}

async function editarCancion(cancion){
    console.log(cancion)
}

async function eliminarCancion(cancionId){
    console.log(cancionId)
}
