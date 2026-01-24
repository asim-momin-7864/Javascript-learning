/*

- fun reference , execution
- return
- unreachable code
- scope of variables
- default parameter value
*/

function addTwoNum(number1, number2) {
  return number1 + number2;
}

// This is function reference - like we pass function in React in props
addTwoNum;

// This is function execution
let result = addTwoNum(11, 34);
console.log(result);

function loginUserMessage(username) {
  if (!username) {
    console.log("Please enter name");
    return;
  }
  return `${username} is loggedin`;
}

console.log(loginUserMessage("Asim"));

// if not passes argument then what it print
console.log(loginUserMessage()); // => undefined, undefined is loggedin

//* Cart feature function - passing many argument uisng rest operator ...

// Many arguments without ... rest operator
function calculateCartPrice1(num1) {
  return num1;
}

console.log(calculateCartPrice1(200)); // => 200

console.log(calculateCartPrice1(200, 300, 400, 500)); // => 200 (take only first value)

// Many arguments with ...rest operator - it return Array
function calculateCartPrice2(...num1) {
  return num1;
}

console.log(calculateCartPrice2(200, 300, 400, 500, 600)); //=> [ 200, 300, 400, 500, 600 ]

// variation
function calculateCartPrice3(val1, val2, ...valn) {
  return valn;
}

// val1 & val2 are assigned to first 2 values and rest of get into valn

console.log(calculateCartPrice3(200, 300, 400, 500, 600, 700, 800, 900)); // => [ 400, 500, 600, 700, 800, 900 ]

//* Objects as arguments

let user1 = {
  username: "asim_momin_76",
  followers: 450,
  followings: 200,
};

function printUserAccount(anyObject) {
  console.log(
    `${anyObject.username} have ${anyObject.followers} followers and ${anyObject.followings} followings`
  );
}

printUserAccount(user1);

printUserAccount({
  username: "virat_76",
  followers: 450,
  followings: 200,
});

//* Array as arguments

let myArray1 = [200, 400, 500, 600];

function returnArrayValue(getArray) {
  return getArray[1];
};

console.log(returnArrayValue(myArray1)); // => 400


// Default value for paramteres
function shopping(noItems = 1 , price = 200) {
  return price * noItems;
};

// when we pass all arguments
console.log(shopping(5, 1200)); // => 6000

// when we not pass all arguments
console.log(shopping()); // => 200
 

