//* Array Merge

const marvelHeros1 = ["thor", "ironman", "spiderman"];
const dcHeros1 = ["superman", "flash", "batman"];

//! push won't merge arrays and make one array
marvelHeros1.push(dcHeros1);
console.log(marvelHeros1); // It add whole array as element

// concat - to merge arrays
const marvelHeros2 = ["thor", "ironman", "spiderman"];
const dcHeros2 = ["superman", "flash", "batman"];

const allHerosWithConcat = marvelHeros2.concat(dcHeros2);
console.log(allHerosWithConcat);

// spread operator - analogy to understand think like you take 🍷 and drop on floor and it pieces ..... spread all over the floor, like this it spread all elements of array / object individually

const marvelHeros3 = ["thor", "ironman", "spiderman"];
const dcHeros3 = ["superman", "flash", "batman"];

const allHerosWithSpread = new Array(...marvelHeros3, ...dcHeros3);
console.log(allHerosWithSpread);

// have multiple diementional / layer arrays --> one single layer array

const myComplexArr = new Array(
  1,
  2,
  4,
  [4, 4, 6, 8, [7, 8, 1, 11, 44], 5, 66, 98],
  11,
  22,
  33
);
console.log(myComplexArr);

const singleArr = myComplexArr.flat(3); // as argument we provide deepth, we can provide "infinite" argument also  then it automatically go to last deepth layer / diemention
console.log(singleArr); // one single layer Array

// Converting other data types into Array

// Array.isArray
console.log(Array.isArray("Hitesh")); // => false

// Array.from
console.log(Array.from("Hitesh")); // => [ 'H', 'i', 't', 'e', 's', 'h' ]

/* 

* Convert Object to Array

Main Syntax

Array.from(arrayLikeOrIterable, mapFn?, thisArg?)

   - arrayLikeOrIterable → something that looks like an array (object with length) or an iterable (like Set, Map)

   - mapFn (optional) → function to transform each item

   - thisArg (optional) → value of this inside mapFn


!    Normal objects are NOT directly convertible using Array.from()
     They must be array-like or iterable.

*/

// 1️⃣ Object with length (array-like object)

const obj = {
  0: "apple",
  1: "banana",
  2: "mango",
  length: 3, // need to mention
};

const arrFromObj1 = Array.from(obj);
console.log(arrFromObj1); // => [ 'apple', 'banana', 'mango' ]

/*
✔ Works because:
numeric keys (0,1,2)
has length
*/

//! ❌ Normal object (won’t work)

const user = {
  name: "Asim",
  age: 22,
};

/*
no length
not iterable
*/

const arrFromObj2 = Array.from(user);
console.log(arrFromObj2); // => [] or if even you add length it say => [ undefined, undefined ]

//* Correct way

// object --> array of values

// 1) by values
console.log(Object.values(user)); // => [ 'Asim', 22 ]

// 2) by keys
console.log(Object.keys(user)); // => [ 'name', 'age' ]

// 3) by entries => individual array key-value pairs 
console.log(Object.entries(user)); // => [ [ 'name', 'Asim' ], [ 'age', 22 ] ]


// Array.of - to make array from values | similar work like Array.from
let score1 = 100;
let score2 = 200;
let score3 = 300;

console.log(Array.of(score1, score2, score3)); // => [ 100, 200, 300 ]

