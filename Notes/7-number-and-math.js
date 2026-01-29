
//* Numbers

// normal declaration
const score = 400; 
console.log(score); // => 400

// declaration using object
const act_balance = new Number(3450.6457)
console.log(act_balance); // => [Number: 3450.6457], show in object form, ( both are same ) more detailed presentation 
// and in browser it show methods also 

// Methods

// toString
console.log(act_balance.toString()); // => 3450.6457, type of string

// toFixed
console.log(act_balance.toFixed(2));

// toPrecision 
//! Output may differ beacuse it depends on number and return string, carefully use

const num1 = 23.8966;
console.log(num1.toPrecision(3)); // => 23.9

const num2 = 123.8966;
console.log(num2.toPrecision(3)); // => 124

const num3 = 1123.8966;
console.log(num3.toPrecision(3)); // => 1.12e+3

// toLocalStrings
const hundreds = 10000000;
console.log(hundreds.toLocaleString());  // => 10, 000, 000 | by default US standards
console.log(hundreds.toLocaleString("en-IN"));  // => 1,00,00,000 | by indian standards
 
// ========================================== MATHS ========================================================
console.log(Math); // see in browser

console.log(Math.abs(-50)); // 50 | -ve => +ve
console.log(Math.round(4.6)); // => 5
console.log(Math.ceil(4.6)); // => 5
console.log(Math.floor(4.6)); // => 4
console.log(Math.min(6,52,7,9)); // => 6
console.log(Math.max(4,52,7,9)); // => 52

console.log(Math.random()); // generate 0 to 0.9
console.log((Math.random())*10); // to get number in single digit like .. 0,1,4,7..9
console.log(((Math.random())*10)+1); // to avoid 0 digit output case  

// random with limits

const min = 7;
const max = 14;

console.log((Math.random() * (max - min + 1)) + min ); // now we get values between min and max, (basic maths applied)

// 0 - 0.9  -->
// (7 + 1) --> the number here you gave thats first digit become max limits 0 - 0.9 numbers multiply and convert under that limits  &  + 1 to avoid 0 case 
// + 7 (so by adding min value our random value get increaded above min value)    
            



