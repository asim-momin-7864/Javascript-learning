//* Advance Object Properties Manipulation
// SDE-2 SDE-3 level interviews ask

// We understnad this concept with one interview Question
// Math.Pi --> value is 3.141592....
//? can we chnage it ? can we overwrite it ?

console.log(Math.PI); // --> 3.141592653589793

Math.Pi = 100;
console.log(Math.PI); // --> 3.141592653589793
//* Value doesn't overwrite
//? Why ?

// There are some hidden properties that we cannot direct see in browser console
// to see them we need to use special methods

//* getOwnPropertyDescriptor

let result = Object.getOwnPropertyDescriptor(Math, "PI");
// we need to pass 2 arguments

// 1st --> Math (Object / Module)
//2nd --> "Pi" (key)

console.log(result);
/*
OUTPUT --> (properties)

{
    value: 3.141592653589793,
    writable: false,
    enumerable: false,
    configurable: false
}

- enumerable means iteratable through loops

* --> Our Math.PI value is cannot overwrite, we cannot make writable property "true" this is hardcoded into very depth

*/

//------------------------------------------------------------------------------------

//? So can we make our Object-properties like this ? non-changable, non-iteratable

const chai = {
  name: "Ginger chai",
  price: 250,
  isAvailable: true,
};

console.log(chai); // --> { name: 'Ginger chai', price: 250, isAvailable: true }

// see its properties ( we get properties of individual key-value pair only)
console.log(Object.getOwnPropertyDescriptor(chai, "name")); // here we only key properties of "name" key-value pair

/*
OUTPUT -->

{
  value: 'Ginger chai',
  writable: true,
  enumerable: true,
  configurable: true
}

*/

// property is writable, so we can change value

chai.name = "lemon chai";
console.log(chai.name); // --> lemon chai

//* How to manipulate properties
//* defineProperty

// manipulate property
Object.defineProperty(chai, "name", {
  writable: false,
});

//check
console.log(Object.getOwnPropertyDescriptor(chai, "name"));

/*

OUTPUT -->

{
    value: 'lemon chai',
    writable: false,
    enumerable: true,
    configurable: true
}

*/

// now try to change name
chai.name = "Masala chai";
console.log(chai.name); // --> lemon chai

//---------------------------------------------------------------------------
//* Object Iteration tip (Out of topic point)

// for (const [key, value] of chai) { } //! chai is not iterable - this is not due to we make enumurable false property, also we only make "name" key-value non-enumerable not whole Object
//* objects are iterable or not depends on situations
// but we cannot use here for-of

//* if you want to use then convert Objects key-value pairs into Array by using .entries(method)
for (const [key, value] of Object.entries(chai)) {
  console.log(`${key} :: ${value}  `);
}

/*
OUTPUT --> 

name :: Masala chai
price :: 250
isAvailable :: true

*/

//* We add one condition also to avoid code failure "Code Phatna !!"

const tea = {
  name: "Ginger chai",
  price: 250,
  isAvailable: true,
  orderTea: function () {
    console.log("One special chai");
  },
};

//! Code with check
// for (const [key, value] of Object.entries(tea)) {
//   console.log(`${key} :: ${value}  `);
// }

/*

name :: Ginger chai
price :: 250
isAvailable :: true

! we dontwant this, maybe beacuse we are using key-values in further operation 
orderTea :: function () {
    console.log("One special chai");
  }

*/

//* Code with check - this is write way if you want to use for-of with Objects
for (const [key, value] of Object.entries(tea)) {
  if (typeof value !== "function") {
    console.log(`${key} :: ${value}  `);
  }
}

/*
OUTPUT --> 

name :: Masala chai
price :: 250
isAvailable :: true

*/

//---------------------------------------------------------------------------

// we make enumerable : false, so it is not iterable

//* But check before making non-enumerable
// mostly we use for-in loop - easy way
for (let key in chai) {
  console.log(`${key} :: ${chai[key]}`);
}

/*
OUTPUT --> 

name :: lemon chai
price :: 250
isAvailable :: true

*/

// manipulate property
Object.defineProperty(chai, "name", {
  writable: false,
  enumerable: false,
});

console.log(Object.getOwnPropertyDescriptor(chai, "name"));

/*

OUTPUT --> 
    {
    value: 'lemon chai',
    writable: false,
    enumerable: false,
    configurable: true
    }

*/

//! After making "name" key-value pair non-enumerable (Remeber we are not making whole Object non-enumerable)

for (let key in chai) {
  console.log(`${key} :: ${chai[key]}`);
}

/*
OUTPUT -->

price :: 250
isAvailable :: true


 - we are not getting "name" kye-value pair

*/
