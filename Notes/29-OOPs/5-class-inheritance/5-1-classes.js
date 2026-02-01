//* class

/*

- classes are introduced after ES6+
- class is syntactic sugar to hide JS main mechanisum and mak easy for developers

* IMP POINT - behind the scenes work is done using Object, Prototype, "new", "this", .call() 

- we understand classes what it hide and how same task is done using main mechanisum
- Take Both Examples

*/

//* Example with class

class User {
  // it is similar as called by "new" when creating instances from main Object
  // and set context

  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  // creating custome methods
  // similar as someObject.prototype.customeMethod = functon() {...}

  // here we do directly
  encryptPassword() {
    return `abc${this.password}xyz`;
  }

  // other method
  upperCaseUsername() {
    return `${this.username.toUpperCase()}`;
  }
}

const BigHero6 = new User("Big Hero 6", "big6@hero.com", "apple");
console.log(BigHero6.encryptPassword()); // --> abcapplexyz
console.log(BigHero6.upperCaseUsername()); // --> BIG HERO 6

//-------------------------------------------------------------------------------------------

//* Example with Main Mechanisum
// performing same task

// we make  main function

function product(name, price) {
  // setting context
  this.name = name;
  this.price = price;
}

// creating custome methods
product.prototype.tellNameAndPrice = function () {
  // similary here we have access to arguments of main function

  return `The Name of Product : ${this.name} And Price : ${this.price} `;
};

// instance creating
const SmartPhone = new product("Samsung S24 Ultra", "240000");

console.log(SmartPhone.tellNameAndPrice()); // --> The Name of Product : Samsung S24 Ultra And Price: 240000
