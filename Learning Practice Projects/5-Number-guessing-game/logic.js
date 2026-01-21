// all elements
let form = document.getElementById("form");
let guessRemaining = document.getElementById("guessRemaining");
let previousGuesses = document.getElementById("previousGuesses");
let result = document.getElementById("result");
let previousGuessesArray = [];
let guessRemainingScore = 10;
let body = document.querySelector("body");

//TODO generate random number
let randomNumberGenerated = Math.floor(Math.random() * 20 + 1);
console.log(randomNumberGenerated);

//TODO try to play game for one time

//TODO game win or loss - Trails

form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("score :-", guessRemainingScore);

  let userInput = parseInt(document.getElementById("userInput").value);

  //TODO input checking.
  if (isNaN(userInput)) {
    result.innerText = "Invalid Input";
    return;
  }
  console.log(userInput);
  previousGuessesArray.push(userInput);
  console.log(previousGuessesArray);

  if (randomNumberGenerated === userInput) {
    //! body.innerHTML = "<H1> YOU WIN !!!  </H1>";
    // replacing whole body is bad practice
    result.innerHTML = "<h1> YOU WIN !!! </h1>";
    form.style.display = "none";
    return;
  } else {
    //TODO try to update states
    result.textContent = "Wrong!";
    document.getElementById("userInput").value = "";
    previousGuesses.innerText = `Previous Guesses : [${previousGuessesArray.join(",  ")}]`;
    //TODO try to play game for 10 time
    guessRemainingScore--;
    guessRemaining.innerText = `Guess Remaining : ${guessRemainingScore}`;
  }

  if (guessRemainingScore == 0) {
    console.log("score :-", guessRemainingScore);

    //! body.innerHTML = "<H1> GAME OVER ! YOU LOOSE </H1>";
    result.innerHTML = "<h1> YOU LOSS !! GAME OVER";
    form.style.display = "none";
  }
});

/*


Here is a structured reference note you can save. It breaks down exactly why both versions failed on the last guess.

---

# 📝 Debugging Reference: The "Game Over" Logic Bug

This note explains why logic placement matters in event-driven programming (like JavaScript games).

## Version 1: The "Scope" Bug

**The Code:** You placed the `if (score > 0)` check **outside** the event listener.

```javascript

let score = 10;
 ❌ This line only runs ONCE when the page loads
if (score > 0) {
    form.addEventListener("submit", ...)
} else {
     ❌ This is never reached because score starts at 10
    console.log("Game Over");
}

```

### 🔍 Step-by-Step: What happens on the last chance?

*(Scenario: User has 1 guess left and guesses wrong)*

1. **Page Load:** The code runs top-to-bottom. `score` is 10. The `if` condition is TRUE. The event listener is attached. The `else` block is ignored forever.
2. **User Clicks (Score 1):** The code inside the listener runs. `score` becomes 0. Text updates to "0".
3. **Result:** The game continues allowing inputs. The `else` block (Game Over) cannot be reached because the computer never looks at that outer `if` statement again.

---

## Version 2: The "One Click Late" Bug

**The Code:** You placed the `if/else` check **inside** the listener, but it wraps the whole logic.

```javascript

form.addEventListener("submit", () => {
    ❌ Checks OLD score before updating
   if (score >= 1) {
        Play logic...
       score--;  Score becomes 0 here
   } else {
        Game Over
   }
});

```

### 🔍 Step-by-Step: What happens on the last chance?

*(Scenario: User has 1 guess left and guesses wrong)*

1. **Current Score:** `1`
2. **User Clicks Submit.**
3. **Check Condition:** `if (score >= 1)` checks `1 >= 1`. This is **TRUE**.
4. **Enter "Play" Block:** The code enters the `if` block (not the `else`).
5. **Wrong Guess:** The guess is processed as wrong.
6. **Update Score:** `score--` runs. The score becomes **0**.
7. **Update UI:** Screen shows "Guess Remaining: 0".
8. **Function Ends:** The code finishes. The `else` block (Game Over) was skipped because we entered the `if` block.
9. **Result:** You see "0 Guesses" but **no** "Game Over" message. You have to click submit *one more time* to trigger the `else` block.

---

## ✅ The Solution: "Post-Check" Logic

**The Logic:** Always check for the "Game Over" state **immediately after** you change the score.

```javascript

form.addEventListener("submit", () => {
    1. Play the turn
    ... check guess ...
   
    2. Update the state
   score--; 

    3. Check for Game Over NOW (Post-Check)
   if (score === 0) {
       console.log("Game Over");
   }
});

```

### 🔍 Step-by-Step: Why this works

*(Scenario: User has 1 guess left and guesses wrong)*

1. **Current Score:** `1`
2. **User Clicks Submit.**
3. **Wrong Guess:** Guess processed.
4. **Update Score:** `score--` runs. Score becomes **0**.
5. **Check Condition:** `if (score === 0)` checks `0 === 0`. This is **TRUE**.
6. **Result:** "Game Over" message appears instantly.

*/
