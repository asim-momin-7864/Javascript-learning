// As we know we plan JS object is not directly iterable with for-of loop

// We have for-in loop for it , It work with JS objects, array but not work on Maps
// for-of loop work => Maps
// for-in loop work => JS objects

const myLanguagesObj = {
  js: "javascript",
  py: "python",
  rb: "ruby",
  swift: "swift",
};

// for-in loop on JS objects - for-in loop give keys / indexes
for (const key in myLanguagesObj) {
  console.log(key); // keys of objects
  console.log(myLanguagesObj[key]); // access values by keys
}

// for-in loop on arrays - for-in loop gives indexes of array

const myLangArray = ["js", "java", "python", "ruby", "swift", "cpp"];

for (const index in myLangArray) {
  console.log(index); // indexes of array
  console.log(myLangArray[index]); // array elements
}


// for-in loop on Maps

const countriesMap = new Map();

countriesMap.set("IN", "India");
countriesMap.set("US", "America");
countriesMap.set("UK", "United Kingdom");
countriesMap.set("Fr", "France");

for (const key in countriesMap) {
    console.log(key);
} 

//! => nothing get Because Maps cannot be interate with for-in loop