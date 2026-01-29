/*

- 2 way to declare objects

- 1) Object literals - this dont create singleton object, besides their is no difference
- 2) constructors - this create singleton object
  syntax - Object.create

- singleton concept (*need to learn about it more)

*/

//* Object literals
const userObj1 = {
  name: "Asim", // under the hood js automatically convert keys in string format
  "full name": "Asim MH Momin", // some odd cases
  age: 22,
  location: "Pune",
  isLoggedIn: false,
  lastLoginDays: ["Monday, Tuesday"],
};

// Value Accessing

//* by . - monstly we use this

console.log(userObj1.name);
console.log(userObj1.age);

//* by [] - This is also valid way to access values, and some cases we need this way to access values

//! cannot access
// console.log(userObj.full name)
// console.log(userObj."full name")

//* correct way
console.log(userObj1["full name"]); // we pass string, as we discussed js internally convert key into string value

//* Symbole in Object

// create symbole ( *need to learn more about symboles  )
const mySymbole1 = Symbol("symboleKey1");

// inster into object

//! it dont insert as symbole it insert as normal string key
userObj1.mySymbole1 = "symboleValue1";
console.log(userObj1); // =>   mySymbole1: 'symboleValue1'

// Correct Way

const userObj2 = {
  name: "King",
  age: 34,
  location: "Pune",
  isLoggedIn: false,
  lastLoginDays: ["Monday, Tuesday"],
  [mySymbole1]: "symboleValue1",
};

console.log(userObj2); // =>   Symbol(symboleKey1): 'symboleValue1'

// How to access symbole from object

// normal key
console.log(userObj2["age"]);
console.log(userObj2["isLoggedIn"]); // look in this [] syntax we pass string argument

// symbole accessing
console.log(userObj2[mySymbole1]); // no string argument passess, directly pass key argument/ key name

//* Object.freeze - lock object values

userObj2.email = "am@chatgpt.com";
console.log(userObj2);

Object.freeze(userObj2);

userObj2.email = "king@google.com";
console.log(userObj2); // => wont change

//* Methods (functions) in Object

const userObj3 = {
  country: "india",
  state: "MH",
  type: "saving",
  name: "HDFC",
};

// declaring method in
userObj3.greeting = function () {
  console.log("Hii! Customer");
};

//* accessing method
console.log(userObj3.greeting); // => [Function (anonymous)], we are not invoking methods, juts accessing, how it look in object

//* invoking

console.log(userObj3.greeting());
// => Hii! Customer
// => undefined
/* 
 
 (this extra undefined is getting because )
*  🧠 KEY RULE (Very Important)
  Every JavaScript function returns something
  If you don’t return explicitly → it returns undefined

 */

console.log(userObj3);

//* this keyword (we will see "this" in more details )

userObj3.sendInfo = function () {
  return `Bank Name is ${this.name} and it is located in ${this.state},${this.country}`;
};

console.log(userObj3.sendInfo()); // => Bank Name is HDFC and it is located in MH,india
