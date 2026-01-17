// for-each loop - is Higher Order Loop

/*

In JavaScript, higher-order usually refers to Higher-Order Functions (HOFs).
These are functions that treat other functions as data.

A function is considered "higher-order" if it does at least one of the following: 

* - Takes a function as an argument: It accepts another function (often called a "callback") to execute later.

  - Returns a function: It generates and outputs a new function as its result. 

Common Examples

You likely already use higher-order functions frequently through built-in JavaScript Array methods: 

1) .map(): Takes a function to transform every element in an array.
2) .filter(): Takes a function to decide which elements to keep in a new array.
3) .reduce(): Takes a function to combine all array elements into a single value.
4) .addEventListener(): Takes a function to run when a specific event (like a click) occurs. 

*/

let programming = ["JS", "java", "python", "Ruby"];

programming.forEach(function (element) {
  // this loop take callback functions (reference / declare there)  (means normal func, arrow func without name )
  console.log(element);
});

// variations

// arrow func
programming.forEach((element) => {
  console.log(element);
});

// pass reference

function printer(element) {
  console.log(element);
}

programming.forEach(printer);

//! do not execute
//! [X]  programming.forEach(printer(element))

//* Arguments of for-each loop
// element - 1st is element of array
// index - index of element in array
// fullArray - that whole array

programming.forEach((element, index, fullArray) => {
  console.log(
    `At ${index} Index : ${element} Element - Full Array : [${fullArray}]`
  );
});


/*

At 0 Index : JS Element - Full Array : [JS,java,python,Ruby]
At 1 Index : java Element - Full Array : [JS,java,python,Ruby]
At 2 Index : python Element - Full Array : [JS,java,python,Ruby]
At 3 Index : Ruby Element - Full Array : [JS,java,python,Ruby]
*/



// example of response from DB

let DBresponse = [
    {
        name: "java",
        extension: "java",
    },
    {
        name: "javascript",
        extension: "js",
    },
    {
        name: "python",
        extension: "py",
    },
];


DBresponse.forEach(element => {
    console.log(`${element["name"]} - ${element.extension}`);
});