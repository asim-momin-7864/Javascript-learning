/* 
* Datatype summary for interview perspective

* Datatype are categorizeds on -
- How they store data into memory 
- How they access

* Two categories of datatypes into divided
   1) Primitive 
   2) Non-primitive

* Primitive datatypes :- 
- String
- Number (Not float like type in JS)
- Boolean
- null
- undefined
- Symbol ( used to make variable / value unique)
- BigInt 

*/

//* Examples

// Number (No float type, Decimal values also store into Number )
let temperature = 100.45;

// BigInt
let bigNumber = 2343234875n;

// null
let userInput = null;

// Symbole
let id1 = Symbol("123");
let id2 = Symbol("123");

console.log(id1 === id2); // => false (even value are datatypes are same but it make it unique )

/*

* Non-Primitive (Reference Type) :- Their all's datatype is object
- Array
- Object
- Function



*/

//* Examples

// Array
let heros = ["Spiderman", "Superman", "Aquaman"];

// object
let animalNames = {
  Cat: ["Tom", "Rose", "Price"],
  Dog: "Jerry",
};

// Function
let meet = function () {
  console.log("Hello");
};
meet();

// typeof - function to identify datatypes
console.log(typeof meet); //* => object function is a datatype of function

//Bigint
console.log(typeof bigNumber);

// null
console.log(typeof userInput); //* => object

// array
console.log(typeof heros); //* => object

// object
console.log(typeof animalNames); //* => object

/*
? JS is Dynamically Typed vs Static Typed ?

   JavaScript is a dynamically typed programming language.
   This means that you do not need to explicitly declare the data type of a variable when you create it,
   and the type of a variable can change at runtime based on the value it holds.


* Static Typing via TypeScript
   While JavaScript is dynamically typed by nature,
   languages like TypeScript (a superset of JavaScript) add static typing capabilities.
   TypeScript allows developers to optionally add type annotations,
   which can help catch type-related errors during development (compile time) before the code runs in production,
   providing more robust codebases, especially for large projects.

*/

//========================================================================================================================

/*

* Memory types :- 
  In early languages we have to dedicatedly need to Reserve Memory and Free-up Memory  manually
  But in current morden lanuages we dont have much control on memory, language automatically handles garbage collection, memory allocation

  Types :- 
  1) Stack Memory :- All primitive uses, It gives us copy of value
  2) Heap Memory :- All non-primitive uses, It gives us memory address (reference)

  Diagram [screenshots/stack_and_heap.png] 

*/

// Example of Stack Memory

let personOne = "Superman";
let personTwo = personOne;
personTwo = "Batman";

console.log(personOne); // => Superman value is still their, beacuse we just pass its copy
console.log(personTwo);

// Example of Heap Memory

let car1 = {
  brand: "Mercedes",
  color: "white",
};

let car2 = car1;

car2.color = "black";

console.log(car1.color); // => black
console.log(car2.color); // => black
