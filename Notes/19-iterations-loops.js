/*

- For Loop
- break and continue

*/

//* For Loop
// Example

for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    console.log(`${i} * ${j} = ${i * j}`);
  }
}

//* break - when we apply break it Skip that iteration as well as rest of all iterations

for (let i = 1; i <= 10; i++) {
  if (i == 5) {
    console.log("5 is Detected, Skip 5th iteration ");
    break;
  }

  // dummy work / operation to show after break keyword that iteration of loop stops
  console.log("Loop work for each iteration :", i);
}

/*

Loop work for each iteration : 1
Loop work for each iteration : 2
Loop work for each iteration : 3
Loop work for each iteration : 4
! 5 is Detected Skip 5th iteration work

*/

//* continue - when we apply continue it Skip that iteration but keep running rest of all iterations

for (let i = 1; i <= 10; i++) {
  if (i == 5) {
    console.log(
      "5 is detected, Skip this iteration only but Continue rest of iterations"
    );
    continue;
  }

  // dummy work / operation to show after continue keyword that iteration of loop stops
  console.log("Loop work for each iteration :", i);
}

/*

Loop work for each iteration : 1
Loop work for each iteration : 2
Loop work for each iteration : 3
Loop work for each iteration : 4
! 5 is detected, Skip this iteration only but Continue rest of iterations
Loop work for each iteration : 6
Loop work for each iteration : 7
Loop work for each iteration : 8
Loop work for each iteration : 9
Loop work for each iteration : 10

*/
