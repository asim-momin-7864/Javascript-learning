/*

* Temporal

The Temporal object enables date and time management in various scenarios, 
including built-in time zone and calendar representation, 
wall-clock time conversions, 
arithmetics, formatting, and more. 
It is designed as a full replacement for the Date object.

* In future as Temporal support grow for all Browsers and Nodejs environment use it.

*/

//* Date

// declaring, This syntax create object
let myDate = new Date();
console.log(myDate); // => 2025-12-27T16:42:38.115Z

//methods
console.log(myDate.toDateString()); // => Sat Dec 27 2025
console.log(myDate.toISOString()); // => 2025-12-27T16:43:49.704Z
console.log(myDate.toJSON()); // => 2025-12-27T16:43:49.704Z
console.log(myDate.toLocaleDateString()); // => 12/27/2025
console.log(myDate.toLocaleString()); // => 12/27/2025, 10:15:36 PM
console.log(myDate.toLocaleTimeString()); // => 10:15:36 PM
console.log(myDate.toString()); // => Sat Dec 27 2025 22:15:36 GMT+0530 (India Standard Time)
console.log(myDate.toTimeString()); // => 22:15:36 GMT+0530 (India Standard Time)
console.log(myDate.toUTCString()); // => Sat, 27 Dec 2025 16:45:36 GMT

// type of Date
console.log(typeof myDate); // => object

// Declaring specific date
let specificDate1 = new Date(2022, 6, 14);
console.log(specificDate1); // => 2022-07-13T18:30:00.000Z
console.log(specificDate1.toDateString()); // => Thu Jul 14 2022

let specificDate2 = new Date(2022, 0, 14);
console.log(specificDate2.toDateString()); // => Fri Jan 14 2022,
// In this method, when we pass month as argument it start from '0'
// Also you can pass more arguments like Hour, Minutes, Seconds

let specificDate3 = new Date("2023-01-14");
console.log(specificDate3.toDateString()); // => Sat Jan 14 2023, Here month start from 1 in string format

//* Time stamp

let myTimeStamp1 = Date.now(); // under the hood uses same object invoke mechanisum
console.log(myTimeStamp1); // => 1766854730135, Here it does not return object it return value in milliseconds from 1 JAN 1970 (fixed reference point) to current date

console.log(specificDate3.getTime()); // => 1673654400000, this syntax we get object so we can use methods, Now it return value in milliseconds

//* This value format in milliseconds is become easy to compare, beacuse time is hard to compare
// so use if comparing in app logic , like hotel booking rooms, users time stamp recording to find whihc user did task first or like that
console.log(myTimeStamp1 > specificDate3.getTime()); // => true

// easy formula to convert milliseconds --> seconds
console.log(Date.now() / 1000); // => 1766855198.233
console.log(Math.round(Date.now() / 1000)); // => 1766855249

// this Date object have more methods to get specific info like getDate, getTime, getMonth, getFullYear...

//* .toLocalString arguments for defining specific formats ( use ctrl + space to see options)
console.log(specificDate1.toLocaleString("en-IN", { weekday: "long" })); // => Thursday
