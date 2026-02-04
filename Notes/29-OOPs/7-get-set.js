//* getters - setters
// watch video to know more detaile explanantion : https://youtu.be/t6vLhF-iSxQ?si=LELrYzJeyXeFjggS

//* #1 Morden Syntax

// class

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  // by default every class have getters and setters for each properties define as methods
  //* Need to declare both get and set otherwise it throw error

  //-------------------------------------------------------------------------------------------------

  //! IMP POINT : below code wont work it throw error
  //! Beacuse getter-setter cannot work directly with same properties define
  //! it kind a start race condition between constructor and getter-setter to manipulate values

  //  get password() {
  //     // we want to send salted password, not the orginal one directly
  //    return `xxyzs${this.password}ooxyy`
  //  }

  //  set password(value) {
  //      this.password = value
  //  }

  //! ERROR : RangeError: Maximum call stack size exceeded

  //---------------------------------------------------------------------------------------------------

  //* SOLUTION : we need to define different names for that properties
  // means we are using getters-setters of a property define in constructor
  // but for taking and exchaning we use sligtly different name
  //  .e.g. original property "password" we will use its getters and setters, beacuse outside of class users will access ".password"
  // but inside we are keeping away original ".password" property but taking and exchaning values with" _password" other name property
  // means basically getters and setters use different name property for all operations and keep idle or aside orginial property
  // we cannot reched to it due to getters-setters

  get password() {
    return `xxyzs${this._password}ooxyy`;
  }

  //! Dont do this also
  //   set _password(value) {
  // otherwise use cannot be able to access ".password" and it will completely cut the connection between password and _password

  set password(value) {
    this._password = value;
  }
}

// instance
const naruto = new User("uzumaki-san-55", "naruto@uzumaki.com", "12345");

//* BEFORE: using getters and setters
console.log(naruto.username); // --> uzumaki-san-55
console.log(naruto.password); // --> 12345

//* AFTER: using getters adn setters
// But, somethimes we want more fine-grain control over take value (get) and send input (set)
console.log(naruto.password); // --> xxyzs12345ooxyy

naruto.password = "silver-$stars";
console.log(naruto.password); // --> xxyzssilver-$starsooxyy

//-------------------------------------------------------------------------------------------------------------

//* getters-setters without class keyword
// how we will defining getters and setters when we dont have "class" keyword
// object, prototype syntax

// lets define function

function Fruit(name, price) {
  // setting context
  //* Unlike morden syntax, here we need to slightly chanced names for properties in defining in context too

  this._name = name;
  this.price = price;

  //-----------------------------------------------------------------------

  //! this won't work -> undefined
  //  ERROR :  Cannot read properties of undefined (reading 'toUpperCase')

  // this.name = name;
  // this.price = price;

  //-----------------------------------------------------------------------
  // ONE TIP: use " _name" to only properties which you are defining getters and setters

  // this._name = name;
  // this._price = price;

  //! Simple, we are not defining getter-setter with "price" name and in context also, it means property with name price is not defined ever

  // console.log(apple.price); // -->  undefined

  //* defining getters-setters
  //* as you know we define each getter-setter pair for each property in object
  // this syntax does not get context directly, so we need to give it "this" so it understand about which Object we are talking
  // simply say we need to send Object in first paramater
  // and inside that Object it self , "this" referes to that Object as we studied

  // getter-setter -- name
  //* but for defining getters-setters we use "name" that user uses

  Object.defineProperty(this, "name", {
    get: function () {
      return `${this._name.toUpperCase()}`;
    },
    set: function (value) {
      this._name = value;
    },
  });
}

// instance
const apple = new Fruit("apple", "120");
console.log(apple.name); // --> APPLE

apple.name = "mango"; // set name - mango
console.log(apple.name); // --> MANGO

//--------------------------------------------------------------------------

//* Very Old Syntax : HERE we can learn true mechanisum behind getters and setters

const Food = {
  _name: "Chicken Tikka",
  _price: "440",

  /*
*   BEHIND THE SCENES : here we know more about get-set in detailed

    when we use _name it kind a assume as private porperty means, normal user cannot access it
*   In JS it dont keep get and set as methods,
    Thats why :
    
!   we dont do this : like executing as method
    console.log(myOrder.name())

*   JS consider get and set as layers on that property. 
   the work of getting value from memory and sending value in memory for that property -- JS give use get-set to Overwrite this work and manipulate values
    This is THE BEHIND THE SCENE of getters and setters

*/

  get name() {
    return this._name.toLocaleUpperCase();
  },

  set name(value) {
    this._name = value;
  },
};

//* In this syntax we cannot simply use "new"
// we need to use Factory functions .e.g. ".create"

const myOrder = Object.create(Food);

console.log(myOrder.name); // --> CHICKEN TIKKA

Food.name = "Dam Biryani";
console.log(myOrder.name); // --> DAM BIRYANI

//------------------------------------------------------------------------------------------------------------------

//* ES2022 - one praposal for defining private properties with # insted of _
//  and make solid mechanisum so outer user cannot access private property
