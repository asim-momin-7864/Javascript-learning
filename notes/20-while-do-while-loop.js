//* There are many ways , But keep consistency and use one loop in whole code base

//* While
let index = 0;

while (index <= 10) {
  console.log(`index is ${index}`);
  index = index + 2; // any condition
}

//* while loop on array
let superheros = ["superman", "spiderman", "ironman", "batman"];

let arrIdx = 0;

while (arrIdx < superheros.length) {
  console.log(`Value is ${superheros[arrIdx]}`);
  arrIdx++;
}

//* do-while loop
// do task first later check condition
// in very rare exception cases we use do-while

// case 1
let score1 = 0;

do {
  console.log(`score is ${score1}`);
  score1++;
} while (score1 <= 10);

// case 2
let score2 = 11;

do {
  console.log(`score is ${score2}`);
  score2++;
} while (score2 <= 10);  //* => score is 11