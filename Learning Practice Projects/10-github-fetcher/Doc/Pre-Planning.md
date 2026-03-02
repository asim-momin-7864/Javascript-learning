# Project Plan: Github User Fetcher

The goal is to learn about async operations, external api's.

---

## 1. The Big Picture (Pre-Flight)
* **Purpose:** This is single page github user finding tool which fetch users profile and top 5 repos.
* **Success Criteria:** When it successfully fetch existing users profile data and top 5 repos and present in in frontend.
* **Scope IN:**    
    <ol>
    <li>Fetch users profile data.</li>
    <li>Show users top 5 repos by highest starts count</li>
    <li>Links to profile and each repo.</li>
    </ol>   
* **Scope OUT:** 
    <ol>
    <li> Clone repo feature.</li>
    <li> Github implmetation to manage github profiles.</li>
    </ol>

---

## 2. The 6-Question Logic Blueprint

1. **State:** What core data am I tracking?
   * `githubUser`, `isLoading`, `reposList`

2. **Triggers:** What user actions or system events change this state?
   * User enter github persons username in search bar and search.
   * Fetching user profile data from github api.
   * Fetching user repos data from github api.

3. **Dependencies:** What must happen *first*?
   * Entered username should be correct, must not leave empty.  
   * That named user should exists on github.

4. **Failures (Edge Case Matrix):** What are the top 5 ways this breaks?
   * Empty or incorrect Username.  
   * That name user is not exists on github.
   * Rate limit hit.
   * User not have any repo.

5. **Resolution:** How does the system recover or inform the user?
   * Show Relevant Error Message with Error UI.
   * After that empty all states. 
   * Show `Reset` button. 

6. **Reset:** How does the state return to normal?
   * Clear search bar.
   * isLoading back to false.
   * Remove Result ( Profile & Repo's List ) or Error.
   * After that empty all states. 


---

## 3. Data & API Contracts


### API Endpoints
* **Route:** `GET https://api.github.com/users/{username} `
* **Expected Input (Request):**
  ```json
  {
    "username": "octocat"
  }
  ```
* **Expected Output (Response):**
  ```json
    {
    "login": "octocat",
    "id": 583231,
    "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
    "url": "https://api.github.com/users/octocat",
    "html_url": "https://github.com/octocat",
    "type": "User",
    "name": "The Octocat",
    "location": "San Francisco",
    "email": null,
    "bio": null,
    "public_repos": 8,
    "followers": 21919,
    "following": 9,
    }
  ```
  ---
* **Route:** `GET https://api.github.com/users/{username}/repos?per_page=100 `
* **Expected Input (Request):**
  ```json
  {
    "username": "octocat"
  }
  ```
* **Expected Output (Response):**
  ```json
  [
        {
        "id": 132935648,
        "name": "boysenberry-repo-1",
        "html_url": "https://github.com/octocat/boysenberry-repo-1",
        "description": "Testing",
        "stargazers_count": 433,
        "watchers_count": 433,
        "forks_count": 26,
        "forks": 26,
        "watchers": 433,
       },
        {
        "id": 132935648,
        "name": "boysenberry-repo-1",
        "html_url": "https://github.com/octocat/boysenberry-repo-1",
        "description": "Testing",
        "stargazers_count": 433,
        "watchers_count": 433,
        "forks_count": 26,
        "forks": 26,
        "watchers": 433,
       },
        {
        "id": 132935648,
        "name": "boysenberry-repo-1",
        "html_url": "https://github.com/octocat/boysenberry-repo-1",
        "description": "Testing",
        "stargazers_count": 433,
        "watchers_count": 433,
        "forks_count": 26,
        "forks": 26,
        "watchers": 433,
      }
  ]
  ```

---

## 4. System Architecture & Diagrams

* **Level-0 Context Diagram:** 
* **internal Logic and data flow Diagram** 

---

## 5. Post-Project Retrospective (Fill out after completion)

*This is where pattern memory and architectural skills are built.*

* **What broke that I didn't predict?** [Insert unexpected bugs]
* **What logic became too messy?** [Insert areas where code got tangled]
* **Implementation Decisions:** [Why did you choose approach X over Y during coding?]
* **If I built this again tomorrow, what architectural choice would I change?** [Insert lessons learned]
