"use strict";
let user = "tj";
fetchUser(user);

/*----------------------------------------------------------------------------*/
/*                               FORM CONTROLS                              
/*----------------------------------------------------------------------------*/

const FORM = document.getElementById("user-search");
const SEARCH_BUTTON = document.getElementById("search-button");
const SEARCH_INPUT = document.getElementById("search");
const SEARCH_LABEL = document.getElementById("search-label");

FORM.addEventListener("submit", (e) => e.preventDefault())

SEARCH_INPUT.addEventListener("focusin", (e) => {
  SEARCH_LABEL.classList.add("isHidden");
  e.target.value = "";
});

SEARCH_INPUT.addEventListener("keypress", (e) => {
  if (e.key === "Enter") e.target.blur() 
});

SEARCH_BUTTON.addEventListener("click", e => {
  let user = SEARCH_INPUT.value;
  user ? fetchUser(user) : SEARCH_LABEL.classList.remove("isHidden");
});



/*----------------------------------------------------------------------------*/
/*                                 API FETCH                                  
/*----------------------------------------------------------------------------*/

//TODO Make Website, Twitter, and Company Information all links. Company should link to company's page on github
//TODO Remove @ symbol from company link for link URL (ex: @github ==> https://github.com/github)
//TODO Show User Tag without @ Symbol in UserName field if name is empty

function fetchUser(user) {
  fetch(`https://api.github.com/users/${user}`)
    .then(response => handleFetchResponse(response))
    .then(data => updateUserFields(data))
    .catch(error => console.log(error));
}

function handleFetchResponse(response) {
  if (!response.ok) {
    document.getElementById("search-label").classList.remove("isHidden");
    throw Error(response.statusText);
  } else {
    return response.json()
  }
}

function updateUserFields(data) {
  const USER_FIELDS = ["avatar", "name", "tag", "joinDate", "bio", "repos", 
                     "followers", "following", "location", "twitter", "website", 
                     "company"]

  USER_FIELDS.forEach(field => update(field, data));
}

function update(element, data) {
  let el = document.querySelector(`[data-user="${element}"]`);
  let value;

  switch(element) {
    case "avatar":
      value = data.avatar_url;
      el.setAttribute("src", value);
      break;
    case "name":
      value = data.name;
      if(value || value === 0) {
        el.textContent = value;
        el.parentNode.classList.remove("grayed-out");
      } else {
        el.textContent = "No Name Available";
        el.parentNode.classList.add("grayed-out");
      }
      break;
    case "tag":
      value = data.login;
      el.textContent = "@" + value;
      break;
    case "bio":
      value = data.bio;
      if (value == null) {
        el.textContent = "This profile has no bio";
      } else {
        el.textContent = value;
      }
      break;
    case "joinDate": 
      value = data.created_at;
      let date = new Date(value);
      let formatter = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric', 
        month: 'short', 
        year: 'numeric'});

      el.textContent = `Joined ${formatter.format(date)}`
      break;
    case "repos":
      value = data.public_repos;
      if(value || value === 0) {
        el.parentNode.classList.remove("grayed-out");
        el.textContent = value;
      } else {
        el.textContent = "Not Available";
        el.parentNode.classList.add("grayed-out");
      }
      break;
    case "followers":
      value = data.followers;
      if(value || value === 0) {
        el.parentNode.classList.remove("grayed-out");
        el.textContent = value;
      } else {
        el.textContent = "Not Available";
        el.parentNode.classList.add("grayed-out");
      }
      break;
    case "following":
      value = data.following;
      if(value || value === 0) {
        el.parentNode.classList.remove("grayed-out");
        el.textContent = value;
      } else {
        el.textContent = "Not Available";
        el.parentNode.classList.add("grayed-out");
      }
      break;
    case "location":
      value = data.location;
      if(value || value === 0) {
        el.parentNode.classList.remove("grayed-out");
        el.textContent = value;
      } else {
        el.textContent = "Not Available";
        el.parentNode.classList.add("grayed-out");
      }
      break;
    case "twitter":
      value = data.twitter_username;
      if(value || value === 0) {
        el.parentNode.classList.remove("grayed-out");
        el.textContent = value;
      } else {
        el.textContent = "Not Available";
        el.parentNode.classList.add("grayed-out");
      }
      break;
    case "website":
      value = data.blog;
      el.setAttribute("href", value);
      if(value || value === 0) {
        el.parentNode.classList.remove("grayed-out");
        el.textContent = value;
      } else {
        el.textContent = "Not Available";
        el.parentNode.classList.add("grayed-out");
      }
      break;
    case "company":
      value = data.company;
      if(value || value === 0) {
        el.parentNode.classList.remove("grayed-out");
        el.textContent = value;
      } else {
        el.textContent = "Not Available";
        el.parentNode.classList.add("grayed-out");
      }
      break;
    default:
      if(value || value === 0) {
        el.parentNode.classList.remove("grayed-out");
        el.textContent = value;
      } else {
        el.textContent = "Not Available";
        el.parentNode.classList.add("grayed-out");
      }
      break;
  }
}


/*----------------------------------------------------------------------------*/
/*                            COLOR THEME SWITCH                              */
/*----------------------------------------------------------------------------*/

const lightThemeToggleSwitch = document.querySelector(`[data-switch="light"]`);
const darkThemeToggleSwitch = document.querySelector(`[data-switch="dark"]`);

lightThemeToggleSwitch.addEventListener("click", () => changeThemeTo("light"))
darkThemeToggleSwitch.addEventListener("click", () => changeThemeTo("dark"))

function changeThemeTo(themeName) {
  lightThemeToggleSwitch.classList.toggle("isHidden");
  darkThemeToggleSwitch.classList.toggle("isHidden");
  document.body.setAttribute("data-theme", themeName);
}