/* =========================================================
🧠 TODO APP — IMPROVEMENT NOTES (SELF REVIEW)
========================================================= */

/* =========================================================
! 1. Missing Safety Check After getIdxAndTask()
---------------------------------------------------------
❌ Problem:
toggleTask(), editTask(), deleteTask() assume getIdxAndTask() always returns value.

⚠ Effect:
If id is invalid → app crashes (Cannot read properties of undefined).

✅ Fix:
const taskInfo = getIdxAndTask(id);
if (!taskInfo) return;
========================================================= */


/* =========================================================
! 2. Unnecessary Array Reassignment in toggleTask()
---------------------------------------------------------
❌ Problem:
tasks[idx] = task;

⚠ Effect:
Redundant operation (object reference already updated).

✅ Fix:
task.isDone = !task.isDone;
(remove tasks[idx] = task)
========================================================= */


/* =========================================================
! 3. loadTasksLocal() Does Not Re-render UI
---------------------------------------------------------
❌ Problem:
Reload loads state but does not update DOM.

⚠ Effect:
State changes but UI stays outdated.

✅ Fix:
loadTasksLocal();
fetchAllTasks();
========================================================= */


/* =========================================================
! 4. Weak Defensive Coding in Core Functions
---------------------------------------------------------
❌ Problem:
Functions assume valid input types.

⚠ Effect:
Unexpected runtime bugs if wrong type passed.

✅ Fix:
if (typeof id !== "string") return;
if (!title || typeof title !== "string") return;
========================================================= */


/* =========================================================
! 5. getIdxAndTask() Double Search (Minor Inefficiency)
---------------------------------------------------------
❌ Problem:
find() then indexOf() → 2 loops.

⚠ Effect:
O(2n) instead of O(n).

✅ Better:
const idx = tasks.findIndex(t => t.id === id);
if (idx === -1) return;
const task = tasks[idx];
========================================================= */


/* =========================================================
//* 6. Naming Improvement
---------------------------------------------------------
fetchAllTasks() → misleading name.

⚠ Effect:
Sounds like API fetch, but it's rendering.

✅ Better Name:
renderTasks()
========================================================= */


/* =========================================================
//* 7. Console.log in Production Code
---------------------------------------------------------
❌ Problem:
console.log() left inside logic.

⚠ Effect:
Noise, unclean production code.

✅ Fix:
Remove logs after debugging.
========================================================= */


/* =========================================================
//* 8. State Mutation Pattern Can Be Cleaner
---------------------------------------------------------
Current:
task.isDone = task.isDone ? false : true;

Better:
task.isDone = !task.isDone;

Cleaner, more readable.
========================================================= */


/* =========================================================
//* 9. Re-render Strategy (Optimization Awareness)
---------------------------------------------------------
Current:
allTasksUl.innerHTML = "";

⚠ Effect:
Full DOM rebuild every update.

? Optional Improvement:
Use DocumentFragment for batch rendering.
(Not necessary now, but good practice)
========================================================= */


/* =========================================================
//* 10. Separation of Concerns Can Improve
---------------------------------------------------------
Currently:
Logic + Storage + DOM in one file.

⚠ Effect:
Harder to scale later.

Future Improvement:
- state.js
- storage.js
- ui.js
========================================================= */


/* =========================================================
? 11. Improve Editing UX
---------------------------------------------------------
Currently:
Editing mode controlled by editingTaskId.

? Optional Improvement:
Change button text to "Update Task" when editing.
Clear form visually after edit.
========================================================= */


/* =========================================================
? 12. Add Filter Feature (Next Upgrade)
---------------------------------------------------------
Implement:
- All
- Active
- Completed

Helps practice derived state logic.
========================================================= */


/* =========================================================
📈 OVERALL LESSONS
---------------------------------------------------------
✔ Always validate return values
✔ Avoid redundant operations
✔ UI must re-render after state change
✔ Prefer clean naming
✔ Simpler logic > clever logic
✔ Debug logs should not stay in final code
✔ Defensive coding prevents crashes
========================================================= */
