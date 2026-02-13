//* Task manager

//* quick storage
let tasks = [
  {
    id: 0,
    title: "Learn JS",
    isDone: false,
    createdAt: Date.now(),
  },
];

let IDs = 1;

//TODO function for input sanitization
// later add it alert for UI

//TODO function for edge cases (explore what kind of verification wants)

//TODO get tasks -- UI ??

//* addTask()
function addTask(title) {
  //TODO input sanitization()

  // create new task object
  let newTaskObj = {
    id: IDs,
    title: title,
    isDone: false,
    createdAt: Date.now(),
  };

  IDs++;

  // push
  tasks.push(newTaskObj);
}

//* get Index and task Object
function getIdxAndTask(id) {
  let taskObj = tasks.find((e) => e.id == id);
  let idx = tasks.indexOf(taskObj);
  return [idx, taskObj];
}

//* toggleTask()
function toggleTask(id) {
  let taskInfo = getIdxAndTask(id);
  let taskObj = taskInfo[1];
  let idx = taskInfo[0];

  //TODO Edge cases - not found

  taskObj.isDone = taskObj.isDone ? false : true;
  tasks[idx] = taskObj;
}

//* editTask()
function editTask(id, newTitle) {
  //TODO input sanitization

  let taskInfo = getIdxAndTask(id);
  let taskObj = taskInfo[1];
  let idx = taskInfo[0];

  //TODO Edge cases - not found

  taskObj.title = newTitle;
  tasks[idx] = taskObj;
}

//* deleteTask()
function deleteTask(id) {
  let taskInfo = getIdxAndTask(id);
  let idx = taskInfo[0];

  //TODO Edge cases - not found

  tasks.splice(idx, 1);
}

// TODO think when to use these properly - when to save locally and retrive
// retrive at start - else 
 // or buttons save / load 

//* Local Storage
// saveTasks() -- local storage
function saveTasksLocal(tasksArr) {
  //TODO  edge cases
  tasksArr = JSON.stringify(tasksArr);
  localStorage.setItem("tasks", tasksArr);
}

// loadTask -- local storage
function loadTasksLocal() {
  let tasksArr = localStorage.getItem("tasks");
  tasksArr = JSON.parse(tasksArr);
  console.log(tasksArr);
}


addTask("Go to gym");
addTask("Go to bed");
addTask("lunch");
addTask("dinner");

toggleTask(2);

toggleTask(4);
toggleTask(2);

toggleTask(2);
toggleTask(3);

editTask(1, "go to marketttt");
editTask(3, "buy fish");

saveTasksLocal(tasks);
loadTasksLocal();
