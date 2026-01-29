//* Conversion into Number

// string => number
let score1 = "33";

let scoreNum1 = Number(score1);
console.log(typeof scoreNum1); // => number
console.log(scoreNum1);

// string => number
let score2 = "33abc";

let scoreNum2 = Number(score2);
console.log(typeof scoreNum2); // => number
console.log(scoreNum2); //! => NaN

// null => number
let score3 = null;

let nullNumber = Number(score3);
console.log(typeof nullNumber); // => number
console.log(nullNumber); //! => 0

// boolean => number
let score4 = true;

let booleanNum = Number(score4);
console.log(typeof booleanNum);
console.log(booleanNum); // true => 1, false => 0

//* Conversion into boolean

// number => boolean
let isOn1 = 1;

let isOn1Boolean = Boolean(isOn1);
console.log(typeof isOn1Boolean);
console.log(isOn1Boolean); // 1 => true, 0 => false

let isOn2 = -5;
console.log(Boolean(isOn2)); // except 0 , all -negative & +positive numbers are true

// string => boolean
let isOn3 = "";
console.log(Boolean(isOn3)); //* => false

let isOn4 = "AK";
console.log(Boolean(isOn4)); // => true

//* String => boolean

let someNumber = 453;
let stringNum = String(someNumber);
console.log(stringNum);
console.log(typeof stringNum);
