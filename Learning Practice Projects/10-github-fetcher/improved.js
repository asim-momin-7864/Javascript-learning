// IMPROVEMENT: Cache DOM elements at the top. 
// Searching the DOM with getElementById over and over is slow. Do it once.
const dom = {
    form: document.getElementById("searchbar-form"),
    input: document.getElementById("searchbar"),
    loader: document.getElementById("loading"),
    resultDiv: document.getElementById("result-div"),
    error404Div: document.getElementById("error-404-div"),
    generalErrorDiv: document.getElementById("general-error-div"),
    profileUl: document.getElementById("user-profile-ul"),
    reposUl: document.getElementById("user-repos-ul"),
    resetBtn: document.getElementById("reset-btn")
};

//! MISTAKE FIXED: Removed global `userData`, `userRepos`, and `username`.
//* State should flow through functions as arguments and return values. 

// This prepares your brain for React props and state.

// ==========================================
// 1. UI STATE MANAGERS (DOM Manipulators)
// ==========================================

function toggleLoader(isLoading) {
    if (isLoading) {
        dom.loader.classList.remove("hideElement");
    } else {
        dom.loader.classList.add("hideElement");
    }
}

// IMPROVEMENT: Added a "hidden" state to clear the screen during loading
function decideUIRenderor(flag) {
    // First, hide everything
    dom.resultDiv.classList.add("hideElement");
    dom.error404Div.classList.add("hideElement");
    dom.generalErrorDiv.classList.add("hideElement");

    // Then, show only what is requested
    if (flag === "success") dom.resultDiv.classList.remove("hideElement");
    if (flag === "404") dom.error404Div.classList.remove("hideElement");
    if (flag === "general") dom.generalErrorDiv.classList.remove("hideElement");
}

function clearUI() {
    dom.profileUl.innerHTML = "";
    dom.reposUl.innerHTML = "";
}

// ==========================================
// 2. DATA FETCHERS (Pure Async Logic - NO DOM TOUCHING)
// ==========================================

async function fetchUserProfile(username) {
    console.log(`Fetching profile for: ${username}`);
    const response = await fetch(`https://api.github.com/users/${username}`);

    // MISTAKE FIXED: The "Silent Failure"
    // We explicitly THROW errors here so the centralFunc catch block can handle them.
    //! Notice how this function NO LONGER calls decideUIRenderor(). It just reports the error up the chain.
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("404"); 
        } else {
            throw new Error("General Server Error");
        }
    }

    return await response.json(); //! IMPROVEMENT: Return the data directly instead of assigning to a global var.
}

function selectTop5Repos(reposList) {
    // Sort descending by stars
    reposList.sort((a, b) => b.stargazers_count - a.stargazers_count);
    return reposList.slice(0, 5);
}

async function fetchUserRepos(username) {
    console.log(`Fetching repos for: ${username}`);
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);

    if (!response.ok) {
        throw new Error("Failed to fetch repos"); // Stops execution if this fails
    }

    let repos = await response.json();
    
    // IMPROVEMENT: Handle zero repos gracefully instead of throwing a fatal error.
    //* It's perfectly valid for a user to have 0 repos. It shouldn't crash the app.
    if (repos.length === 0) return []; 

    return selectTop5Repos(repos);
}

// ==========================================
// 3. RENDERERS (Data to DOM)
// ==========================================

// IMPROVEMENT: Render functions now accept data as arguments (`userData`)
function renderUserProfileUI(userData) {
    clearUI(); // Ensure it's clean before rendering

    dom.profileUl.innerHTML = `
        <li><img src="${userData?.avatar_url}" alt="Avatar" style="height: 100px" /> </li>
        <li>Username: ${userData?.login}</li>
        <li>Name: ${userData?.name || 'N/A'}</li>
        <li>Location: ${userData?.location || 'N/A'}</li>
        <li>Bio: ${userData?.bio || 'No bio available'}</li>
        <li><a href="${userData?.html_url}" target="_blank">GitHub Link</a></li>
        <li>Public Repos: ${userData?.public_repos}</li>
        <li>Followers: ${userData?.followers}</li>
        <li>Following: ${userData?.following}</li>
    `;
}

function renderUserReposUI(userRepos) {
    if (userRepos.length === 0) {
        dom.reposUl.innerHTML = "<li>This user has no public repositories.</li>";
        return;
    }

    let frag = new DocumentFragment();

    userRepos.forEach((repo) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <p><strong>Name:</strong> ${repo?.name}</p> 
            <p>Description: ${repo?.description || 'No description'}</p>
            <p>Stars: ${repo?.stargazers_count} | Forks: ${repo?.forks_count}</p>
            <a href="${repo?.html_url}" target="_blank">Repo Link</a>
            <hr>
        `;
        frag.appendChild(li);
    });

    dom.reposUl.appendChild(frag);
}

// ==========================================
// 4. THE COORDINATOR (Central Event Hub)
// ==========================================

function initApp() {
    toggleLoader(false);
    decideUIRenderor("hidden");

    // Reset Button Handler
    dom.resetBtn.addEventListener("click", () => {
        clearUI();
        dom.form.reset();
        decideUIRenderor("hidden");
    });

    // Main Form Submit Handler
    dom.form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = String(dom.input.value).trim();
        if (!username) return;

        // IMPROVEMENT: Clean Slate Protocol.
        // Hide old results and clear the list BEFORE making the new network request.
        clearUI();
        decideUIRenderor("hidden");
        toggleLoader(true);

        try {
            // 1. Fetch the data (execution stops here and jumps to 'catch' if a throw happens)
            const profileData = await fetchUserProfile(username);
            const reposData = await fetchUserRepos(username);

            // 2. If we reach this line, no errors were thrown! Render the UI.
            renderUserProfileUI(profileData);
            renderUserReposUI(reposData);
            
            // 3. Show the success UI container
            decideUIRenderor("success");

        } catch (error) {
            console.error("Caught an error in coordinator:", error.message);
            
            // IMPROVEMENT: Central Error Router. 
            // All errors end up here, and this block decides what the user sees.
            if (error.message === "404") {
                decideUIRenderor("404");
            } else {
                decideUIRenderor("general");
            }
        } finally {
            // 4. Always turn off the loader, whether it succeeded or failed.
            toggleLoader(false);
            dom.form.reset(); // Clear input bar
        }
    });
}

// Start the app
initApp();