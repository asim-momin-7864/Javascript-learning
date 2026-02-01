//* Prototypic Inheritance

// Understand with One Goal and Example

//* Goal :- Our goal is our own custome created method should be available for that kind all elements
// e.g. if i create hello() method for Array then all Arrays should have this method automatically

// Example we take String

let myName = "Luffy      ";

console.log(myName.length); // -> 11

// length property is counting white spaces also
// so we want some property that give use actule length, remove spaces and the count
// give it name "trueLength"
//* and this method should be available in every String.
// Not only for parent/orginal element  and ints instances like using "new"
/* 
----------------------------------------------------------------
( 
consider this task only, for explaining inheritance concepts, 
otherwise this is very simple task we can use trim() method and then apply lenght() 
but consider this is very complex and lenghty taks i want to create
)
-------------------------------------------------------------------------
*/

//------------------------------------------------------------------------

//* Flow of inheritance of properties / methods (from which direction to where properties/methods are pass on)

//* IMP Diagram (flow of inheritance)

/*

<------- function    <--------\
                                              \
<------- Array  <----------  object  <----------- null
                                               /
<------- String <------------/

* Only Forward (parent ---> child)
! No backword (child ---> parent)

*/

//-----------------------------------------------------------------------------

//* Forward (parent ---> child)

// Undersatnd with One Example

/* 
I want one Method in all (Array, functions, Objects, ...etc)

As we know everything is object, so if we inject our custom method into Object. then
it will available in all Due to everything is created from Object and we know inheritance flow


* To access main Object Datatype / Array Datatype / String ...
we get them in "Object", "Array", "String" keywords

*/

// Creating and injecting our custome Method

Object.prototype.greeting = function () {
  console.log("Hello! Nice to meet you");
};

// create other elements / componets

// array
let myHeros = ["Superman", "Batman", "Iron Man"];

//  function
function userHello() {
  console.log("Good Morning User");
}

// object
let animal = {
  name: "parrot",
  ability: "fly",
};

//? lets try to test, does our flow of inheritance flow from parent --> child or not ?

// array --> it inherite
myHeros.greeting(); // --> Hello! Nice to meet you

// function --> it inherite
userHello.greeting(); // --> Hello! Nice to meet you

// object --> it inherite
animal.greeting(); // --> Hello! Nice to meet you

//* --> Yes, properties and methods flow of inheritance is from parent ----> child

//-------------------------------------------------------------------------------

//! backword (child ---> parent)

//? lets understand does our flow of inheritance flow backword ( from child --> parent or sibling) ?

// creating custome method for Array
Array.prototype.goodNight = function () {
  console.log("Good Night");
};

// we will use above created array, function, object again, to avoid declaring again

//* array --> it inherite
myHeros.goodNight(); //* --> Good Night

// object (parent) -->  //!  it not inherite
// animal.goodNight(); //! --> animal.goodNight is not a function

// function (sibling) -->  //!  it not inherite
// userHello.goodNight(); //! --> userHello.goodNight is not a function

//---------------------------------------------------

// So answer for our earlier task creating true length function for string

String.prototype.trueLength = function () {
  console.log(this.trim().length);
};

// using our custome method
myName.trueLength(); // --> 5

//------------------------------------------------------------------

//* Morden syntax VS old synatx for creating our custome properties and method and transfering them from one element to another
//* prototypal inheritance from desired element to desired element

//* #1 __proto__ (older synatx ) - we consider it is property

// let understand by example

// we create few objects

// living thing
const livingThing = {
  isGrowing: true,
};

// plant / tree
const plant = {
  name: "Apple Tree",
};

// fruit
const fruit = {
  haveSeeds: true,

  // we want it inherite plants properties
  // Syntax 1 (inside)
  __proto__: plant,
};

//Synatx 2 (outside)
plant.__proto__ = livingThing;

// lets check does our inheritance worked ?
console.log(fruit.isGrowing); // --> true
console.log(fruit.name); // --> Apple Tree

//---------------------------------------------------------------

//* #2 .prototype

const vehical = {
    haveFourWheels: true,
};

const car = {
    name : "Mercedes Benz S-Class",
};

//Morden Syntax
Object.setPrototypeOf( car, vehical );

console.log(car.haveFourWheels); // --> true



