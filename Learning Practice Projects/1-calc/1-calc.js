// // Calculator

// //TODO Taking user input as String "12 + 4"
// //TODO Removing white spaces
// //TODO convert it into number
// //TODO handle wrong inputs (letters)
// //TODO handle zero Divisions expressions
// //TODO Return Result or Error

// //Input
// let inputString = " 12  +  4  ";
// // console.log(inputString);

// let inputStringTrim = inputString.trim();
// // console.log("After trim", inputStringTrim);

// // Convert into number
// let InputNumber = Number(inputStringTrim);
// // console.log(InputNumber);

// // console.log("+" == "+");

// let sumArray = new Array(12, "+", 4);

// if (sumArray[1] == "+") {
//   // console.log(sumArray[0] + sumArray[2]);
// }

// let newArray = inputString.split(" ");
// // console.log(newArray);

// let newArrayTrimmed = inputStringTrim.split(" ");
// // console.log(newArrayTrimmed);

// // let result = 23 - 32;

// //=====================================================================================

// //* Above is Thinking and Core Logic i try to build  - TRY AND ERRORs

// //Below we make Proper Calc Logic

// // input
// let inputStr = "12*9";

// // Trim
// inputStr = inputStr.trim();

// // Array
// let inputArray = inputStr.split(" ");
// console.log(inputArray);

// // convert to number
// inputArray[0] = Number(inputArray[0]);
// inputArray[2] = Number(inputArray[2]);

// console.log(inputArray);

// // checking wrong inputs

// if (isNaN(inputArray[0] && isNaN(inputArray[2]))) {
//   console.log("Invalid Input please enter numbers");
//   return;
// }

// // operation base checking
// let result;

// // if (inputArray[1] == "+"){
// //     return result = inputArray[0] + inputArray[2];
// // } else if ( ) {

// // }

// switch (inputArray[1]) {
//   case "+":
//     result = inputArray[0] + inputArray[2];
//     break;
//   case "-":
//     result = inputArray[0] - inputArray[2];
//     break;
//   case "*":
//     result = inputArray[0] * inputArray[2];
//     break;
//   case "/":
//     if (inputArray[2] !== 0) {
//       result = inputArray[0] / inputArray[2];
//     } else {
//       console.log("Divide by 0 is not acceptable");
//     }
//     break;
//   default:
//     console.log("Invalid operation");
//     break;
// }

// if (!isNaN(result)) {
//   console.log(result);
// } else {
//   console.log("Invalid Expression");
// }

/*

Summary of what MUST be improved (non-negotiable)
❌ 1. Space-dependent parsing

Your calculator must work for:

"12+9"

"12 + 9"

" 12 + 9 "

Right now, it does not.

❌ 2. Incorrect NaN validation

Your numeric validation logic is wrong and will fail silently.

❌ 3. Assumed array positions

You’re assuming indexes instead of deriving meaning.

*/

//=========================New Calc================================

let expressionSum = " 12 + 2 ";

expressionSum = expressionSum.trim();

// TODO first handle single opertor case

let operator;

for (const element of expressionSum) {
  if (element == "+" || element == "-" || element == "*" || element == "/") {
    if (!operator) {
      operator = element;
    } else {
      return console.log("Multiple Operators");
    }
  }
}

//TODO in opeartor is not exits in sum expression
if (!operator) {
  console.log("Invalid Expression! Operator does not exists");
  return;
}

console.log(operator);

// splite
let splitedOperand = expressionSum.split(operator);
console.log(splitedOperand);

//TODO check numbers or not ?

// splitedOperand.forEach((element, index) => {
//   if (!Number(element) || Number(element) == 0) {
//     return console.log("Invalid Numbers");
//   } else {
//     element = element.trim();
//     // console.log(element);
//     splitedOperand[index] = Number(element);
//   }
// });

/*

*    🧠 Why this happens (VERY IMPORTANT JS concept)
    Key rule:

    return inside forEach
!    ❌ does NOT exit the outer function
!    ❌ does NOT stop the loop
*    ✅ only exits the callback for that one iteration

    So this:

    return console.log("Invalid Numbers");


    means:

    “Stop this one callback run and go to the next element.”

    It does not mean:

    “Stop the calculator.”

*    💡 This is a classic real-world JS trap

    Even experienced devs mess this up.

    You just learned:

!    forEach is not breakable

    return inside callback ≠ function return

    🔥 This is exactly the kind of bug startups see in junior devs.

    So this lesson is gold.

*/

// use For-in it return index
//! using For-of return values but later it becomes hard to find index of that elements

for (const idx in splitedOperand) {
  // console.log(idx);

  let currentElement = splitedOperand[idx];

  // if (isNaN(Number(splitedOperand[idx]))) { -- optimization
  if (isNaN(Number(currentElement))) {
    // bcz 0 is consider as false also , and here !0 it consider true not take valid 0 number
    console.log("Invalid Numbers");
    return;
  } else {
    //! splitedOperand[splitedOperand.indexOf(element)] = Number(element);  -- using for-of that return value
    // this cause bug, indexOf(element) returns the first matching value.

    // splitedOperand[idx] = Number(splitedOperand[idx]);  -- optimization
    // twice conceptually: once for validation & once for assignment
    splitedOperand[idx] = Number(currentElement);
  }
}

console.log("Final Number Array : ", splitedOperand);

switch (operator) {
  case "+":
    console.log("Result : ", splitedOperand[0] + splitedOperand[1]);
    break;
  case "-":
    console.log("Result : ", splitedOperand[0] - splitedOperand[1]);
    break;
  case "*":
    console.log("Result : ", splitedOperand[0] * splitedOperand[1]);
    break;
  case "/":
    //TODO handle zero division case
    if (splitedOperand[1] == 0) {
      console.log("Division by Zero is infinity");
      return;
    }
    console.log("Result : ", splitedOperand[0] / splitedOperand[1]);
    break;

  default:
    console.log("Invalid Operator");
    break;
}
