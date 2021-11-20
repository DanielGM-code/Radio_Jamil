async function pedirCanciones(){
    const respuesta = await fetch('http://localhost:2610/canciones');
    const jsonCanciones = await respuesta.json();
    
    return jsonCanciones
}

async function pedirCancion(id){
    const respuesta = await fetch(`http://localhost:2610/canciones/${id}`);
    const jsonCanciones = await respuesta.json();
    
    return jsonCanciones
}

