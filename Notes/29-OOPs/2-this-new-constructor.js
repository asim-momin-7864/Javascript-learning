//* OOPs

//* Object Literal : Creating Object, Object is base unit of js language

//* Object
const user = {
  username: "Hamada",
  loginCount: 24,
  isLoggedIn: true,
  greeting: function () {
    console.log(`hello! ${this.username} `); // this keyword represent context means we are talking about which user object, if there are other similar object then what
    console.log(" this  --> ", this); // this represent user object
  },
};

// accessing  properties
console.log("username --> ", user.username);

// accessing methods and executing

// refernce
console.log("method refernce --> ", user.greeting);

// executing
console.log("method executing --> ", user.greeting());

//-------------------------------------------------------------------------------------------

//? Why we get need of Constructor (new class) ?

//* Reason 1: if i need to make other user object having similar fields then i need to do copy past again

let user2 = {
  username: "king",
  loginCount: 2,
  isLoggedIn: false,
  greeting: function () {
    console.log(`hello! ${this.username} `);
    console.log(" this  --> ", this);
  },
};

//? Reason 2:  why we create New Multiple Instances from one Object / Class, ...  using "new" keyword ?   Why we cannot use single insatnce ?

// lets understand this with function example

// one function
function displayUsers(username, age, email) {
  // myUsername = username; but we moslty keep same names
  // username = username;  if we want same name for var in function as argument to store, this way cause some issues
  this.username = username; // so we use "this" to tell username in this function
  this.age = age;
  this.email = email;

  return this; // also if we are using "new" keyword and creating instances for this function we dont need write "return this" constructor automatically do this
  // but explicitly writting it is good practice
}

// userOne created
const userOne = displayUsers("Hamada", 12, "hamada@g.com");

const userTwo = displayUsers("King", 24, "king@kong.in");

console.log(" userOne --> ", userOne); /* 

* --> working currectly when we use that function once only, means create only userOne 
    username: 'Hamada',
    age: 12,
    email: 'hamada@g.com'

 - it give use whole function with detaile properties also (that isjust due to return this ), but working 

 ! --> when we create userTwo with same function insatnce , this time it wont working 
 ! userOne is giving output --> 

    username: 'King',
    age: 24,
    email: 'king@kong.in'

*/

//* That's why we need to create different insatnces to avoid over writting of values

const userThree = new displayUsers("Luffy", 18, "luffy@op.com");
const userFour = new displayUsers("Gojo", 28, "gojo@op.com");

console.log("userThree --> ", userThree); // userThree -->  displayUsers { username: 'Luffy', age: 18, email: 'luffy@op.com' }
// worked perfectly

//-------------------------------------------------------------------------------------------

/*

* Few points about "new" keyword working

- first it creat new empty object
- new keyword call a constructor function
- constructor func pack all arguments and all definition and return to you back
- then all these arguments and all are get injected into "this" keyword 
- you get all these arguments and all in this keyword

*/

//-------------------------------------------------------------------------------------------

//* constructor

console.log(userThree.constructor); // --> [Function: displayUsers]
// constructor property is refernce of it self , means refernce of displayUser function

//  (property) Object.constructor: Function
// The initial value of Object.prototype.constructor is the standard built-in Object constructor

//-------------------------------------------------------------------------------------------

//*  instanceof Operator
// One operator to check does does insatnce if created from original / wanted object / class

console.log(
  "is userThree is instance of displayUser func --> ",
  userThree instanceof displayUsers,
); // --> true
