let form = document.querySelector("#form");
console.log(form);

// here, outside event dont get fields value
//! let height = parseInt(document.querySelector("#height"))
// beacuse it give use value immidiatly after page load

// we want value at before submitting form

form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(e);

  let height = parseInt(document.querySelector("#height").value);
  console.log("Height : ", height);
  let weight = parseInt(document.querySelector("#weight").value);
  console.log("Weight : ", weight);

  let result = document.querySelector("#result");
  let output;

  // input checking
  if (height === "" || height < 0 || isNaN(height)) {
    output = `Invalid height : ${height}`;
  } else if (weight === "" || weight < 0 || isNaN(weight)) {
    output = `Invalid weight : ${weight}`;
  } else {
    output = (weight / ((height * height) / 10000)).toFixed(2);
  };

  result.textContent = output;
  
});
