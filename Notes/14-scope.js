// { } <= scope when comes with functions, loops, If-Else, ...  (dont include with objects)

/*
- global scope 
- block scope
- Global scope in Node and Browser is different

*/

let a = 10;
const b = 20;
var c = 30;

console.log(a);
console.log(b);
console.log(c);

// all print perfectly
//? Then why we make 3 keywords ?
// In scopes they behave differetly, Specially var

if (true) {
  let d = 40;
  const e = 50;
  var f = 60;
}

// console.log(d); // => It throw error, and say not define (GOOD)
// console.log(e); // => It throw error, and say not define (GOOD)
console.log(f); //! => It print 60, (BAD) variable should follow scope
//! Thats why for const values we use constant, but for variable values we created "let", Avoid to use

//* Global Scope
let g = 100;

if (true) {
  let g = 10; // This declaring variable get block level scope
  console.log("INNER g : ", g); // => if we declare same name variable in scope then its value becomes 10, otherwise it consider global variable 100
}

console.log("GLOBAL g :", g);

/*
INNER g :  10
GLOBAL g : 100

INNER g :  100
GLOBAL g : 100
*/

//* Nested Scope - in functions, if else , loops ...mix match between all these also

function one() {
  let username = "John";

  function two() {
    let website = "youtube.com";
    console.log(username + " " + website); //* It work beacuse - username is global variable for two func
  }

//   console.log(website); //! This will through error - out of scope variable accessing

  two(); // Execute two function
}

one(); // => John youtube.com


//========================="Hoisting"===============================

//* Expression - function declaring other type


// Normal function
console.log(addOne(100)); //* executing function before declaring and it work (hoisting) => 101

function addOne(num) {
    return num+1;
};
console.log(addOne(5)); // executing function after declaring (normal) => 6

//* Expression - declaring and storing function in variable called 
console.log(addTwo(200));//! executing function before declaring, expressions does not support hoisting => ReferenceError: Cannot access 'addTwo' before initialization

let addTwo = function(num) {
    return num+2;
};
console.log(addTwo(11)); // executing function after declaring (normal) => 13
