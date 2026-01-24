//  IIFE - Immediately Invoked Function Expression

//?  Why we need it ?
/*
We need IIFE (Immediately Invoked Function Expressions) in JavaScript primarily 
for scope isolation, to prevent variables from accidentally becoming global and conflicting with other code.

The core reasons are:
* Prevent Global Scope Pollution: 
Variables declared within an IIFE are local to that function's scope 
and do not leak into the global namespace, 
which helps avoid naming collisions, especially when integrating different libraries or scripts. 
*/

// IIFE
(function chain() {
  console.log(`DB CONNECTED 1`);
})(); // => DB CONNECTED 1

// Named IIFE - when we use normal func with name to create IIFE
(function userDisplay(name) {
  console.log(`username is ${name}`);
})("Sammy"); // => username is Sammy

//* this is how we pass arguments also

// IIFE (when we use arrow func to create IIFE it called IIFE / unnamed IIFE)
(apple = () => {
  console.log(`DB CONNECTED 2`);
})(); // => DB CONNECTED 2

//! when executing two or more IIFEs we need to mention termination of each IIFE, means when to end and when next start so use semcolons ";"

//* Example of when IIFE not terminate

(() => console.log(`Hii`))()
(() => console.log(`Hello`))()

/*

! ERROR it throw

Hii
E:\Javascript-learning\notes\16-IIFE.js:36
(() => console.log(`Hello`))()
^

TypeError: (intermediate value)(...) is not a function
    at Object.<anonymous> (E:\Javascript-learning\notes\16-IIFE.js:36:1)
    at Module._compile (node:internal/modules/cjs/loader:1761:14)
    at Object..js (node:internal/modules/cjs/loader:1893:10)   
    at Module.load (node:internal/modules/cjs/loader:1481:32)  
    at Module._load (node:internal/modules/cjs/loader:1300:12) 
    at TracingChannel.traceSync (node:diagnostics_channel:328:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:245:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47

Node.js v24.12.0

*/
