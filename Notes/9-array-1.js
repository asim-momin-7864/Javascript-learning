//  () - paranthesis
//  [] - brackets
//  {} - Cursly Bracesis

//* Array

// declaring syntax
const myArr1 = [0, 1, 2, 4, true, "AM", "344"];
console.log(myArr1[3]);

// other declaring syntax
const myArr2 = new Array(
  "Spiderman",
  "Batman",
  "Baymax",
  "Superman",
  "Dr. Animo"
);
console.log(myArr2[3]);

//* methods

// These two push & pop method work at back side
myArr2.push("Iron Man");
myArr2.push("Ben 10");
myArr2.pop();
console.table(myArr2);

// These two unshift and shift method work at front side  (same work as push, pop but direction is opposite)
// but when we add element at first , we are moving all values by one , It is unoptimized operation
myArr1.unshift(9);
myArr1.unshift(8);
myArr1.shift();
console.table(myArr1);

console.log(myArr1.includes(9)); // => true

console.log(myArr1.indexOf("AM")); // => 6
console.log(myArr1.indexOf(100)); // => -1 (-1 means that value doesnot exists)

// array --> string
const newArrayString = myArr1.join();

console.table(myArr1);
console.log(typeof myArr1);

console.log(newArrayString);
console.log(typeof newArrayString); // => string

//* slice & splice - Interview Questions ask here

const myArr3 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
console.log("Original Array", myArr3);
/*

 Original Array 
 [
   0, 1, 2, 3, 4, 5,
   6, 7, 8, 9, 10,
  11
]

*/

// slice - make copy of orginial and all slicing on it and return , Does not affect orginial array
const myArr3withSlice = myArr3.slice(3, 7);
console.log("myArr3 with slice", myArr3withSlice); // =>  myArr3 with slice [ 3, 4, 5, 6 ]

//? lets check does our original array myArr3 will change or not ?
console.log("Checking original myArr3 after slice", myArr3); // => no it not change

// splice - it appy slicing operation on orginal array and return that sliced subarray and orginal array changed
const myArr3withSplice = myArr3.splice(2, 5);
console.log("myArr3 with splice", myArr3withSplice); // => myArr3 with splice [ 2, 3, 4, 5, 6 ]

//? let check does splice affect orginial array ?
console.log("Checking original myArr3 after splice", myArr3); // => Yes it change
/* 

Checking original myArr3 after splice 
[
  0,  1,  7, 8,
  9, 10, 11
]

*/
