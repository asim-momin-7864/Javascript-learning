//* this Keyword

let user1 = {
  username: "Luffy",
  followers: 34000,
  sayWelcome: function () {
    // "this" refer to this current "user1" object, and then by . syntax we can access object fields
    console.log(`Welcome! ${this.username}`); // =>  Welcome! Luffy
    console.log("this keyword here refer to =>", this); // => It print user1 objects
  },
};

user1.sayWelcome();

// more activity
user1.username = "Sammee";
user1.sayWelcome();

//? So if we use this in code directly within global scope, then whom to it refer ?
console.log(this); //* => {}  In Node environment it refer to empty object
//* BUT in browser it is different, It refer to window object

//============================================ARROW FUNCTIONSs==========================================

/*

2 more functions
arrow func, this
hold/store on variable
explicite arrow 
explicite arrow how to return obj
*/

//* normal func declaration
function addOne(num) {
  console.log(this); //* here this refer to its parent "addOne func"
  return num + 1;
}

console.log(addOne(4));

/*

"this" when use in functions ,loops, ...many
* it give detailed information about it

=>

<ref *1> Object [global] {
  global: [Circular *1],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    Symbol(nodejs.util.promisify.custom): [Getter]
  },
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    Symbol(nodejs.util.promisify.custom): [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  structuredClone: [Function: structuredClone],
  atob: [Function: atob],
  btoa: [Function: btoa],
  performance: [Getter/Setter],
  fetch: [Function: fetch],
  crypto: [Getter],
  navigator: [Getter]
}

*/

//* func hold in var - this is also normal func just syntax is different
let addTwo = function (num) {
  console.log(this); //* here this refer to its parent "addTwo func"
  return num + 1;
};

console.log(addTwo(6));

//* arrow func

// actual arrow function syntax
() => {};

// hold / store on variable
let addThree = (num) => {
  return num + 3;
};

console.log(addThree(10)); // => 13

// explicite arrow function

// When use {}  need to use return
// when use nothing / () no need to use return

// nothing - no {} ()
let addFour = (num) => num + 4;
console.log(addFour(10)); // => 14

// use paranthesis ()
let addFive = (num) => (
    num + 5
);
console.log(addFive(10)); // => 15

// how to return object in explicite arrow function
let addSix = (name) => (
    {
        name: name,
        price: 9000,
    }
)

console.log(addSix("hero")); // => { name: 'hero', price: 9000 }
