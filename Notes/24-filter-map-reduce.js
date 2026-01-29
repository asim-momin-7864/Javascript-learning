/*

- return issue in for-each loop
- filter
- book exercise
- map
- chaining

*/

//* filter - it return element base on condition - true/false
//? why need filter if we have for-each ?

const myNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// for-each
let value1 = myNumbers.forEach((element) => {
  return element;
});

console.log(value1); //! => undefined

//! because for-each loop does not return values

// filter
let value2 = myNumbers.filter((element) => {
  return element >= 5;
});

console.log(value2); // => [ 5, 6, 7, 8, 9, 10 ]

// we can do same work as filter with for-each but code becomes lenghty

let value3 = [];

myNumbers.forEach((element) => {
  if (element >= 4) {
    value3.push(element);
  }
});

console.log(value3); // => [ 4, 5,  6, 7, 8, 9, 10 ]

//* One Small Exercise

const books = [
  { title: "Book One", genre: "Fiction", publish: 1981, edition: 2004 },
  { title: "Book Two", genre: "Non-Fiction", publish: 1992, edition: 2008 },
  { title: "Book Three", genre: "History", publish: 1999, edition: 2007 },
  { title: "Book Four", genre: "Non-Fiction", publish: 1989, edition: 2010 },
  { title: "Book Five", genre: "Science", publish: 2009, edition: 2014 },
  { title: "Book Six", genre: "Fiction", publish: 1987, edition: 2010 },
  { title: "Book Seven", genre: "History", publish: 1986, edition: 1996 },
  { title: "Book Eight", genre: "Science", publish: 2011, edition: 2016 },
  { title: "Book Nine", genre: "Non-Fiction", publish: 1981, edition: 1989 },
];

let userBooks = books.filter((bk) => {
  return bk.genre === "Fiction" && bk.publish >= 1980;
});

console.log(userBooks);

/*

==>

[
  { title: 'Book One', genre: 'Fiction', publish: 1981, edition: 2004 },
  { title: 'Book Six', genre: 'Fiction', publish: 1987, edition: 2010 }
]

*/

//* map loop - it we use to apply operation on each element and return , also it support chaining (multiple maps we can apply)

let myNumData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let processedData = myNumData
  .map((element) => {
    return element * 10;
  })
  .map((element) => {
    return element + 1;
  })
  .filter((element) => {
    return element >= 50;
  });

console.log(
  "Processed Data from muliple maps and filter chaining : ",
  processedData,
);
// => Processed Data from muliple maps and filter chaining :  [ 51, 61, 71, 81, 91, 101 ]

//* reduce loop

// help to reduce / summarize values into one by any operations

// e-commerce shopping cart
let shoppingCart = [
  {
    name: "T-shirt",
    price: 150,
  },
  {
    name: "Shirt",
    price: 650,
  },
  {
    name: "Pants",
    price: 1350,
  },
  {
    name: "Shoes",
    price: 1500,
  },
];

const priceToPay = shoppingCart.reduce((acc, currentValue) => {
  return acc + currentValue.price;
}, 0);

// accumelator - where our results store in between process and return
// currentValue - is current element on loop is iterating
// initial value - we need to provide for accumulator to start with it 

console.log("Total Price : ", priceToPay); // => Total Price :  3650
