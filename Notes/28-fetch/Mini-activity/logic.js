//* fetch() Activity

// DOM
let usersUL = document.getElementById("users-ul");

async function fetchUsers() {
  try {
    let jsonRes = await fetch("https://jsonplaceholder.typicode.com/users");

    console.log(jsonRes);
    

    let jsRes = await jsonRes.json();

    jsRes.map((user) => {
      let newUserLI = document.createElement("li");
      newUserLI.classList.add("users-li");
      newUserLI.innerHTML = `
            <p class="id" >${user.id}</p>
            <p class="name" >${user.name}</p>
            <p class="username" >${user.username}</p>
            <p class="email" >${user.email}</p>
            <p class="phone" >${user.phone}</p>
            <p class="website" >${user.website}</p>
            <p class="company-name" >${user.company.name}</p>
        `;

      usersUL.appendChild(newUserLI);
    });
  } catch (error) {
    console.log(" E : ", error);
  }
}

fetchUsers();
