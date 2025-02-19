const estudiantes=[
    {nombre: "Helena",apellido:"Vargas",nota:95},
    {nombre: "Paula",apellido:"Quesada",nota:82},
    {nombre: "Sol",apellido:"Campos",nota:93},
    {nombre: "Mily",apellido:"Feng",nota:88}];

let sumaNotas=0;
estudiantes.forEach(calculoPromedio);

function calculoPromedio(estudiante){
    sumaNotas += estudiante.nota;
}

const promedio=sumaNotas/4;
const resultados = document.getElementById("resultados");

estudiantes.forEach((estudiante) => {
    resultados.innerHTML +=`<p> ${estudiante.nombre} ${estudiante.apellido}  <br/>Nota:  ${estudiante.nota} </p>`;
});

resultados.innerHTML += `<p><strong>Promedio de notas: ${promedio.toFixed(2)}</strong></p>`;
