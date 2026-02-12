//* Unit Convertor Programme

/*

! this. dont work - beacuse this is evaluated before the object exists, also not use with object 


// Lookup table
const registory = {
    m: {
        name: "m",
        baseUnit: this["m"],
        factor: 1,
        type: "length",
    },

}


OUTPUT  --> 
    So this points to:
    window (in browser, non-strict mode)
    undefined (in strict mode / modules)

    It is NOT registory.



Solutions :


* Method : Use a Function (Factory Pattern) — Best Practice

function createRegistry() {
    const reg = {};

    reg.m = {
        name: "m",
        baseUnit: reg.m,
        factor: 1,
        type: "length",
    };

    reg.km = {
        name: "km",
        baseUnit: reg.m,
        factor: 1000,
        type: "length",
    };

   * Define first, then link

        Link after creation
        registory.m.baseUnit = registory.m;
        registory.km.baseUnit = registory.m;

    return reg;
}

const registory = createRegistry();


*/

// Lookup table
function createRegistry() {
  // defining object frist so it will be available
  let reg = {};

  reg.m = {
    name: "m",
    factor: 1,
    type: "length",
  };

  reg.km = {
    name: "km",
    factor: 1000,
    type: "length",
  };
  reg.cm = {
    name: "cm",
    factor: 0.01,
    type: "length",
  };
  reg.g = {
    name: "g",
    factor: 1,
    type: "weight",
  };
  reg.kg = {
    name: "kg",
    factor: 1000,
    type: "weight",
  };
  reg.lb = {
    name: "lb",
    factor: 454.6,
    type: "weight",
  };

  reg.C = {
    name: "C",
    type: "temp",
  };

  reg.F = {
    name: "F",
    type: "temp",
  };

  reg.K = {
    name: "K",
    type: "temp",
  };

  // linking
  reg.m.baseUnit = reg.m;
  reg.km.baseUnit = reg.m;
  reg.cm.baseUnit = reg.m;
  reg.g.baseUnit = reg.g;
  reg.kg.baseUnit = reg.g;
  reg.lb.baseUnit = reg.g;

  // so we can pass generated reg
  return reg;
}

// function
function convertUnits(value, fromUnit, toUnit) {
  //TODO arguments empty
  // Case 0 : empty argumenst
  if (fromUnit.trim() == "" || toUnit.trim() == "") {
    console.log("Units are empty");
    return;
  }

  //TODO Input sanitization
  this.value = Number(value);
  this.fromUnit = String(fromUnit);
  this.toUnit = String(toUnit);

  const reg = createRegistry();

  //TODO Edge cases
  //Case 1 : is both fromUnit and toUnits exists in our Lookup table (registery)
  // console.log(reg.C);

  if (!(Object.hasOwn(reg, fromUnit) && Object.hasOwn(reg, toUnit))) {
    console.log("Units are not in our Loop up table");
    return;
  }

  //------------------------------------------------

  // find base unit
  fromUnitObject = reg[this.fromUnit];
  toUnitObject = reg[this.toUnit];

  // console.log(fromUnitObject);
  // console.log(toUnitObject);

  //TODO lower case and upper case
  //Case 2 : lower case and upper case fro better matching

  if (fromUnitObject.type == "temp") {
    this.fromUnit = fromUnit.toUpperCase();
    this.toUnit = toUnit.toUpperCase();
  } else {
    this.fromUnit = fromUnit.toLowerCase();
    this.toUnit = toUnit.toLowerCase();
  }

  //Case 3 : both units are same
  if (this.fromUnit == this.toUnit) {
    console.log("Both units are same");
    return;
  }

  //Case 4 : units are compatible
  if (fromUnitObject.type !== toUnitObject.type) {
    console.log("Units are not convertable");
    return;
  }

  // for result
  this.result = 0;

  if (fromUnitObject.type == "length" || fromUnitObject.type == "weight") {
    // start - baseUnit Operation

    // baseUnit Operation
    //Case 5 : in lenght or width if value is == 0
    if (value === 0 && (fromUnitObject.type == "length" || "weight")) {
      console.log(
        `${this.value} ${this.fromUnit} = ${this.value} ${this.toUnit} `,
      );
      return;
    }

    //TODO compatibility

    //TODO we want something which check is fromUnit's toUnit is its baseUnit or not ?

    // converting fromUnit into its baseUnit
    this.result = this.value * fromUnitObject.factor;
    // console.log("1st result -->", this.result);

    // console.log(
    //   "fromUnitObject.baseUnit.name --> ",
    //   fromUnitObject.baseUnit.name,
    // );
    // console.log("this.toUnit --> ", this.toUnit);
    // console.log(fromUnitObject.baseUnit.name === this.toUnit);

    if (fromUnitObject.baseUnit.name !== this.toUnit) {
      //TODO find toUnits --> base unit --> factor and divide by it
      // reverse factor to convert baseUnit --> another unit
      // e.g. m --> cm
      // e.g. g --> kg
      this.result = this.result * (1 / toUnitObject.factor);
      // console.log("2st result -->", this.result);
      // console.log(`${this.value} ${fromUnit} = ${result} ${toUnit} `);
    }

    // end - baseUnit Operation
  } else {
    // handle temperature converts
    let checkPair = `${this.fromUnit}-${this.toUnit}`;
    // console.log(checkPair);

    //switch
    switch (checkPair) {
      case "C-F":
        this.result = this.value * (9 / 5) + 32;
        break;
      case "C-K":
        this.result = this.value + 273.15;
        break;
      case "F-C":
        this.result = (this.value - 32) * (5 / 9);

        break;
      case "F-K":
        this.result = (this.value - 32) * (5 / 9) + 273.15;

        break;
      case "K-C":
        this.result = this.value - 273.15;
        break;
      case "K-F":
        this.result = (this.value - 273.15) * (9 / 5) + 32;
        break;

      default:
        console.log("Something wrong");

        break;
    }
  }

  console.log(`${this.value} ${fromUnit} = ${this.result} ${toUnit} `);
}

convertUnits(10, "km", "m");
convertUnits(1, "kg", "lb");
convertUnits(0, "C", "F");

/* 
==========================================================
📘 UNIT CONVERTER — SELF REVIEW & LEARNING NOTES
==========================================================

This file contains lessons from my first serious JS practice project.
Goal: Learn from mistakes and improve coding mindset.

----------------------------------------------------------
1️⃣ ❌ MISTAKE: Using `this` in Normal Functions
----------------------------------------------------------

❌ Wrong:
-----------------------------------
function convert(value) {
  this.value = Number(value);
  this.result = 0;
}

Reason:
- In normal functions, `this` is NOT my object.
- It points to window / undefined.
- This causes bugs and unpredictable behavior.

✅ Correct:
-----------------------------------
function convert(value) {
  const num = Number(value);
  let result = 0;
}

Rule:
👉 Use `this` only inside classes / object methods.
👉 Use local variables in normal functions.

----------------------------------------------------------
2️⃣ ❌ MISTAKE: Recreating Registry on Every Call
----------------------------------------------------------

❌ Wrong:
-----------------------------------
function convert() {
  const reg = createRegistry(); // recreated every time ❌
}

Reason:
- Wastes memory and time.
- Unnecessary work.

✅ Correct:
-----------------------------------
const registry = createRegistry(); // create once

function convert() {
  const reg = registry; // reuse
}

Rule:
👉 Heavy/static objects should be created once.

----------------------------------------------------------
3️⃣ ❌ MISTAKE: Missing let / const (Global Variables)
----------------------------------------------------------

❌ Wrong:
-----------------------------------
fromUnitObject = reg[from];
toUnitObject = reg[to];

Reason:
- Creates global variables.
- Can overwrite other code.
- Very dangerous in real projects.

✅ Correct:
-----------------------------------
const fromUnitObject = reg[from];
const toUnitObject = reg[to];

Rule:
👉 ALWAYS use let / const / var.
👉 Never create variables without declaration.

----------------------------------------------------------
4️⃣ ❌ MISTAKE: Wrong OR Condition in JS
----------------------------------------------------------

❌ Wrong:
-----------------------------------
if (type === "length" || "weight") {
}

Reason:
- "weight" is always true.
- Condition always passes.

✅ Correct:
-----------------------------------
if (type === "length" || type === "weight") {
}

Rule:
👉 Every comparison needs its own variable.

----------------------------------------------------------
5️⃣ ❌ MISTAKE: Case Handling After Validation
----------------------------------------------------------

❌ Wrong:
-----------------------------------
if (!reg[fromUnit]) return;

fromUnit = fromUnit.toLowerCase();

Reason:
- "KM" fails before conversion.
- Validation order is wrong.

✅ Correct:
-----------------------------------
fromUnit = fromUnit.trim().toLowerCase();
toUnit = toUnit.trim().toLowerCase();

if (!reg[fromUnit]) return;

Rule:
👉 Normalize input FIRST, validate SECOND.

----------------------------------------------------------
6️⃣ ❌ MISTAKE: Over-Engineering baseUnit
----------------------------------------------------------

❌ Wrong:
-----------------------------------
reg.m.baseUnit = reg.m;
reg.km.baseUnit = reg.m;

Reason:
- Extra complexity.
- Not really needed.

✅ Better:
-----------------------------------
base = num * from.factor;
result = base / to.factor;

Rule:
👉 Prefer simple math over complex references.

----------------------------------------------------------
7️⃣ ❌ MISTAKE: Mixing Responsibilities
----------------------------------------------------------

❌ Wrong:
-----------------------------------
function convert() {
  // validation
  // conversion
  // printing
  // error handling
}

Reason:
- Hard to debug.
- Hard to extend.

✅ Better:
-----------------------------------
validate()
convertValue()
formatOutput()

Rule:
👉 One function = One job.

----------------------------------------------------------
8️⃣ ❌ MISTAKE: Using console.log Instead of Return
----------------------------------------------------------

❌ Wrong:
-----------------------------------
console.log(result);

Reason:
- Cannot reuse function.
- Hard to test.

✅ Better:
-----------------------------------
return result;

console.log(convert(...));

Rule:
👉 Functions should return values.
👉 Logging should be outside.

----------------------------------------------------------
9️⃣ ❌ MISTAKE: Not Checking NaN Properly
----------------------------------------------------------

❌ Wrong:
-----------------------------------
const num = Number(value);

Reason:
- "abc" becomes NaN silently.

✅ Correct:
-----------------------------------
const num = Number(value);

if (Number.isNaN(num)) {
  return "Invalid number";
}

Rule:
👉 Always validate numbers.

----------------------------------------------------------
🔟 ❌ MISTAKE: Too Many Nested if-else
----------------------------------------------------------

❌ Wrong:
-----------------------------------
if (a) {
  if (b) {
    if (c) {
      ...
    }
  }
}

Reason:
- Hard to read.
- Bug-prone.

✅ Better:
-----------------------------------
if (!a) return;
if (!b) return;
if (!c) return;

Rule:
👉 Use early return.
👉 Avoid deep nesting.

----------------------------------------------------------
✅ IMPROVED THINKING STYLE (MENTAL MODEL)
----------------------------------------------------------

Before (Beginner Thinking):
-----------------------------------
"Let me handle every case manually"

After (Engineer Thinking):
-----------------------------------
"Let me design so cases disappear"

Example:
-----------------------------------
Use data + math instead of many conditions.

----------------------------------------------------------
📈 MAIN LEARNINGS FROM THIS PROJECT
----------------------------------------------------------

✔️ Data-driven design is powerful
✔️ Validation is important
✔️ Order of logic matters
✔️ Simpler code = fewer bugs
✔️ Debugging is part of learning

----------------------------------------------------------
🎯 GOAL FOR NEXT PROJECTS
----------------------------------------------------------

1. Use less `if`
2. Use more data structures
3. Separate logic clearly
4. Avoid `this` unless using classes
5. Always refactor after finishing

==========================================================
END OF NOTES
==========================================================
*/
