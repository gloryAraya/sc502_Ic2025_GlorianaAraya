document.addEventListener('DOMContentLoaded', function() {
    function updateTotalCreditos() {
        let totalCreditos = 0;
        creditInputs = document.querySelectorAll('.credits');
        creditInputs.forEach(function(input) {
            totalCreditos += Number(input.value) || 0;
        });
        document.getElementById('totalCreditos').textContent = totalCreditos;
    }

    document.getElementById('agregar').addEventListener('click', function() {
        coursesList = document.getElementById('coursesList');
        courseDiv = document.createElement('div');
        courseDiv.classList.add('course');
        courseDiv.innerHTML = `
            <label>Cursos: <input type="text" name="courseName[]" placeholder="Nombre curso"></label>
            <label>Créditos: <input type="number" name="courseCredits[]" class="credits" min="0"></label>
            <button type="button" class="btn btn-danger eliminarCurso">Eliminar</button>
        `;
        coursesList.appendChild(courseDiv);
    });

    document.getElementById('coursesList').addEventListener('click', function(event) {
        if (event.target.classList.contains('eliminarCurso')) {
            const courseDiv = event.target.closest('.course');
            if (courseDiv) {
                courseDiv.remove();
                updateTotalCreditos();
            }
        }
    });

    document.getElementById('coursesList').addEventListener('input', function(event) {
        if (event.target.classList.contains('credits')) {
            updateTotalCreditos();
        }
    });
});
