/*

* Running Notes

"", ''
+ concatenations
`` - String interpolation
new String()  syntax and output in browser -> object
and their __proto__ methods 
learn string methods ( for sanitization) - browser & MDN and ( go thorugh all methods and write one Artical)


substring
slice (+, -) values
trim
replace - imp
other methods ...


*/

// some old string concatination (Avoid to use)
const name = "Asim"; // How to declare string (behind the scenese it also invoking object)
const repoCount = 20;

console.log(name + " have " + repoCount + " Repos in Github");


// Morden recommended way - String Interpolation
console.log(`Hello my name is ${name} and my repo count is ${repoCount}`);


// Another way of declaring strings ( we use Objects, this same logic uses behinde above direct declare string syntax also ) 
const gameName = new String("Hero Hamda Big");

// we get object with key(index)-value(string chracters) and we get lots of method for strings
// In browser we can see easily (visual presentation)

console.log(gameName[0]);
console.log(gameName.__proto__); // => object with methods

// few methods
console.log(gameName.length); // => 14
console.log(gameName.toLowerCase());
console.log(gameName.charAt(2)); // => r
console.log(gameName.indexOf("o")); // => 3

// slice
const newString1 = gameName.slice(2, 9); // we can give negative values to start from reverse side
console.log(newString1); // => ro Hamd

// trim
const newString2 = "  Asim   ";
console.log(newString2.trim()); // => Asim, work on white spaces and line terminators (\n) 


// if user type url -> "https://asim.com/asim momin", Brower dont understand white spaces it repace with "%20" 
const url = "https://asim.com/asim%20momin"

// replace
console.log(url.replace('%20', '-'));

// includes
console.log(url.includes("hero")); // => false

// splite
console.log(gameName.split(" ")); // => [ 'Hero', 'Hamda', 'Big' ]

 








