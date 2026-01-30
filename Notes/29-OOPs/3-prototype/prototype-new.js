//? What is Prototype ?

/*
-->
-  prototype is default behaviour / core working mechanism of Javascript , we also called "prototypic behaviour"
- In JS everything is Object, or say Everything is made from Object 

------------------------------------------------------------------------

*  Diagram  (also get in screenshot in Dir)  

function()  --------> \
prototype                  \
                                  \
                                   \
Array ------------->    Object    -----------------> Null
prototype                     prototype
                                  /
                               /
String  ---------->/
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
/* 

- it look like it is empty object but it is not empty, it is not made for visible, it is for internal core to use and access

* "this" keyword and its working in prototype
- this keyword is also connected to prototype
- It help to set / create context (context means who is calling, who is creating, who is accessing like which element it is, on which elements apply operation / methods ), we will understand it with one exmaple below with code

someElement.prototype -->  {  }

* One IMP Line ~ very deep line
* " that { } prototype means,  there is some default set methods and some internal properties , so their / that method's and propertie's "this" (context) is in that prototype { } "
* "prototype { }  = other all set hidden properties + 'this' (context) of that methods (prototype of that method)


- we will see one example on "this" how it set on context (below) 

*/

//* Example on "this" how it help to set context

// function

function dishAndPrice(name, price) {
  this.name = name;
  this.price = name;
  console.log(` Dish added into menu `);
}

// now lets create our own methods for function

// ( we using "new" keyword here to create instances, but dont worry later we will discuss on that too   )

/*

! - without "this"

dishAndPrice.prototype.tellMenu() = function() {
    console.log(`Menu : Dish name is ${name} and price is ${price}`);
};

 - suppose creating instances

let Pizza = new dishAndPrice("Veg Jumbo Pizza", 250 );
let Noodles = new dishAndPrice("Hakka Chilly Noodles", 80);

- execute our own methods

Pizza.tellMenu();

! Throw Error --> ReferenceError: name is not defined

* As we know both instances share same single prototype  and all these methods and properties are keep in prototype , so when any of instance called tellMenu method it get will get confused "which one is calling me ?" and "which name and price i will print ? " 


- To avoid this kind confusion we use "this" 
   
*/

//* with "this"

dishAndPrice.prototype.tellMenu = function () {
  console.log(`Menu : Dish name is ${this.name} and price is ${this.price}`);
};

let pizza = new dishAndPrice("Veg Jumbo Pizza", 250);
let noodles = new dishAndPrice("Hakka Chilly Noodles", 80);

pizza.tellMenu();
noodles.tellMenu();

/*
--> 
Menu : Dish name is Veg Jumbo Pizza and price is Veg Jumbo Pizza

Menu : Dish name is Hakka Chilly Noodles and price is Hakka Chilly Noodles

* Now, tellMenu is getting whos name and price i will print when who is calling me 
--->  here we tell it ,  "print name and price of which ever instance calling you"
 * this is context we are talking about and "this" keyword help to create it 
   
*/

// ---------------------------------------------------------------------

//* "new" keyword

/*

? so can we make and insert our own methods ? and transfer into instances and use it on them ?
--> Yes, using new keyword

lets understand this with Code example

*/

//* Example to understand "new" keyword

// function

function vehical(name, speed) {
  this.name = name;
  this.speed = speed;
  // need to define arguments then it get into context, and get access in custom methods also
  //! Other wise -->   The Speed of undefined is undefined

  console.log(` Vehical name is ${name} `);
}

// create own method
vehical.prototype.showSpeed = function () {
  console.log(`The Speed of ${this.name} is ${this.speed}`);
};

// instances

//! without "new"
// let mercedes = vehical("G-Wagon", 450);
// mercedes.showSpeed();

//! Throw Error --> Cannot read properties of undefined (reading 'showSpeed')

// we can create our own custome methods with the help of " .prototype"
// but transfering that methods into instance is not automatically happend
// and "new" keyword help to transfer that methods also, it actully do a lot of things, call constructor function and all

//* without "new"
let mercedes = new vehical("G-Wagon", 450);
mercedes.showSpeed();
// -->  Vehical name is G-Wagon
// -->  The Speed of G-Wagon is 450

//-------------------------------------------------------------
// extra info
// mercedes(); //! TypeError: mercedes is not a function, So dont try to execute like this
console.log(mercedes); // --> vehical { name: 'G-Wagon', speed: 450 }

//--------------------------------------------------------------

/*
* Theory behind working of "new" keyword (it is deep and hard to understand)

Here is what happens behind the scenes when the new keyword is used:

A new object is created: The new keyword initiates the creation of new Javascript object.

A prototypeis linked: The newly created object gets linked to the prototype property of the constructor function. 
This means that it has access to properties and menthods defined on the constructor's prototype.

The constructor is called: The constructor function is called with
the specified arguments and this is bound to the newly
created object. If no explicit return value is specified from the constructor, 
Javascript assume this, the newly created object, to be the intended return value.

The new object is returned: After the constructor function has been called,
if it doesn't return a non-primitive value (object, array, function, etc.) the newly created object is returned.


 */
