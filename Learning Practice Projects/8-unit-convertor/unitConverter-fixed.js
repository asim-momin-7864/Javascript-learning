//* Unit Convertor Programme

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

  reg.c = {
    name: "c",
    type: "temp",
  };

  reg.f = {
    name: "f",
    type: "temp",
  };

  reg.k = {
    name: "k",
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

  const reg = createRegistry();


// function
function convertUnits(value, fromUnit, toUnit) {
  //TODO arguments empty
  // Case 0 : empty argumenst
  if (fromUnit.trim() == "" || toUnit.trim() == "") {
    console.log("Units are empty");
    return;
  }

  //TODO Input sanitization
  value = Number(value);
  fromUnit = String(fromUnit);
  toUnit = String(toUnit);

    //TODO lower case and upper case
  //Case 2 : lower case and upper case fro better matching

    fromUnit = fromUnit.toLowerCase();
    toUnit = toUnit.toLowerCase();



  //TODO Edge cases
  //Case 1 : is both fromUnit and toUnits exists in our Lookup table (registery)
  // console.log(reg.C);

  if (!(Object.hasOwn(reg, fromUnit) && Object.hasOwn(reg, toUnit))) {
    console.log("Units are not in our Loop up table");
    return;
  }

  //------------------------------------------------

  // find base unit
  let fromUnitObject = reg[fromUnit];
  let toUnitObject = reg[toUnit];

  // console.log(fromUnitObject);
  // console.log(toUnitObject);



  //Case 3 : both units are same
  if (fromUnit == toUnit) {
    console.log("Both units are same");
    return;
  }

  //Case 4 : units are compatible
  if (fromUnitObject.type !== toUnitObject.type) {
    console.log("Units are not convertable");
    return;
  }

  // for result
 let result = 0;

  if (fromUnitObject.type == "length" || fromUnitObject.type == "weight") {
    // start - baseUnit Operation

    // baseUnit Operation
    //Case 5 : in lenght or width if value is == 0
    if (value === 0 && ( fromUnitObject.type == "length" ||  fromUnitObject.type == "weight")) {
      console.log(
        `${value} ${fromUnit} = ${value} ${toUnit} `,
      );
      return;
    }

    //TODO compatibility

    //TODO we want something which check is fromUnit's toUnit is its baseUnit or not ?

    // converting fromUnit into its baseUnit
    result = value * fromUnitObject.factor;

    if (fromUnitObject.baseUnit.name !== toUnit) {
      //TODO find toUnits --> base unit --> factor and divide by it
      // reverse factor to convert baseUnit --> another unit
      // e.g. m --> cm
      // e.g. g --> kg
      result = result * (1 / toUnitObject.factor);
      // console.log("2st result -->", result);
      // console.log(`${value} ${fromUnit} = ${result} ${toUnit} `);
    }

    // end - baseUnit Operation
  } else {
    // handle temperature converts
    let checkPair = `${fromUnit}-${toUnit}`;
    // console.log(checkPair);

    //switch
    switch (checkPair) {
      case "c-f":
        result = value * (9 / 5) + 32;
        break;
      case "c-k":
        result = value + 273.15;
        break;
      case "f-c":
        result = (value - 32) * (5 / 9);

        break;
      case "f-k":
        result = (value - 32) * (5 / 9) + 273.15;

        break;
      case "k-c":
        result = value - 273.15;
        break;
      case "k-f":
        result = (value - 273.15) * (9 / 5) + 32;
        break;

      default:
        console.log("Something wrong");

        break;
    }
  }

  console.log(`${value} ${fromUnit} = ${result} ${toUnit} `);
}

convertUnits(10, "km", "m");
convertUnits(1, "kg", "lb");
convertUnits(0, "C", "F");
convertUnits(0, "kg", "g");
convertUnits(50, "C", "kg");
convertUnits(0, "C", " ");
convertUnits(66, "m", "m");
convertUnits(66, "GB", "MB");


