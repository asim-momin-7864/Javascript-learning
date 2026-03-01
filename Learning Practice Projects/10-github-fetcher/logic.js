/*
------------------------------------------------------------------------------------------------

* ### About functions

! MISTAKE FIXED: Removed global `userData`, `userRepos`, and `username`.
* State should flow through functions as arguments and return values. 

------------------------------------------------------------------------------------------------

* ### Lesson Learned: Centralized Error Handling & The "Assembly Line" Concept

* *Why We Must Stop Execution on Errors:**
    If a worker function (like `fetchUserProfile`) realizes the user doesn't exist (returns a 404), 
    there is absolutely no reason to continue fetching their repos.
    Attempting to render the UI afterward will just cause JavaScript to crash because the `userData` variable will be null.

* *The Concept: "The Assembly Line"**
    Think of your main event listener as a factory manager running an assembly line:

    1. Fetch User
    2. Fetch Repos
    3. Render User
    4. Render Repos

 !   If the machine breaks at 
    Step 1, the manager shouldn't keep sending parts down to Steps 2, 3, and 4. 
    You have to tell the manager to halt the line immediately.

* *How to Stop (The Clean Code Way)**
    The best way to handle this in JavaScript is to let your worker functions (`fetchUserProfile`, etc.)
    `throw` errors upwards, and let your main manager (`centralFunc`'s event listener) `catch` them.

*    When an error is thrown inside a `try` block, 
*    JavaScript instantly stops executing the rest of the lines in that 
*    block and jumps straight to the `catch` block.

---

* ### Architecture Example

* #### 1. The Manager (Main Event Listener)

Wrap your sequence inside a `try...catch` block. 
This acts as the centralized controller.

```javascript

            document.getElementById("searchbar-form").addEventListener("submit", async (e) => {
                e.preventDefault();
                username = document.getElementById("searchbar").value;

                if (username.trim() == "") return;

                toggleLoader(true);

                try {
                    // --- The Assembly Line ---
                    await fetchUserProfile(); // If this THROWS an error, execution stops here!
                    await fetchUserRepos();   // This won't run.
                    
                    renderUserProfileUI();    // This won't run.
                    renderUserReposUI();      // This won't run.

                    // If we made it this far, everything succeeded!
                    decideUIRenderor("success");

                } catch (error) {
                    // The line stopped. Handle the UI error here.
                    console.error("Assembly line stopped because:", error.message);
                    
                    if (error.message === "404") {
                        decideUIRenderor("404");
                    } else {
                        decideUIRenderor(); // General error
                    }
                } finally {
                    toggleLoader(false); // Always turn off the loader at the very end
                }
            });

```

* #### 2. The Worker (`fetchUserProfile`)

    Now, you need to make sure your worker actually shouts (`throws`) 
    when it finds a problem, instead of just quietly using `return;`.

```javascript

        async function fetchUserProfile() {
            console.log(`from fetchUserProfile : ${username}`);
            let responseJson = await fetch(`https://api.github.com/users/${username}`);

            if (!responseJson.ok) {
                if (responseJson.status === 404) {
                    // THROW the error so the main function catches it and stops the line
                    throw new Error("404"); 
                } else {
                    throw new Error("Something went wrong on the server");
                }
            }

            userData = await responseJson.json();
            console.log(userData);
        }

```

* ### Why this is highly professional:

        Notice how much cleaner `fetchUserProfile` becomes.
        It doesn't need to know about `toggleLoader` or `decideUIRenderor` anymore. 
        It has one single job: fetch the data, or throw an error if it fails.

        This pattern is called **Centralized Error Handling**. 
        Instead of having UI logic scattered across 10 different functions, 
        all of your workers just `throw` errors, and your single main controller catches them and decides 
        what to put on the screen.

---


 */


/*

* Does the code match the diagram?
    Intentionally, yes. Technically, no.
    Your diagram shows that if an error happens in Fetch User or Fetch Repos, the flow stops and goes straight to the red Show Error box.
    However, in your code, your errors are failing silently, meaning the execution flow keeps running even when the API breaks.

* 2. The Critical Bug: The "Silent Failure"
Look closely at your fetchUserProfile function:

JavaScript
            if (!responseJson.ok) {
                if (responseJson.status === 404) {
                    decideUIRenderor("404");
                    console.error("User not found (404)");
                    // throw new Error("User not found (404)"); <--- YOU COMMENTED THIS OUT!
                } 
            }
            userData = await responseJson.json(); 


* What happens here: 
        If I search for a fake user ("asdfghjkl"), the API returns a 404. 
        Your code correctly catches the !responseJson.ok and shows the 404 image. 
        BUT, because you commented out the throw new Error, JavaScript says, "Okay, error handled, moving on!"

        It immediately tries to execute userData = await responseJson.json();
        (which breaks because the 404 response isn't the JSON you expect). 
        Even worse, your centralFunc coordinator doesn't know an error happened! 
        It moves on and tries to run await fetchUserRepos(), 
        which makes a useless network request for a user that doesn't exist, and then tries to render the UI.

* The Fix: You must throw the error so your central try/catch block can actually catch it and stop the execution sequence.

* JavaScript
            // Inside fetchUserProfile:
            if (!responseJson.ok) {
                if (responseJson.status === 404) {
                    decideUIRenderor("404");
                    throw new Error("404"); // THIS STOPS THE FUNCTION IMMEDIATELY
                } else {
                    decideUIRenderor("general");
                    throw new Error("Server error");
                }
            }


*/



//* Gobal Vars
let username = null;

//TODO in-memory storage
let userData = null;
let userRepos = null;

//* show loading
function toggleLoader(isLoading) {

    if (isLoading) {
        document.getElementById("loading").classList.remove("hideElement");
    } else {
        document.getElementById("loading").classList.add("hideElement");
    }

}

//TODO Main-Render UI function - which display depends on - ERROR or RESULT
function decideUIRenderor(flag) {
    if (flag == "success") {
        document.getElementById("result-div").classList.remove("hideElement");
        document.getElementById("error-404-div").classList.add("hideElement");
        document.getElementById("general-error-div").classList.add("hideElement");
    } else if (flag == "404") {
        document.getElementById("result-div").classList.add("hideElement");
        document.getElementById("error-404-div").classList.remove("hideElement");
        document.getElementById("general-error-div").classList.add("hideElement");
    } else {
        document.getElementById("result-div").classList.add("hideElement");
        document.getElementById("error-404-div").classList.add("hideElement");
        document
            .getElementById("general-error-div")
            .classList.remove("hideElement");
    }

}

//TODO Fetch User
async function fetchUserProfile() {

    console.log(`from fetchUserProfile : ${username}`);
    let responseJson = await fetch(`https://api.github.com/users/${username}`);

    // response checking , request is successful or nor , 200, 201, 300, 404, 500

    if (!responseJson.ok) {
        // toggleLoader(false);
        if (responseJson.status === 404) {
            decideUIRenderor("404");
            console.error("User not found (404)");
            // throw new Error("User not found (404)");
            //* throw errors  and handle them full from showing to UI rendering in catch.
            //! but here, we didnot designed function for error handling -- and rendering here -- so skip
        } else {
            decideUIRenderor();
            console.error("Something went wrong on the server");
            // throw new Error("Something went wrong on the server");
        }
    }

    userData = await responseJson.json();

    //TODO Render UI - for data

    console.log(userData);

    // console.log("ERROR");
    // console.error(error);
    // decideUIRenderor();
    // Better Error Managment - throw errors handle fully in catch { }
    //* we should handle all kind of ERRORS we throw from above , and according it render ERROR UIs

    //! no need to making chaining fetchUserProfile --> fetchUserRepos
    // keep moduler approch, easy to update and manage
}


//TODO Sort 5 repos

function selectTop5Repos(reposList) {

    reposList.sort(
        //! invalid synatx and return missing
        // (aRepoStar = a.stargazers_count, bRepoStar = b.stargazers_count) => {
        //   aRepoStar - bRepoStar;
        // },

        (a, b) => {
            return a.stargazers_count - b.stargazers_count;
        },
    );

    reposList = reposList.slice(0, 5);

    return reposList;

    // console.error(error);
    // decideUIRenderor();
}


//TODO Fetch Repo
async function fetchUserRepos() {

    console.log(`from fetchUserRepos : ${username}`);

    let responseJson = await fetch(
        ` https://api.github.com/users/${username}/repos?per_page=100`,
    );

    if (!responseJson.ok) {
        //   toggleLoader(false); -- Writting again and again
        decideUIRenderor("404");
        console.error("Could not fetch repos");

        // throw new Error("Could not fetch repos");
    }

    userRepos = await responseJson.json();

    userRepos = selectTop5Repos(userRepos);

    //? not giving selectTop5Repos module saving directly in memory , insted of returing value and saving in fetchUserRepo?
    /*
                            
                            *Beacuse ->
                            Yes, your current code structure is actually better for "Clean Code" than the diagram.
                        
                            In programming, it is usually better to have a "Coordinator" function 
                            (like your fetchUserRepos) that handles the sequence of events.
                            If your selectTop5Repos module was responsible for saving to the store, 
                            it would be "tightly coupled"—meaning you couldn't use 
                            that sorting function anywhere else without it trying to save data to your memory store.
                        
                        --------------------------------------------------------------------
                        
                            * One module on responsibility 
                            * think if you add that does it can run alone, or break
                            * is it becoming tightly coupled ?
                        
                        --------------------------------------------------------------------
                        
                            */

    // for testing zero repos user case
    zeroReposTest = [];

    //* github returns array with 0 length, if user have zero repos
    if (userRepos.length == 0) {
        //   toggleLoader(false); -- Writting again and again

        // we will later design UI message for this case
        throw new Error("User have Zero repos");
    }
    console.log(userRepos);

    //! do not chain function - beacuse they are in order - bcz it creates unncessesory dependency
    //! without this function, netx chain function is useless
    //! and make bug finding and managing harder

    // renderUserProfileUI();
    // renderUserReposUI();

    //* insted call them in main function in order

    // -----------------------

    // ! toggleLoader(false);-- Writting again and again  and at the end we are doing it no matter try or catch
    //* write into finally { }

    // console.error(error);
    // decideUIRenderor();

    // toggleLoader(false); //* better, We can follow DRY principle

}

//TODO Render User Profile
function renderUserProfileUI() {

    let userProfileUl = document.getElementById("user-profile-ul");
    userProfileUl.innerHTML = "";

    //   let fragment = document.createDocumentFragment();
    //   let userProfileUl = document.createElement("ul");

    userProfileUl.innerHTML = `
    <li><img src=${userData?.avatar_url} alt="" style="height: 100px" /> </li>
           <li>Username: ${userData?.login}</li>
            <li>Name: ${userData?.name}</li>
            <li>Location: ${userData?.location}</li>
            <li>Email: ${userData?.email}</li>
            <li>Bio: ${userData?.bio}</li>
            <li><a href=${userData?.html_url}>github link</a></li>
            <li>Public Repos: ${userData?.public_repos}</li>
            <li>Followers: ${userData?.followers}</li>
            <li>Followings: ${userData?.following}</li>
    `;

    //   userProfileDiv.appendChild(userProfileUl);

    // console.error(error);
    // decideUIRenderor();
}


//TODO Render User Repos
function renderUserReposUI() {

    // access div
    // create fragment
    // loop over
    // insert into fragment
    // insert into div

    let userReposUI = document.getElementById("user-repos-ul");
    userReposUI.innerHTML = "";

    // fragment
    let frag = new DocumentFragment();

    userRepos.forEach((repo) => {
        let li = document.createElement("li");

        li.innerHTML = ` <p>Name: ${repo?.name} </p> 
            <p>description: ${repo?.description}</p>
            <p>stargazers_count: ${repo?.stargazers_count}</p>
            <p>watchers_count: ${repo?.watchers_count}</p>
            <p>forks_count: ${repo?.forks_count},</p>
            <a href=${repo?.html_url} >Repo Link</a>
            `;

        frag.appendChild(li);
    });

    userReposUI.appendChild(frag);

    // clean form
    document.getElementById("searchbar-form").reset();

    // console.error(error);
    // decideUIRenderor();
}


// TODO reset app
document.getElementById("reset-btn").addEventListener("click", (e) => {

    userData = null;
    userRepos = null;
    document.getElementById("user-profile-ul").innerHTML = "";
    document.getElementById("user-repos-ul").innerHTML = "";
    document.getElementById("searchbar-form").reset();

    // disable ERROR flag
    decideUIRenderor("success");

    // console.error(error);
    // decideUIRenderor();

});

//* Central function
function centralFunc() {

    // off loader initially
    toggleLoader(false);

    decideUIRenderor("success");

    userData = null;
    userRepos = null;
    username = null;

    //* Form Handler
    document
        .getElementById("searchbar-form")
        .addEventListener("submit", async (e) => {

            try {
                e.preventDefault();

                // start loading
                toggleLoader(true);

                username = document.getElementById("searchbar").value;

                //TODO Input Validation
                if (username.trim() == "") {
                    // call error showing module (DOM)
                    // toggleLoader(false);
                    throw new Error("Empty username");

                }

                // confirm string
                username = String(username);
                console.log(username);

                //* GOOD - do invoke order like this, instead of chaining one ---> into ---> another ,bcz we just need to invoke them in order

                await fetchUserProfile();
                await fetchUserRepos();

                renderUserProfileUI();
                renderUserReposUI();

            } catch (error) {
                console.error(error);
                // decideUIRenderor();
            } finally {
                toggleLoader(false) // at end efficently turn of loader , beacuse no matter , if we got error or result we are turning off
            }
        });

}


/*

Key Takeaway
A try...catch block only catches errors for the synchronous code running inside it at that exact moment. 
Because addEventListener just sets up code to be run later in the future, 
any errors thrown inside that future code must be caught by a try...catch located inside that future code.

 */

centralFunc();
