(function () {
    let tasks = [];
    const taskInput = document.getElementById('todo-input');
    const tasksCounter = document.getElementById('task-counter');
    const tasksList = document.getElementById('tasks-list');

    //Function which adds task
    function addTask(task) {
        if (task) {
            tasks.push(task);
            taskInput.value = "";
            renderList();
            showNotification('Task Added Successfully');
        }
    }

    //Function which deletes the task
    function deleteTask(taskId) {
        if (taskId) {
            tasks = tasks.filter(function (task) {
                return task.id !== taskId;
            });
            renderList();
            showNotification("Task Deleted Successfully");
        }
    }

    //Function which toggle's task status
    function toggleTask(taskId) {
        if (taskId) {
            let task = tasks.filter(function (task) {
                return task.id === taskId;
            });

            const currentTask = task[0];
            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification('Task Toggled Successfully');
        }
    }

    //Function to mark all tasks as Complete
    function markAllTaskAsComplete() {
        tasks.map(function(task){
            return task.completed=true;
        })

        renderList();
        showNotification('All tasks are marked as completed');
    }

    //Function to remove completed Tasks
    function removeCompletedTasks() {
        tasks = tasks.filter(function(task){
            return task.completed !== true;
        });

        renderList();
        showNotification('Completed Tasks are cleared');
    }

    //Function to show Notifications
    function showNotification(text) {

    }

    //Function which renders the List
    function renderList(taskFilter = 'all') {
        if (tasks.length !== 0) {
            tasksList.innerHTML = "";

            switch(taskFilter){
                case 'all':
                    taskRenderHandler(tasks);
                    break;
                case 'uncompleted':
                    const uncompletedTasks = tasks.filter(function(task){
                        return task.completed === false;
                    });
                    taskRenderHandler(uncompletedTasks);
                    break;
                case 'completed':
                    const completedTasks = tasks.filter(function(task){
                        return task.completed === true;
                    });
                    taskRenderHandler(completedTasks);
                    break;
            }
        } else {
            tasksList.innerHTML = "<div class='dimmed center'>No Tasks Pending</div>";
            taskCounter();
        }

    }

    //Function for optimizing the code, and removing repetitive tasks by making a middle handler
    function taskRenderHandler(tasks){
        for (let i = 0; i < tasks.length; i++) {
            const currentTask = tasks[i];
            addTaskToDOM(currentTask);
            taskCounter();
        }
    }

    //Function which adds the task to DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.classList.add('task');
        li.innerHTML = `
            <div>
                <input type="checkbox" id="${task.id}" class="custom-checkbox" ${task.completed ? 'checked' : ''}>
                <label for="${task.id}">${task.title}</label>
            </div>
            <div class="delete-task" data-id="${task.id}"></div>
        `;
        tasksList.append(li);
    }

    //Function to Count the no. of pending tasks and add them in DOM
    function taskCounter(){
        tasksCounter.innerHTML = tasks.filter(function(task){
            return task.completed !== true;
        }).length.toString();
    }

    //Function which handles the Keyup Event, and performs adding of task to the list
    function handleTaskAddEvent(e) {
        if (e.key === 'Enter') {
            const title = e.target.value;

            const task = {
                id: Date.now(),
                title: title,
                completed: false,
            }
            addTask(task);
        }
    }

    function handleClickEvent(e) {

        const target = e.target;
        if (target.className === 'delete-task') {
            const taskId = Number(target.dataset.id);
            deleteTask(taskId);
        } else if (target.className === 'custom-checkbox') {
            const taskId = Number(target.id);
            toggleTask(taskId);
        }else if(target.id === 'complete-tasks'){
            markAllTaskAsComplete();
        }else if(target.id === 'clear-complete'){
            removeCompletedTasks();
        }else if(target.id === 'all-tasks'){
            toggleActive(target);
            renderList('all');
        }else if(target.id === 'completed-tasks'){
            toggleActive(target);
            renderList('completed');
        }else if(target.id === 'uncompleted-tasks'){
            toggleActive(target);
            renderList('uncompleted');
        }
    }

    function toggleActive(target){
        target.classList.add('active');
        if(target.id === 'all-tasks'){
            document.getElementById('uncompleted-tasks').classList.remove('active');
            document.getElementById('completed-tasks').classList.remove('active');
        }else if(target.id === 'uncompleted-tasks'){
            document.getElementById('all-tasks').classList.remove('active');
            document.getElementById('completed-tasks').classList.remove('active');
        }else if(target.id === 'completed-tasks'){
            document.getElementById('uncompleted-tasks').classList.remove('active');
            document.getElementById('all-tasks').classList.remove('active');
        }
    }

    taskInput.addEventListener('keyup', handleTaskAddEvent);
    document.addEventListener('click', handleClickEvent);
    renderList();
})()