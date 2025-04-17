document.addEventListener('DOMContentLoaded', function () {
    let tasks = [];

    async function fetchTasks() {
        const taskR = await fetch('api/tasks.php');
    
        tasks = await taskR.json();
      
        console.log(tasks);
        tasks.forEach(task => {
            
            
        });

        loadTasks();
    }
        //fetch que agarre los comments
        //por cada tarea cargue los comentarios

function loadTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        const noTasksMessage = document.createElement('div');
        noTasksMessage.className = 'alert alert-info w-100 text-center';
        noTasksMessage.textContent = 'No hay tareas disponibles.';
        taskList.appendChild(noTasksMessage);
        return;
    }

    tasks.forEach(function (task) {
        const taskCard = document.createElement('div');
        taskCard.className = 'col-md-4 mb-3';
        let commentListHtml = '';
        if (task.comments.length > 0) {
            commentListHtml = task.comments.map((comment, index) => `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        ${comment.description}
                        <button class="btn btn-sm btn-outline-danger delete-comment" data-task="${task.id}" data-index="${index}">&times;</button>
                    </li>
                `).join('');
        } else {
            commentListHtml = `<li class="list-group-item text-muted">No hay comentarios</li>`;
        }

        taskCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${task.title}</h5>
                        <p class="card-text">${task.description}</p>
                        <p class="card-text"><small class="text-muted">Due: ${task.due_date}</small></p>
                        <h6>Comments</h6>
                        <ul class="list-group mb-3" id="comments-${task.id}">
                            ${commentListHtml}
                        </ul>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="comment-input-${task.id}" placeholder="Add a comment">
                            <div class="input-group-append">
                                <button class="btn btn-primary add-comment" data-id="${task.id}">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                    </div>
                </div>`;
        taskList.appendChild(taskCard);
    });

    document.querySelectorAll('.edit-task').forEach(button => button.addEventListener('click', handleEditTask));
    document.querySelectorAll('.delete-task').forEach(button => button.addEventListener('click', handleDeleteTask));
    document.querySelectorAll('.add-comment').forEach(button => button.addEventListener('click', handleAddComment));
    document.querySelectorAll('.delete-comment').forEach(button => button.addEventListener('click', handleDeleteComment));
}

async function handleAddComment(e) {
    const taskId = parseInt(e.target.dataset.id);
    const input = document.getElementById(`comment-input-${taskId}`);
    const comentario = input.value.trim();

    if (comentario) {
        fetch('api/comments.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                task_id: taskId,
                comment: comentario
            })
        })
        .then(response => {
            if (response.ok) {
                input.value = '';
                fetchTasks(); 
            } else {
                console.error('Error al agregar el comentario'); 
            }
        });
    }
}

async function handleDeleteComment(e) {
    const taskId = parseInt(e.target.dataset.task);
    const comentarioEliminar = parseInt(e.target.dataset.index);

    fetch('api/comments.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task_id: taskId,
            comment_index: comentarioEliminar
        })
    })
    .then(response => {
        if (response.ok) {
            fetchTasks(); 
        } else {
            console.error('Error al eliminar el comentario');
        }
    });
}


function handleEditTask(e) {
    const taskId = parseInt(e.target.dataset.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        document.getElementById('task-id').value = task.id;
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.description;

        const dueDate = new Date(task.due_date);
        const formattedDate = dueDate.getFullYear() + '-' +
            ('0' + (dueDate.getMonth() + 1)).slice(-2) + '-' +
            ('0' + dueDate.getDate()).slice(-2);
        document.getElementById('due-date').value = formattedDate;

        console.log(task.due_date);

        const modal = new bootstrap.Modal(document.getElementById('taskModal'));
        modal.show();
    }
}

async function handleDeleteTask(e) {
    const taskId = parseInt(e.target.dataset.id);
    await fetch('api/tasks.php', {//comments.phph
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId })//comment id
    });
    await fetchTasks();
}

document.getElementById('task-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const taskId = document.getElementById('task-id').value;
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('due-date').value;

    const data = {
        id: taskId ? parseInt(taskId) : null,
        title: title,
        description: desc,
        due_date: dueDate
    };

    const method = taskId ? 'PUT' : 'POST';  //tanto agregar como editar
    const url = 'api/tasks.php';

    const response = await fetch(url, {//url api.php
        method: method,//post
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        e.target.reset();
        document.getElementById('task-id').value = '';

        const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
        modal.hide();

        await fetchTasks();

        if (method === 'PUT') {
            console.log('Tarea editada exitosamente');
        } else {
            console.log('Tarea agregada exitosamente');
        }
    } else {
        console.error('Hubo un error al procesar la tarea');
    }
});


fetchTasks();

function resetForm() {
    document.getElementById('task-id').value = '';
    document.getElementById('task-title').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('due-date').value = '';
}

document.getElementById('taskModal').addEventListener('hidden.bs.modal', function () {
    resetForm();
    console.log('Formulario reseteado');
});
});

