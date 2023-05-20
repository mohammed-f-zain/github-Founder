const darkModeToggle = document.getElementById("dark_mode");
const body = document.body;

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});
const inputElement = document.getElementById("input");
const personalImgElement = document.querySelector(".personalimg");
const nameElement = document.querySelector(".name");
const usernameElement = document.querySelector(".username");
const bioElement = document.querySelector(".bio");
const followersElement = document.querySelector(".followers");
const followingElement = document.querySelector(".following");
const repositoriesElement = document.querySelector(".cards");

inputElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const username = inputElement.value;
    fetchData(username);
  }
});

function fetchData(username) {
  fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((data) => {
      personalImgElement.src = data.avatar_url;
      nameElement.textContent = data.name || "Name not found";
      usernameElement.textContent = data.login || "Username not found";
      bioElement.textContent = data.bio || "Bio not found";
      followersElement.textContent = data.followers || "0";
      followingElement.textContent = data.following || "0";

      fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())
        .then((repos) => {
          repositoriesElement.innerHTML = "";
          repos.forEach((repo) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
              <div class="card_row_one">
                <h4 class="repo_name">${repo.name}</h4>
                <p class="status">${repo.private ? "Private" : "Public"}</p>
              </div>
              <div class="card_row_two">
                <i class="fa-regular fa-star fa-lg" style="color: #ffd500"></i>
                <span class="star_rate">${repo.stargazers_count}</span>
              </div>
            `;
            repositoriesElement.appendChild(card);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
