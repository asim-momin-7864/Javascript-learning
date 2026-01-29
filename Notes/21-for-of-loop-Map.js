//* for-of loop

/*

here object means not "JS object" here object means all iterable things
for (const element of object) {    
}

*/

let arr = [1, 2, 3, 4, 5];
for (const element of arr) {
  console.log(element);
}

let greeting = "Hello Word";
for (const letter of greeting) {
  console.log(letter);
}

//* Maps

/*

The Map object holds key-value pairs and remembers the original insertion order of the keys.
Any value (both objects and primitive values) may be used as either a key or a value.

*/

const myMap = new Map();

myMap.set("a", 1);
myMap.set("b", 2);
myMap.set("c", 3);

// accessing value by key
console.log(myMap.get("a")); // => 1




// how Map looks
console.log(" myMap => ", myMap); //  myMap =>  Map(3) { 'b' => 2, 'c' => 3, 'a' => 1 }

// iterate Map
const countriesMap = new Map();

countriesMap.set("IN", "India");
countriesMap.set("US", "America");
countriesMap.set("UK", "United Kingdom");
countriesMap.set("Fr", "France");

for (const element of countriesMap) {
  console.log(element);
}

/*

[ 'IN', 'India' ]
[ 'US', 'America' ]
[ 'UK', 'United Kingdom' ]
[ 'Fr', 'France' ]

*/

// when we try to iterate, Maps store key-values in array
// to access specific key or values

// we destruture array
for (const [key, val] of countriesMap) {
  console.log(`${key} is short form of ${val}`);
}

/*

IN is short form of India
US is short form of America
UK is short form of United Kingdom
Fr is short form of France

*/


//? Does for of loop work on JS object ?

const myObj1 = {
    name: "King",
    address: "bakers street, P-block "
};

for (const element of myObj1) {
    console.log(element);
};

//! => TypeError: myObj1 is not iterable
// plain JavaScript objects ({}) are not iterable by default