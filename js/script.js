(function () {
    let tasks = [];
    const taskInput = document.getElementById('todo-input'); //TODO Input Box
    const tasksCounter = document.getElementById('task-counter'); //Task Counter
    const tasksList = document.getElementById('tasks-list'); //Tasks List where tasks are rendered
    let activeFilter = "all"; //Manages the Current Filter of Tasks

    //Function which adds task
    function addTask(task) {
        if (task) {
            tasks.push(task); //Add task to the array
            taskInput.value = ""; //Resetting the value of input box
            renderList(activeFilter);
            showNotification('Task Added Successfully');
        }
    }

    //Function which deletes the task
    function deleteTask(taskId) {
        if (taskId) {
            tasks = tasks.filter(function (task) {
                return task.id !== taskId;
            });
            renderList(activeFilter);
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
            currentTask.completed = !currentTask.completed; //Toggling the completed status of task
            renderList(activeFilter);
            showNotification('Task Toggled Successfully');
        }
    }

    //Function to mark all tasks as Complete
    function markAllTaskAsComplete() {
        tasks.map(function(task){
            return task.completed=true;
        })

        renderList(activeFilter);
        showNotification('All tasks are marked as completed');
    }

    //Function to remove completed Tasks
    function removeCompletedTasks() {
        tasks = tasks.filter(function(task){
            return task.completed !== true;
        });

        renderList(activeFilter);
        showNotification('Completed Tasks are cleared');
    }

    //Function to show Notifications
    function showNotification(text) {

    }

    //Function which renders the List
    function renderList(taskFilter = 'all') {
        if (tasks.length !== 0) {
            tasksList.innerHTML = "";

            //Check for filters and based on selected filter render the tasks.
            switch(taskFilter){
                case 'all':
                    taskRenderHandler(tasks);
                    break;
                case 'uncompleted':
                    const uncompletedTasks = tasks.filter(function(task){
                        return task.completed === false;
                    });

                    //If no uncompleted task present show message
                    if(uncompletedTasks.length === 0){
                        tasksList.innerHTML = "<div class='dimmed center'>No Uncompleted Tasks</div>";
                        return;
                    }
                    taskRenderHandler(uncompletedTasks);
                    break;
                case 'completed':
                    const completedTasks = tasks.filter(function(task){
                        return task.completed === true;
                    });

                    //If no completed task present, show message
                    if(completedTasks.length === 0){
                        tasksList.innerHTML = "<div class='dimmed center'>No Completed Task</div>";
                        return;
                    }
                    taskRenderHandler(completedTasks);
                    break;
            }
        } else {
            tasksList.innerHTML = "<div class='dimmed center'>No Tasks Pending</div>";
            taskCounter();
        }

    }

    //Function for optimizing the code, and removing repetitive tasks by making a middle handler
    //It loops through all tasks, and passes each task to addTaskToDOM function which than adds the task to DOM
    function taskRenderHandler(tasks){
        for (let i = 0; i < tasks.length; i++) {
            const currentTask = tasks[i];
            addTaskToDOM(currentTask); //Add Task to the DOM
            taskCounter(); //Update Task Counter
        }
    }

    //Function which adds the task to DOM
    function addTaskToDOM(task) {
        //Creating new LI Element
        const li = document.createElement('li');
        li.classList.add('task');
        li.innerHTML = `
            <div>
                <input type="checkbox" id="${task.id}" class="custom-checkbox" ${task.completed ? 'checked' : ''}>
                <label for="${task.id}">${task.title}</label>
            </div>
            <div class="delete-task" data-id="${task.id}"></div>
        `;
        tasksList.append(li); //Appending the created LI to the tasksList in dom
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

            //Creating Task Object
            const task = {
                id: Date.now(),
                title: title,
                completed: false,
            }
            addTask(task); //Calling add task function and passing the task object as argument.
        }
    }

    //Function which handles the click Event and performs some tasks based on the target => Event Delegation is used here to optimize the events
    function handleClickEvent(e) {
        const target = e.target;
        if (target.className === 'delete-task') {
            const taskId = Number(target.dataset.id);
            deleteTask(taskId); //Calling Delete Task Function
        } else if (target.className === 'custom-checkbox') {
            const taskId = Number(target.id);
            toggleTask(taskId); //Calling Toggle Task Function
        }else if(target.id === 'complete-tasks'){
            markAllTaskAsComplete(); //Calling Mark All Task as Complete Function
        }else if(target.id === 'clear-complete'){
            removeCompletedTasks(); //Calling Remove Completed Task Function
        }else if(target.id === 'all-tasks'){
            toggleActive(target);
            activeFilter = "all"; //Changing the active filter to all
            renderList('all');
        }else if(target.id === 'completed-tasks'){
            toggleActive(target);
            activeFilter = "completed"; //Changing the active filter to completed
            renderList('completed');
        }else if(target.id === 'uncompleted-tasks'){
            toggleActive(target);
            activeFilter = "uncompleted"; //Changing the active filter to uncompleted
            renderList('uncompleted');
        }
    }

    //Function which toggle's the Active State of Task Filters
    function toggleActive(target){
        target.classList.add('active');
        //Remove Active class from in-active filters
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

    //Function which is initializing the app
    function initializeApp(){
        taskInput.addEventListener('keyup', handleTaskAddEvent);
        document.addEventListener('click', handleClickEvent);
        renderList(activeFilter);
    }

    initializeApp();
})()

//#TODO Show Notification Functionality