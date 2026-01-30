
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

//* Only Forward (parent ---> child)

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

//  