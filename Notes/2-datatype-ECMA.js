
//* Following are Points about JS datatypes & ECMA

//* 1) use this syntax to tell compiler treat all JS code as newer version
// Good practies
"use strict";

// 2) alert behaviour
// alert(3 + 3) //! Not work as same work in Browser console
// we are running in Node.js Environment, Not in Browser Environment

// 3) Focus on Code readiability 
// - Use MDN Doc for development  
// - Original tc39.es ECMA document is very detailed advance - It have all standards & core 

//* 4) Datatypes

// number => have range
// bigInt => for massive large number
// string => " "
// boolean => true/false
//* null => It is datatype as well as Standalone Value, it define empty / void / no type no value
// undefine =>  value is not assign yet
// symbole => use for uniquness finding


//* Object => mostly used 


//* IMP Point

console.log(typeof "example") // => string
console.log(typeof null) //! => object | It show type as object, This is maybe loop in language or something / error
console.log(typeof undefined) // => undefined
