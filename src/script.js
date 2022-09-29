"use strict";
let user = "octocat";
fetchUser(user);

/*                        FORM CONTROL                        */

let form = document.getElementById("user-search");
form.addEventListener("submit", (e) => e.preventDefault())

let searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", onSearchButtonClicked);

let searchInput = document.getElementById("search");
searchInput.addEventListener("focusin", () => {
  document.getElementById("search-label").classList.add("isHidden");
});

function onSearchButtonClicked(e) {
  let user = searchInput.value;
  if (!user) {
    document.getElementById("search-label").classList.toggle("isHidden");
  }
  console.log(user);
  
}


/*                            API FETCH                               */
function fetchUser(user) {
  fetch(`https://api.github.com/users/${user}`)
    .then(response => response.json())
    .then(data => updateUser(data));
}

function update(element, value, href=null) {
  let el = document.querySelector(`[data-js="${element}"]`);

  switch(element) {
    case "userAvatar":
      el.setAttribute("src", value);
      break;
    case "userTag":
      el.textContent = "@" + value;
      break;
    case "userBio":
      if (value == null) {
        el.textContent = "This profile has no bio";
      } else {
        el.textContent = value;
      }
      break;
    case "userJoinDate": 
      let date = new Date(value);
      let formatter = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric', 
        month: 'short', 
        year: 'numeric'});

      el.textContent = `Joined ${formatter.format(date)}`
      break;
    case "userWebsite":
      el.setAttribute("href", href);
    default:
      if(value || value === 0) {
        el.textContent = value;
      } else {
        el.textContent = "Not Available";
        el.parentNode.classList.add("grayed-out");
      }
      break;
  }
}

function updateUser(data) {
  update("userAvatar", data.avatar_url);
  update("userName", data.name);
  update("userTag", data.login);
  update("userBio", data.bio);
  update("userRepos", data.public_repos);
  update("userFollowers", data.followers);
  update("userFollowing", data.following);
  update("userLocation", data.location);
  update("userTwitter", data.twitter_username);
  update("userWebsite", data.blog, data.blog);
  update("userCompany", data.company);
  update("userJoinDate", data.created_at);
}

/*                          COLOR THEME SWITCH                              */
let lightThemeToggleSwitch = document.querySelector(`[data-switch="light"]`);
let darkThemeToggleSwitch = document.querySelector(`[data-switch="dark"]`)

lightThemeToggleSwitch.addEventListener("click", (e) => {
  lightThemeToggleSwitch.classList.toggle("isHidden");
  darkThemeToggleSwitch.classList.toggle("isHidden");
  document.body.setAttribute("data-theme", "default");
})

darkThemeToggleSwitch.addEventListener("click", (e) => {
  lightThemeToggleSwitch.classList.toggle("isHidden");
  darkThemeToggleSwitch.classList.toggle("isHidden");
  document.body.setAttribute("data-theme", "dark");
})