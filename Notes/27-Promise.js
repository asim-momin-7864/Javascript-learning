//* Promise

// Promise is task will happend in future but no guarrenty either fulfilled or rejected
// it help to track

//--------------------------------------------------------------------------------------------------------------

//* Handling Promise with chaining / thening --> .then() - .catch() - .finally()
//* we can store in the variable
let promiseOne = new Promise((resolve, reject) => {
  // Do an async task
  // DB calls, cryptoraphy tasks, network calls

  // to mimice we use setTimeout

  setTimeout(() => {
    console.log("First async task done");
    // after our task successful done we need to call resolve() method to change promise status
    //* also resolve-then are connected / by using resolve() method we can connect
    resolve();
    // resolve({username: "king", email: "king@gmail.com"}); //* also we can pass return reponse / return values to then for futher process through resolve
  }, 1000);
});

promiseOne.then(() => {
  console.log("Promise is completeted, We are in .then ");
});

//-------------------------------------------------------------------------------------------------------------------------

//* we can write directly also
new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Second async task done, and user object is returned");

    //! return({ username: "big_hero_6", email: "big06@gmail.com"}); this is not how we send values
    resolve({ username: "big_hero_6", email: "big06@gmail.com" }); // passing Response / return value to then
  }, 1000);
}).then((res) => {
  console.log("get user object successfully : ", res);
});

//-------------------------------------------------------------------------------------------------------------------------

//* use of reject
//* chaining
//* thening
//* catch --> for errors
//* finally --> this is kind a default no matters either promise is success or failed this finally will always execute
// this optional --> but good practice to use

let promiseThird = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Third async task is completed");
    let error = false;

    if (!error) {
      resolve({ username: "big_hero_6", email: "hero@gmail.com" });
    } else {
      reject("E: Somthing is wrong"); // need to pass error
    }
  }, 1000);
});

promiseThird
  .then((res) => {
    console.log("Third Response is get user data : ", res);
    return res.username; // here we need to return response so next then can access it
  })
  .then((res) => {
    // thening / chaining
    console.log("Access user name : ", res);
  })
  .catch((error) => {
    console.log("E : ", error); // got error
  })
  .finally(() => {
    console.log("Promise is complete, we are in finally block ");
  });

//------------------------------------------------------------------------------------------------------

//* async - await
//* Handling Promise with async and await

let promiseFour = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Four async task is completed");
    let error = true;

    if (!error) {
      resolve({ username: "big_hero_6", email: "hero@gmail.com" });
    } else {
      reject("E: Somthing is wrong");
    }
  }, 1000);
});

// async function consumePromiseFour1 () {
//     let res = await promiseFour;  //! promiseFour() - Dont do like this
//     // bcz promise is object
//     console.log(res);
// };

// consumePromiseFour1();
// => { username: 'big_hero_6', email: 'hero@gmail.com' }

/*

! but async-await does not handle rejection / error handling 

if we directly user, we get output like this -->

node:internal/process/promises:392
      new UnhandledPromiseRejection(reason);
      ^

UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "E: Somthing is wrong".
    at throwUnhandledRejectionsMode (node:internal/process/promises:392:7)
    at processPromiseRejections (node:internal/process/promises:475:17)
    at process.processTicksAndRejections (node:internal/process/task_queues:104:32) {
  code: 'ERR_UNHANDLED_REJECTION'
}

//* Solution --> we need to use try{ } catch{ } with async await

*/

//* Handing Promise with async-await with error handling with try{} - catch{}
async function consumePromiseFour2() {
  try {
    let res = await promiseFour;
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

consumePromiseFour2();


