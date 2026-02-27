// Gobal Vars
let username;

//* show loading
function toggleLoader(isLoading) {
    if (isLoading) {
        document.getElementById("loading").classList.remove("hideLoader");
    } else {
        document.getElementById("loading").classList.add("hideLoader");
    }
}
// off loader initially
toggleLoader(false);

//TODO in-memory storage
let userdata = {};
let userRepos = [];

//TODO Fetch User
async function fetchUserProfile() {
    try {
        console.log(`from fetchUserProfile : ${username}`);
        let responseJson = await fetch(`https://api.github.com/users/${username}`);

        // response checking , request is successful or nor , 200, 201, 300, 404, 500

        if (!responseJson.ok) {
            toggleLoader(false);
            if (responseJson.status === 404) {
                throw new Error("User not found (404)");
            } else {
                throw new Error("Something went wrong on the server");
            }
        }

        let userdata = await responseJson.json();

        //TODO Render UI - for data

        console.log(userdata);
    } catch (error) {
        console.log("ERROR");
        console.error(error);

        //TODO create  ERROR UI render functions - so can use multimple places

        //TODO use reset

        //! no need to making chaining fetchUserProfile --> fetchUserRepos
        // keep moduler approch, easy to update and manage
    }

    //   toggleLoader(false);
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
}

//TODO Fetch Repo
async function fetchUserRepos() {
    try {
        console.log(`from fetchUserRepos : ${username}`);

        let responseJson = await fetch(
            ` https://api.github.com/users/${username}/repos?per_page=100`,
        );

        if (!responseJson.ok) {
            //   toggleLoader(false); -- Writting again and again
            throw new Error("Could not fetch repos");
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
            throw new Error("User have Zero repos");
        }
        console.log(userRepos);

        // toggleLoader(false);-- Writting again and again
    } catch (error) {
        console.error(error);

        // TODO reuse Error showing module smartly fro different type of errors
        // 404, InternalError, Zero Repos
    } finally {
        toggleLoader(false); //* better, We can follow DRY principle
    }
}

//* Form Handler
document
    .getElementById("searchbar-form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        // start loading
        toggleLoader(true);

        username = document.getElementById("searchbar").value;

        //TODO Input Validation
        if (username.trim() == "") {
            // call error showing module (DOM)
            toggleLoader(false);
            return;
        }

        // confirm string
        username = String(username);
        console.log(username);

        await fetchUserProfile();
        await fetchUserRepos();
    });

//TODO Error UI Render Module

//TODO Render User Profile

//TODO Render User Repos

// TODO reset app
