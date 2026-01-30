//? What is Prototype ?

/*
-->
-  prototype is default behaviour / core working mechanism of Javascript , we also called "prototypic behaviour"
- In JS everything is Object, or say Everything is made from Object 

------------------------------------------------------------------------

*  Diagram  (also get in screenshot in Dir)  

function()  ----->
prototype


Array ---->                 Object    -----------------> Null
prototype                     prototype


String  --->
prototype

--------------------------------------------------------------------

- every element / component have thier own prototype (default properties and methods) 

- Inside each element prototype there is prototype of its parents also exists, then again inside that parents prototype thier also its parents (means first elements grand parents prototype exists ) ... and it continious
  Until we reached to Object's prototype ,thats is end after that we get null (although there is few methods get and set but they are diffetent  )

- Object does not have any parent 

* - One interesting nature of JS

if it does not find any method or property in that elements prototype then it go into deepth into its parent's prototype and try to finds that property or method , if not found then go into more futher into deepths of its grandparent's prototype

prototype -----> prototype ----->(Object) prototype -----> Null 

- Due to this nature and everything made from Object , other elements like function, array behave like Object also 

- we will see its example also below

*/

//* Example to show other elements like function, array behave like Object also

// create one function
function additionTwo(num) {
  return num + 2;
}

// I try to create key-value like Object in to this function
additionTwo.username = "Luffy";

// working - normally
console.log(additionTwo(5)); // -> 7

// accessing its key-value pair
console.log(additionTwo.username); // -> Luffy

//? how is this possible ?
// this is possible due to above interesting JS nature

// ----------------------------------------------------------------------------------------------

//* how .prototype looks

console.log(additionTwo.prototype); // -> { } 
// it look like it is empty object but it is not empty, it is not made for visible, it is for internal core to use and access

