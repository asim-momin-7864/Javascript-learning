//* Inheritance using Class synatx and Comparison with Main Mechanisum

// Class
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  login() {
    // consider login function all users needed
    console.log(`Welcome! ${this.username} you login. `);
  }
}

// inheritance
//* simiar to using --> Object.setPrototypeOf( car, vehical ); or even  more older __proto__ syntax
// here we use "extents" keywords

// Create new class "Teacher" but it have all users characteristics
class Teacher extends User {
  // if both class arguments are same then no need to create constructor function again, it will automatically inherites context also
  // but here we want more arguments so we are re-defining again
  constructor(username, email, password, divisionClassroom, payment, subject) {
    // as we discussed, it inherite context also, so we dont need to define again with this context here (  //! also that will cause problem we phased in .call() method )
    // and not able to use parent class's methods e.g. login() in User class

    // here we use super() method
    // it will set context for arguments that we inherite and Solve same problem we phase in .call() method by doing exact work
    // for that we invented .call() method as passes "this" as first argument by going in that function ( in terms of Main mechanism) / class and give it Teachers "this" and set context
    // so we can easily use inherited arguments in this (Teacher Class) as well as we can use parent class's (User) methods also .e.g. login

    // super methods saves lots of manual work we done
    super(username, email, password);

    // use this and set new arguments as it is
    this.divisionClassroom = divisionClassroom;
    this.payment = payment;
    this.subject = subject;
  }

  // creating custome methods
  tellAboutMe() {
    return `
        I am a Teacher.
        Username: ${this.username}.
        Email: ${this.email}.
        I teach ${this.subject} to ${this.divisionClassroom} classroom.
        My payment is ${this.payment}.
        `;
  }
}

// creating instance
const thomason = new Teacher("@thomasShellby", "thom@sci.com", "1234abc","IT-C", "50000", "English")

// lets check
console.log(thomason.tellAboutMe());

/*

OUTPUT --> 

        I am a Teacher.
        Username: @thomasShellby.
        Email: thom@sci.com.
        I teach English to IT-C classroom.
        My payment is 50000.

*/


//---------------------------------------------------

// checking

console.log( User === Teacher); // --> false
console.log(thomason === Teacher); // --> false

// check using instanceof operator
console.log(Teacher instanceof User); // --> false ( maybe both are classess now)
console.log(thomason instanceof Teacher); // --> true
console.log(thomason instanceof User);// --> true
console.log(User instanceof Teacher);// --> false 





