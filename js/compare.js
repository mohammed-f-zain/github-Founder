// User One elements
const userOne = {
  input: document.querySelector("#user_one_input"),
  img: document.querySelector(".personal_img_one"),
  name: document.querySelector(".name_one"),
  username: document.querySelector(".username_one"),
  repo: document.querySelector(".user_one_repo"),
};

// User Two elements
const userTwo = {
  input: document.querySelector("#user_two_input"),
  img: document.querySelector(".personal_img_two"),
  name: document.querySelector(".name_two"),
  username: document.querySelector(".username_two"),
  repo: document.querySelector(".user_two_repo"),
};

// Event listener for User One input
userOne.input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const username = userOne.input.value;
    fetchData(
      username,
      userOne.img,
      userOne.name,
      userOne.username,
      userOne.repo
    );
  }
});

// Event listener for User Two input
userTwo.input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const username = userTwo.input.value;
    fetchData(
      username,
      userTwo.img,
      userTwo.name,
      userTwo.username,
      userTwo.repo
    );
  }
});

// Modal dialog elements
const winnerDialog = document.querySelector(".winner");
const winnerImg = document.querySelector(".Winner_img");
const winnerName = document.querySelector(".winner_name");
const winnerUsername = document.querySelector(".winner_username");

// Open modal dialog
const openModal = function () {
  winnerDialog.classList.remove("hidden");
};

// Close modal dialog
const closeModal = function () {
  winnerDialog.classList.add("hidden");
};

// Compare button event listener
const compareBtn = document.querySelector(".compare_btn");
compareBtn.addEventListener("click", function () {
  openModal();

  document.querySelector("#close_winner").addEventListener("click", closeModal);

  const userOneRepoCount = parseInt(userOne.repo.textContent);
  const userTwoRepoCount = parseInt(userTwo.repo.textContent);
  let winner = "";

  if (userOneRepoCount > userTwoRepoCount) {
    winner = "User One";
    winnerImg.src = userOne.img.src;
    winnerName.textContent = userOne.name.textContent;
    winnerUsername.textContent = userOne.username.textContent;
  } else if (userTwoRepoCount > userOneRepoCount) {
    winner = "User Two";
    winnerImg.src = userTwo.img.src;
    winnerName.textContent = userTwo.name.textContent;
    winnerUsername.textContent = userTwo.username.textContent;
  } else {
    winner = "tie";
    winnerImg.src = "images/tie.png";
    winnerName.textContent = "Oops....";
    winnerUsername.textContent = "Tie Game";
  }
});

// Fetch user data from GitHub API
function fetchData(
  username,
  imgElement,
  nameElement,
  usernameElement,
  repoElement
) {
  fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((data) => {
      imgElement.src = data.avatar_url;
      nameElement.textContent = data.name || "Name not found";
      usernameElement.textContent = data.login || "Username not found";

      fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        .then((response) => response.json())
        .then((repos) => {
          repoElement.textContent = repos.length;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
