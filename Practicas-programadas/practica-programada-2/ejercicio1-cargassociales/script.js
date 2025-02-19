document.getElementById("calcular").addEventListener("click", calcularDeducciones);

function calcularDeducciones(){
    const salarioBruto=parseFloat(document.getElementById("salario").value);
    if (isNaN(salarioBruto) || salarioBruto <= 0) {
        alert("Por favor, ingrese un salario válido.");
        return;
}

const cargaSocial= salarioBruto*0.09;

let impuestoSobreR=0;

if (salarioBruto > 4700000) {
    impuestoSobreR += (salarioBruto - 4700000) * 0.25;
}else if (salarioBruto > 2300000) {
    impuestoSobreR += (salarioBruto - 2300000) * 0.20;
    
}else if (salarioBruto > 1300000) {
    impuestoSobreR += (salarioBruto - 1300000) * 0.15;
} else if (salarioBruto > 922000) {
    impuestoSobreR += (salarioBruto - 922000) * 0.10;
}

const salarioNeto= salarioBruto- cargaSocial- impuestoSobreR;

document.getElementById('salarioBruto').textContent = salarioBruto.toFixed(2);
document.getElementById('cargaSocial').textContent = cargaSocial.toFixed(2);
document.getElementById('impuestoSobreR').textContent = impuestoSobreR.toFixed(2);
document.getElementById('salarioNeto').textContent = salarioNeto.toFixed(2);

}