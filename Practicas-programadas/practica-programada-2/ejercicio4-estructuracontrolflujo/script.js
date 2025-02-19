document.getElementById("calcular").addEventListener("click", function(){

    const edad=parseInt(document.getElementById("edad").value);
    let mensaje="";

    if (edad>=18){
        mensaje="Eres mayor de edad";
        document.getElementById("resultado").className="mayor";
    }else{
        mensaje="Eres menor de edad"
        document.getElementById("resultado").className="menor";
    } 
    document.getElementById("resultado").textContent=mensaje;
});

