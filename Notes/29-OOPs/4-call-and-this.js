//* call and this

// video : https://youtu.be/-owpuf4lbyU?si=xdsf76kPJBXUBs6p

/*

* In call stack when each function is called it brings its own memory space and execution context ( this )

! We have one Problem when calling function inside function

    function hiiUser () {

        helloUser(){
            .....
        }

    }

In this case, helloUser's this refereing to parent (hiiUser) not to window or Global Execution context { }     

- watch video to understand this problem theoratically
- we will see this problem practically by code example and its solution

*/

// Example for Problem

// secondary function
function setUserName(username) {
  // Complex calculations
  // DB calls

  // setting context
  this.username = username;
}

// Main function
function createUser1(username, email, password) {
  // username set by setUserName method

  // as we know inside scope of method we have access to arguments like e.g. username
  // so here we calling setUserName, it should have access to username argument
  setUserName(username);

  this.email = email;
  this.password = password;
}

// we use new keyword to avoid issues
const spiderman = new createUser1("spiderman-44", "spidy@man.com", "3456");

// One intresting result we see and one Problem we see
console.log(spiderman); //! => createUser { email: 'spidy@man.com', password: '3456' }
// email and password is set but usrname is not set - this is the main problem we are talking earlier

//---------------------------------------------------------------------------------------------------------

/* 
by seeing above result you think that function is not called, but it is not true
that function is calling but the true //!PROBLEM is -

!   setUserName function is setting / injecting username argument in its "this" context 
!   and when that setUserName's execution is done it gets removed from CALL STACK and its context (this) is also removed 
!   it means we are setting username in context and then removing it. like made changes in file but never saved it and closed it
!   and we are returning createUser's context that never get username set in its context    

* SOLUTION - 
*   We need to pass createUser functions context (this) and set username in its context, 
*    so even after removing setUserName function and its context we get our username argument set 

*/

// secondary function
function setEmailName(email) {
  this.email = email;

  console.log("function is calling");
}

// Main function
function createUser2(username, email, password) {
  //!   setEmailName(this,email);
  // not work beacuse .call method give use ability to pass "this" as first parameter

  //* we use .call() and pass "this" as first parameter
  setEmailName.call(this, email);

  this.username = username;
  this.password = password;
}

const luffy = new createUser2("Monkey D. Luffy", "luffy@op.com", "23456");
console.log(luffy);

/*

OUTPUT -->

function is calling

createUser2 {
  email: 'luffy@op.com',
  username: 'Monkey D. Luffy',
  password: '23456'
}

*/