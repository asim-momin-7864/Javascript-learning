//* static - use to declare properties that insatnces of that class as well as classes which inheritate this class cannot access

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    // methods
    logMe() {
        return `I am user @${this.username}`
    }

    // we want static method - no one from outside can access it

    // create ID's
    static createID() {
        // consider it is returning each time unique ID 
        return `xnvzd1223qew`
    }
};

// instance
const luffy = new User("luffy.d", "monkey@luffy.com");

console.log(luffy.logMe()); //* -->  I am user @luffy.d
// console.log(luffy.createID()); //! --> luffy.createID is not a function

// inherited classes
class Teacher extends User {

    // constructor() {  }
    // i am keeping same arguments means no re-setting constructor function

    // methods
    teacherGreeting() {
        return` Hello! I am a Teacher. `
    }

}

const james = new Teacher("@j.ames", "james@k.com");
console.log(james.teacherGreeting()); // -->  Hello! I am a Teacher.
console.log(james.createID());//! --> james.createID is not a function


