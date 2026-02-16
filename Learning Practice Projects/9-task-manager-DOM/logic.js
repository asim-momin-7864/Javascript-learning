//* Task manager

// * only design paramateres for our operations , no need to add extra argumenst and try to make them more general -- beacuse out of this programe we dont use it

// loadTasksLocal() should NOT be a parameter at all.
// Saving Inside Load Function -- Mistake type: Breaking Single Responsibility Principle
// Major Bug – idSanitization -- NaN
//TODO Dangerous Assumption in toggleTask - getIdxAndTask(id);
// Weak Type Check -- Inside addTask() -- addTask(232348472);
//TODO You Are Not Saving After Every Change
/*

addTask() does not save
toggleTask() does not save
editTask() does not save
deleteTask() does not save

*/
// Double Variable Naming Confusion -- Some names don't reflect actual meaning clearly.

//------------------------------------------------------------------------------------------------------------------------

//* quick storage
let tasks = [];

//* Save Local Storage -- local storage
function saveTasksLocal() {
  let tasksStringArr = JSON.stringify(tasks);
  localStorage.setItem("tasksArr", tasksStringArr);
}

//* Reload LoadTask -- local storage
function loadTasksLocal() {
  // getting item
  let resultArr = localStorage.getItem("tasksArr");

  //* Due to we are checking, reloading or saving -- tasks in localstorage at initially, we never get case "tasksArr" not found in local storage
  //Edge case - if not found in local
  // so dont over complicate it, by adding here localStorage()
  //! this might create circular loop

  // there maybe null if we try to find different key
  if (resultArr == null) {
    //TODO later add it alert for UI
    console.log("Tasks are not saved in local storage yet");
    alert("Tasks are not saved in local storage yet");
    return;
  }

  tasks = [];
  tasks = JSON.parse(resultArr);

  fetchAllTasks();
}

//* addTask()
function addTask(title) {
  // input sanitization()
  // weak verification -- but okey in practice project
  title = String(title);
  console.log(title);

  if (title.trim() == "") {
    console.log("Task is empty");
    return;
  }

  // create new task object
  let newtask = {
    id: crypto.randomUUID(),
    title: title,
    isDone: false,
    createdAt: Date.now(),
  };

  // push
  tasks.push(newtask);

  saveTasksLocal();
  fetchAllTasks();
}

//* get Index and task Object
function getIdxAndTask(id) {
  if (id.trim() == "") {
    console.log("Id is empty");
    return;
  }

  let task = tasks.find((e) => e.id == id);

  //Edge case - if not find
  if (task == undefined || task == null) {
    console.log("Task does not exists");
    return;
  }

  let idx = tasks.indexOf(task);
  return {
    idx: idx,
    task: task,
  };
}

//* toggleTask()
function toggleTask(id) {
  let taskInfo = getIdxAndTask(id);
  let task = taskInfo.task;
  let idx = taskInfo.idx;

  task.isDone = task.isDone ? false : true;
  tasks[idx] = task;
  saveTasksLocal();
  fetchAllTasks();
}

//* editTask()
// we can tune more these core manipulation fucntions according to our fucntion for buttons based on input / data we can get in there
// for example sending, taskinfo we are alredy using get IdxAndTask() in both
function editTask(id, newTitle) {
  // input sanitization()
  newTitle = String(newTitle);
  if (newTitle.trim() == "") {
    console.log("Task is empty");
    return;
  }

  let taskInfo = getIdxAndTask(id);
  let task = taskInfo.task;
  let idx = taskInfo.idx;
  task.title = newTitle;
  tasks[idx] = task;

  saveTasksLocal();
  fetchAllTasks();
}

//* deleteTask()
function deleteTask(id) {
  let taskInfo = getIdxAndTask(id);
  let idx = taskInfo.idx;
  tasks.splice(idx, 1);

  saveTasksLocal();
  fetchAllTasks();
}

//DOM logic
let reload = document.getElementById("reload");
let save = document.getElementById("save");
let form = document.getElementById("form");
let allTasksUl = document.getElementById("allTasks");

//UI
//* function - get all tasks (load every time)

function fetchAllTasks() {
  //* need to clear old DOM data
  allTasksUl.innerHTML = "";

  tasks.forEach((task) => {
    //Tcreate LI fill data
    //Tappend in UL

    // task LI
    let li = document.createElement("li");
    li.setAttribute("id", task.id);

    // inside elements
    let pTask = document.createElement("p");
    pTask.classList.add("p-task");
    pTask.innerText = task.title;

    /*
* This is happening thats why we need to add checked in new DOM

You toggle class manually ✅

toggleTask() updates state ✅

UI re-renders

Old DOM removed ❌

New DOM created without .checked class ❌

*/

    if (task.isDone) {
      // true
      pTask.classList.add("checked");
    }

    let checkBtn = document.createElement("button");
    checkBtn.classList.add("check-btn");
    checkBtn.innerText = "Check";

    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerText = "Edit";

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "Delete";

    li.appendChild(pTask);
    li.appendChild(checkBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    allTasksUl.appendChild(li);
  });
}

fetchAllTasks();

//* reload all tasks
reload.addEventListener("click", (e) => {
  loadTasksLocal();
});

//* Improvement - use event delegation and one event handler for 3 buttons
// need to revise it and implement again
// apply that on LI directly

//* save all tasks
save.addEventListener("click", () => {
  saveTasksLocal();
  console.log("save btn clicked");
});

//* check task
// get all check buttons

//! Rendering & Re-rendering Mistakes (Real Debug Case)
//! let allCheckBtns = document.querySelectorAll(".check-btn")
// BCZ querySelectorAll returns static image of all that elements - thats why our buttons wont working on new added elements

function checkTaskBtn(e) {
  // console.log(e.currentTarget); --> to who event listner is attached

  // parent way -- not recommended
  // console.log(e.target.parentElement.children[0].classList.toggle("checked")); -- length way

  // sibling way -- not recommended
  // e.target.previousElementSibling.classList.toggle("checked");

  // closest way -- not work
  //* .closest() only searches upwards (ancestors) in the DOM tree.
  // let pTask = e.target.closest(".p-task")
  // pTask.classList.toggle("checked")

  // p is static wont change also we can we this element area only
  console.log(e.target);
  let li = e.target.parentElement;
  let pTask = li.querySelector(".p-task");
  pTask.classList.toggle("checked");

  // console.log(e.target.parentElement.id);
  toggleTask(e.target.parentElement.id);
}

//* delete task
//! let allDeleteBtns = document.querySelectorAll(".delete-btn");

function deleteTaskBtn(e) {
  //delete whole LI
  deleteTask(e.target.parentElement.id); // remove from tasks
  console.log(e.target.parentElement.remove()); // remove LI
}

//! Event Listener Overlapping Problem

// //* edit task
// function editTaskBtn(e) {
//    find that task
//   console.log(e.target.parentElement);
//   let id = e.target.parentElement.id;
//   let taskInfo = getIdxAndTask(id);

//    take old title from it
//   let oldTitle = taskInfo?.task?.title;
//   let idx = taskInfo?.idx;

//    and show it into Form
//   document.getElementById("taskInput").value = oldTitle;

//    take new title entered into from
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     let fd = new FormData(e.currentTarget);

//     let newTitle = fd.get("taskInput");

//     editTask(id, newTitle);

//     document.getElementById("taskInput").value = "";
//   });
// }

// //* add new task
// form.addEventListener("submit", (e) => {

//   e.preventDefault();

//   console.log(e.target);
//   console.log(e.currentTarget);
//   console.log(e.target.parentElement);

//   let fd = new FormData(e.currentTarget);
//   let taskTitle = fd.get("taskInput").trim();
//   addTask(taskTitle);

//   // e.currentTarget.reset(); // to clear
//   // FormData.set("taskInput", "")

//   document.getElementById("taskInput").value = "";
// });

//* we need to create handle edit and add new task button / forms behavious at same function

let editingTaskId = null;

function editTaskBtn(e) {
  const li = e.target.closest("li");
  const id = li.id;

  const taskInfo = getIdxAndTask(id);
  const oldTitle = taskInfo?.task?.title;

  document.getElementById("taskInput").value = oldTitle;

  editingTaskId = id; // 🔥 switch to edit mode
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fd = new FormData(e.currentTarget);
  const title = fd.get("taskInput").trim();

  if (!title) return;

  if (editingTaskId) {
    editTask(editingTaskId, title);
    editingTaskId = null;
    document.getElementById("taskInput").value = "";
  } else {
    addTask(title);
    document.getElementById("taskInput").value = "";
  }
});

//* SOLUTION

//! this logic is very weak
// allTasksUl.addEventListener(
//   "click",
//   (e) => {
//     // e.stopPropagation();
//     console.log(e.target.className);

//     if (e.target.className == "check-btn") {
//       checkTaskBtn(e);
//     } else if (e.target.className == "delete-btn") {
//       deleteTaskBtn(e);
//     }
//   }
// );

//write logic with .closest
allTasksUl.addEventListener("click", (e) => {
  // for check btn
  let checkBtn = e.target.closest(".check-btn");
  if (checkBtn) {
    checkTaskBtn(e);
  }

  //for delete btn
  let deleteBtn = e.target.closest(".delete-btn");
  if (deleteBtn) {
    deleteTaskBtn(e);
  }

  // for edit btn
  let editBtn = e.target.closest(".edit-btn");
  if (editBtn) {
    editTaskBtn(e);
  }
});

//* extra improvments
//  use of fragment (optional)
//TODO  use of dataset-*
