/*

- if-else
- if else if else  (nesting)    
- switch

* Asked in interview
when case matched , it run all code below it except default - thats why we use break

- truthy, falsy value

- how to check empty Array
- how to check empty Object

3 false, 0, "" comparions cases

- Nullish Coalescing Operator (??): null undefined

- Terniary Operator

*/

//* We know bout if-else - so we skip that code

//* else if (nesting)

let balance = 34;

if (balance <= 10) {
  console.log(`Very Cold, Its below 10`);
} else if (balance <= 20) {
  console.log(`Cold, Its below 20`);
} else if (balance <= 30) {
  console.log(`Normal, Its below 30`);
} else if (balance <= 40) {
  console.log(`Hot, Its below 40`);
} else {
  console.log(`Invalid temperature! Try again`);
}

// switch

let month = 5;

switch (month) {
  case 1:
    console.log("Januray");
    break;
  case 2:
    console.log("February");
    break;
  case 3:
    console.log("March");
    break;
  case 4:
    console.log("April");
    break;
  case 5:
    console.log("May");
    break;
  default:
    console.log("Invalid Month");
    break;
}

//* Asked in interview
//* why use break keywords -
// when case matched , it run all code below it except default - thats why we use break

//* Truthy values and Falsy values
// these are values we assume / consider false and true with comapring or without condition

//Example

let email = "asim@google.com";

if (email) {
  console.log("Correct Email");
} else {
  console.log("Incorrect Email");
}
// => Correct Email

// Another example

if ([]) {
  console.log("Array Full");
} else {
  console.log("Array Empty");
}

// [] empty array consider true
//! This is not how we check array

//? Here we consider email string true but how ??? without checking / comparing

// because we consider some values by default true and false

/* 

* Falsy Values
false, 0, -0, BigInt 0n, "", null, undefined, NaN

* Truthy Values
true, "0", "false", " ", [], {}, function() {} <= this is empty func

*/

//* How to check Array

let myArray = [1, 3, 4, 5, 5, 67];

if (myArray.length == 0) {
  console.log("Array is empty");
} else {
  console.log("Array is not empty");
}

//* How to check Objects

let myObject = {
  name: "Jerry",
  balance: 34355,
  type: "saving",
};

// object --> array [keys] --> array.lenght == 0

if (Object.keys(myObject).length == 0) {    // keys method return array of keys
  console.log("Object is empty");
} else {
  console.log("Object is not empty");
}


//*  Nullish Coalescing Operator (??): null undefined

// when we are expecting values from 3rd party or external services like Databases,Firebase, Appwrite...
// but they may return null, undfined to avoid storing these values to variable we can keep alternative secondary source for same varuale also 
// if null, unfined came from first source

//for that we use Nullish Coalescing Operator


// Exampe - consider both values coming from sources
let val1 = 100 ?? 200;
console.log(val1); // => 100

// first source return null value
let val2 = null ?? 2000;
console.log(val2);  // => 2000

// we can add / assign my values 200 ?? 4000 ?? 455 ??... but mostly we use for 2-3


//* Terniary Operator - this is shorthand of IF-ELSE
// ( this is differnt from Nullish operator both have different work)
let dayTime = "AM";

// condition ? true : false
dayTime == "AM" ? console.log("Good Morning") : console.log("Good Nigt");







