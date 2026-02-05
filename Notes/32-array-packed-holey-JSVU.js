//* Array Advanced :
// PACKED vs Holey
// JSVU
// V8-debug

// Watch Video:  https://youtu.be/ZRS485LxX0s?si=c5GknteL4_03jkbm
// To learn in depth
// How to install and execute JSVU

//---------------------------------------------------------------------------------------

// const myArr = [] % DebugPrint(myArr); // no run directly need JSVU

/*
* Type of Array:

   1) Continious / Packed - done not have holes , empty / null elements
     each have 3 types of optimization base on what elements they have

        #1 SMI (small integer)
        #2  Double (float, string, function, ...)
        #3 Packed element


   2) Holey - have holes, empty / bull elements
     each have 3 types of optimization base on what elements they have

        #1 SMI (small integer)
        #2  Double (float, string, function, ...)
        #3 Packed element (Packed also use for Array that can have anything floats, strings, functions, objects, ....)


(browsers / engines do this optmizations on Array)


*/

//* #1 PACKED / Continous

//* #1.1 PACKED_SMI_ELEMENTS - this arrays optimization is different
const arrTwo = [1, 2, 3, 4, 5];
// best array but you cannot take even float inside it

// if push float
//* --> it becomes PACKED_DOUBLE_ELEMENTS - this arrays optimization becomes different
arrTwo.push(6.0);

// if push string
//* --> it becomes PACKED_ELEMENTS - now, this arrays optimization becomes different
// now you can push any thing it remain as PACKED_ELEMENTS
arrTwo.push("7");

// IMP POINT: by default order is
//* PACKED_SMI_ELEMENTS --> PACKED_DOUBLE_ELEMENTS --> PACKED_ELEMENTS
//! REMEMBER: once PACKED_SMI_ELEMENTS becomes PACKED_DOUBLE_ELEMENTS / PACKED_ELEMENTS it cannot get back to PACKED_SMI_ELEMENTS again. even you pop that element that dont make it

//-------------------------------------------------------------------------------------

//* #2 Holey

// if we do this
//* it becomes HOLEY_ELEMENTS - we create empty gaps
// not HOLEY_SMI_ELEMENTS because it already have string, floats
arrTwo[15] = 11;

// Check
console.log(arrTwo); // --> [ 1, 2, 3, 4, 5, 6, '7', <8 empty items>, 11 ]
console.log(arrTwo.length); // --> 16
console.log(arrTwo[9]); // --> undefined
console.log(arrTwo[20]); // --> undefined

//* POINT: These undefined are very constly operations and that 8 empty items (holes) make our array unoptimized
//Understand how Array find value on indexes

// steps and cases

//* #1 bound check (easy operation)
// - if index is within length give it that element or tell no

//* #2 hasOwnProperty(arrTwo, 9)
// - check is array have that name property ?

//* #3 hasOwnProperty(arr.Two.prototype, 9)
// - if not find in 2nd step, it goes into arrays prototype

// prototypal nature, ... as it goes upto object's prototype

//* #4 hasOwnProperty(object.prototype, 9)
// check is object have that property ?

//! IMP POINT: hasOwnProperty is one of the most costly operation in whole JS
//! Say's one line every - "Holes are very expensive in js"

// --------------------------------------------------------------

//Example - when its PACKED SMI our operations is 2 step only -
// check bound
// return element on that index

const arrThree = [1, 2, 3, 4, 5];
console.log(arrThree[2]); // --> 3

//--------------------------------------------------------------------------------

/*

* Optimized to Less Optimized Order

# 1 PACKED : Highly Optimized (Top prioritized)
   - in that 

   * SMI > DOUBLE > PACKED

   - SMI is most optimized

# 2 Holey : Less optimized
   - in that

   * H_SMI > H_DOUBLE > H_PACKED

*IMP POINT: doing its permutation-combination there is 30 or more variations - and by checking all and apply different optimization is done
- This is also used in loops, for loop, for-each, ...arrays

! REMEMBER: once down grade happend its almost impossible to make upgrade into optimized type
 e.g. once PACKED_SMI_ELEMENTS becomes PACKED_DOUBLE_ELEMENTS / PACKED_ELEMENTS or HOLEY_SMI, HOLEY...  it cannot get back to PACKED_SMI_ELEMENTS again. even you pop that element that dont make it

*/

//--------------------------------------------------------------------------------------------

//* Example of Mistakes we makes that reduces optmization

// declare array
const arrFour = new Array(3);
//! this syntaxe while defining Array creates 3 empty elements
//! means, our optimization type reduce from PACKED_SMI >> HOLEY_SMI

arrFour[0] = "1"; // HOLEY_PACKED
//* by pushing string our optimization type reduce from HOLEY_SMI >> HOLEY_PACKED

arrFour[1] = "2"; // HOLEY_PACKED_ELEMENTS
arrFour[2] = "3"; // HOLEY_PACKED_ELEMENTS

/*

- In above example here is 2 things to consider

1) According to our use case we have to push STRINGS, means we get PACKED type, cannot get SMI type
      - that is okey beacuse we Choose Use case first that optimization
      - we cannot change apps functionality only for optimization

BUT

2) We can optimized / prevent from reducing - where we can do
      - e.g. We are making mistake in declaring Array
      ! - const arrFour = new Array(3); 
      - this line reducing our optimization from PACKED to HOLEY by creating 3 empty elements
      - here we can prevent from reducing optimization

 */

//----------------------------------------------------------------------------------

// Example: How we can prevent reducing optimization, what in our hands

// declare this way
const arrFive = [];
// this syntax create empty are, not create or insert empty elements
//* TYPE : PACKED_SMI

// pushing String according to our use case

arrFive[0] = "1"; // PACKED_ELEMETS
arrFive[1] = "2"; // PACKED_ELEMETS
arrFive[2] = "3"; // PACKED_ELEMETS

//* we prevent reducing optimization from PACKED >> HOLEY

//------------------------------------------------------------------------------

// Another Example
const arrSix = [1, 2, 3, 4, 5];

//if you push
arrSix.push(NaN);
arrSix.push(Infinity);

// then it becomes PACKED_DOUBLE

//-----------------------------------------------

//* RECOMMENDATION by Morden Engines
//* Use more for, for-of, for-each, for-in ,.... like loops -- Because they are highly OPTIMIZED by engines for multiple cases

// When you try to make for-each like loop methods, or copy of that methods they are not optimized for muliple cases
