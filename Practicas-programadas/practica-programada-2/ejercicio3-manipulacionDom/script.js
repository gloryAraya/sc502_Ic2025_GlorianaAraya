let estado = 0; 

function cambiarContenido() {
    const parrafo = document.getElementById("texto");
    
    if (estado === 0) {
        parrafo.innerHTML = "Este es el texto numero uno. Este es el texto numero uno. Este es el texto numero uno.";
        estado = 1; 
    } else {
        parrafo.innerHTML = "Este es el texto numero dos. Este es el texto numero dos. Este es el texto numero dos.";
        estado = 0; 
}
}

document.getElementById("cambiar").onclick = cambiarContenido;