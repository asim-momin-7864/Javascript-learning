let buttons = document.querySelectorAll(".button");
let body = document.querySelector("body");

console.log(buttons); // NodeList is iterable
console.log(body);

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // console.log(e); // all info about event and on e.target you get all information about who triggered this event
    console.log(e.target); // show which element triggered this event // => <div id="pink" class="button"></div>
    body.style.backgroundColor = e.target.id;
  });
});
