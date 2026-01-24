//* String Operations

// both string concatination
let str1 = "hello";
let str2 = "Asim";

let str3 = str1 + str2;
console.log(str3);


//* ECMA - 7.1.1 ToPrimitive
//! concatination when one is string & other is number cases 

//1 
console.log("1" + 2); // => 12

//2
console.log(1 + "2"); // => 12

//3 string and two numbers
console.log("1" + 2 + 2); // => 122
//? so why (same datatypes) numbers are not adding ? 

//4 start with two numbers datatype and end with string
console.log(1 + 2 + "2"); // => 32
//? so why this time numbers get added 

//* All these operations nature is define with some rules, when to choose which opeartion and how to treat datatype (For deep info check ECMA)



//! Avoid these operations syntax, Make code more readable

//* #1
console.log(3 + 4 * 5 % 3); // => 5
// Due to no paranthesis order of operations maybe not as you expected it follow ECMA rules, It is Bad practice

// use paranthesis to get your desire order of operations
console.log(((3 + 4) * 5) % 3); // => 2


//* #2
console.log(+true); // => 1 //! Avoid

console.log(+""); // => 0 //! Avoid


//* #3
let num1, num2, num3;

num1 = num2= num3 = 2 + 2; //! Avoid


//* #4 Topic - (not wrong pratice, we use it, Recommened  incrementale operators (preffix & suffix ). Visit MDN 

// in loops it show different behavious, here it showing same suffix behavious for both

let couter = 100;
console.log(++couter);
console.log(couter++);




//* Comparison Operators


// comparing same data type have no issues , it is simple

console.log(2 > 1);
console.log(2 >= 1);
console.log(2 < 1);
console.log(2 <= 1);
console.log(2 == 1);
console.log(2 != 1);



//* comapring between different datatypes
//! This may not give you your desire output

console.log("2" > 1); // => true (2 is converted into number)
console.log("02" > 1);


//* Comparison with null with zero (bcz mostly we assume null means nothing so probablly zero)

//! Very Unpredictable Behaviour / outputs 
console.log(null > 0); // => false //! So it say Null is not greater than Zero
console.log(null == 0); // => false //! So here it say Null is not equal to Zero

// Then we probaby think , Null smaller than zero , Like in -ve
console.log(null >= 0); // => true //! But, Here it says Null is greater than and equal to Zero 


//? Why this happens ? 
// Because it is not about value, it is about what rules (ECMA) it use while conversion, Thats why it becomes unpredicatable

// Also In js, The reason is that an equality check == and comparisons >, <, <=, >= work differently (use different algorithms)
// Comaprison operator converts null to a number, treating it as 0.

// That's why  
// 1st Operation (null > 0) is false
// and 3rd operation (null >= 0) is  true
 


//* Comparison with undefined
console.log(undefined == 0); // => false
console.log(undefined > 0); // => false
console.log(undefined < 0); // => false



//* Strict check (check datatype)
console.log("2" == 2);  // => true
console.log("2" === 2); // => false

