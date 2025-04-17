document.addEventListener('DOMContentLoaded', function(){
    const tasks = [{//datos quemados
        id: 1,
        title: "Complete project report",
        description: "Prepare and submit the project report",
        dueDate: "2024-12-01",
        comentarios: [] 
    },

    {
        id:2,
        title: "Team Meeting",
        description: "Get ready for the season",
        dueDate: "2024-12-01",
        comentarios: []
    },

    {
        id: 3,
        title: "Code Review",
        description: "Check partners code",
        dueDate: "2024-12-01",
        comentarios: []
    }];
    
    function loadTasks(){//los botones y espacios
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(function(task){
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small> </p>

                    <input type="textarea" class="form-control" placeholder="Comentarios"></input>
                    <button class="btn btn-danger btn-sm agregar-task" data-id="${task.id}">Eliminar comentario</button>
                    <button class="btn btn-primary btn-sm eliminar-task" data-id="${task.id}">Agregar comentario</button>
                    
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>

                </div>
            </div>
            `;
            taskList.appendChild(taskCard);
        });

        document.querySelectorAll('.agregar-task').forEach(function(button){//comentarios
            button.addEventListener('click', handleAgregarTask);
        });

        document.querySelectorAll('.eliminar-task').forEach(function(button){//comentarios
            button.addEventListener('click', handleEliminarTask);
        })
        
        document.querySelectorAll('.edit-task').forEach(function(button){//ya dado
            button.addEventListener('click', handleEditTask);
        });

        document.querySelectorAll('.delete-task').forEach(function(button){//ya dado
            button.addEventListener('click', handleDeleteTask);
        });

    }

    function handleAgregarTask(event){
        const taskId = parseInt(event.target.dataset.id);
        const task = tasks.find(t => t.id === taskId);
        const commentText = event.target.previousElementSibling.value;
    
        if (task && commentText) {
            task.comentarios.push(commentText);
            loadTasks();
        }
    }
    
    function handleEliminarTask(event){
            const taskId = parseInt(event.target.dataset.id); 
            const task = tasks.find(t => t.id === taskId);
            
            if (task) {
                const commentIndex = parseInt(event.target.dataset.commentId);
                if (commentIndex >= 0 && commentIndex < task.comentarios.length) {
                    task.comentarios.splice(commentIndex, 1);
                    loadTasks();
                }
            }
    }
       
    function handleEditTask(event){
        const taskId = parseInt(event.target.dataset.id);
        const task = tasks.find(t => t.id === taskId);

        if (task) {
            // Cargar datos en cada campo del formulario
            document.getElementById('task-id').value = task.id;
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-desc').value = task.description;
            document.getElementById('due-date').value = task.dueDate;

            // Mostrar el modal
            currentTaskId = taskId;
            const modal = new bootstrap.Modal(document.getElementById('taskModal'));
            modal.show();
        }
    }

    function handleDeleteTask(event){
        const taskId = parseInt(event.target.dataset.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        // Eliminar la tarea del array y recargarlas
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            loadTasks(); 
        }
    }

    document.getElementById('task-form').addEventListener('submit', function(e){
        e.preventDefault();

        let currentTaskId = document.getElementById('task-id').value;
        const taskTitle = document.getElementById('task-title').value;
        const taskDesc = document.getElementById('task-desc').value;
        const dueDate = document.getElementById('due-date').value;

        if (currentTaskId) {
            // Editar tarea existente
            const taskIndex = tasks.findIndex(t => t.id === parseInt(currentTaskId));
            tasks[taskIndex] = {
                id: parseInt(currentTaskId),
                title: taskTitle,
                description: taskDesc,
                dueDate: dueDate,
                comentarios: []
            };
        } else {
            // Agregar la tarea al array
            const newTask = {
                id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
                title: taskTitle,
                description: taskDesc,
                dueDate: dueDate,
                comentarios: []
                
            };
            tasks.push(newTask);
        }

        document.getElementById('task-id').value = '';
        currentTaskId = null;
        e.target.reset();

        // Recargar las tareas
        loadTasks();

        const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
        modal.hide();
    });

    loadTasks();

});