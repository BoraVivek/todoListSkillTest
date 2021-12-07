(function(){
    let tasks = [];
    const taskInput = document.getElementById('todo-input');
    const tasksCounter = document.getElementById('task-counter');
    const tasksList = document.getElementById('tasks-list');

    //Function which adds task
    function addTask(task){
        if(task){
            tasks.push(task);
            taskInput.value = "";
            renderList();
            showNotification('Task Added Successfully');
        }
    }

    //Function which deletes the task
    function deleteTask(task){

    }

    //Function which toggle's task status
    function toggleTask(task){

    }

    //Function to mark all tasks as Complete
    function markAllTaskAsComplete(){

    }

    //Function to remove completed Tasks
    function removeCompletedTasks(){

    }

    //Function to show Notifications
    function showNotification(text){

    }

    //Function which renders the List
    function renderList(){
        tasksList.innerHTML = "";
        for(let i = 0; i < tasks.length; i++){
            const currentTask = tasks[i];
            addTaskToDOM(currentTask);
        }
    }

    //Function which adds the task to DOM
    function addTaskToDOM(task){
        const li = document.createElement('li');
        li.classList.add('task');
        li.innerHTML = `
            <div>
                <input type="checkbox" ${ task.completed ? 'checked' : ''} id="${task.id}" class="custom-checkbox">
                <label for="${task.id}">${task.title}</label>
            </div>
            <div class="delete-task" data-id="${task.id}"></div>
        `;
        tasksList.append(li);
        tasksCounter.innerHTML = tasks.length;

    }

    function handleTaskAddEvent(e){
        if(e.key === 'Enter'){
            const title = e.target.value;

            const task = {
                id: Date.now(),
                title: title,
                completed: false,
            }

            addTask(task);
        }
    }

    taskInput.addEventListener('keyup', handleTaskAddEvent);
    renderList();

})()