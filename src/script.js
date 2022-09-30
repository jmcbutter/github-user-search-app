"use strict";
fetchUser("octocat");

/*----------------------------------------------------------------------------*/
/*                               FORM CONTROLS                              
/*----------------------------------------------------------------------------*/

const FORM = document.getElementById("user-search");
const SEARCH_BUTTON = document.getElementById("search-button");
const SEARCH_INPUT = document.getElementById("search");
const SEARCH_LABEL = document.getElementById("search-label");

FORM.addEventListener("submit", (e) => e.preventDefault());

SEARCH_INPUT.addEventListener("focusin", (e) => {
  SEARCH_LABEL.classList.add("isHidden");
  e.target.value = "";
});

SEARCH_INPUT.addEventListener("keypress", (e) => {
  if (e.key === "Enter") e.target.blur();
});

SEARCH_BUTTON.addEventListener("click", (e) => {
  let user = SEARCH_INPUT.value;
  user ? fetchUser(user) : SEARCH_LABEL.classList.remove("isHidden");
});



/*----------------------------------------------------------------------------*/
/*                                 API FETCH                                  
/*----------------------------------------------------------------------------*/

function fetchUser(user) {
  fetch(`https://api.github.com/users/${user}`)
    .then((response) => handleFetchResponse(response))
    .then((data) => updateUserFields(data))
    .catch((error) => console.log(error));
}

function handleFetchResponse(response) {
  if (!response.ok) {
    document.getElementById("search-label").classList.remove("isHidden");
    throw Error(response.statusText);
  } else {
    return response.json();
  }
}

function updateUserFields(data) {
  const user = User(data);
  const userFields = [
    "avatar",
    "name",
    "tag",
    "joinDate",
    "bio",
    "repos",
    "followers",
    "following",
    "location",
    "twitter",
    "blog",
    "company",
  ];

  userFields.forEach((field) => updateField(field, user));
}

function User(data) {
  function startsWithAsperand(string) {
    if (string) return string.startsWith('@');
  }
  
  function formatDate(dateString) {
    let date = new Date(dateString);
    let formatter = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  
    return `Joined ${formatter.format(date)}`;
  }

  return {
    avatarSRC: data.avatar_url,
    name: data.name ? data.name : data.login,
    tag: "@" + data.login,
    bio: data.bio ? data.bio : "This profile has no bio",
    joinDate: formatDate(data.created_at),
    repos: data.public_repos,
    followers: data.followers,
    following: data.following,
    location: data.location ? data.location : "Not Available",
    twitter: data.twitter_username ? data.twitter_username : "Not Available",
    twitterURL: "https://twitter.com/" + data.twitter_username,
    blog: data.blog ? data.blog : "Not Available",
    blogURL: data.blog,
    company: data.company ? data.company : "Not Available",
    companyURL: startsWithAsperand(data.company)
                ? "https://github.com/" + data.company.slice(1)
                : null
  }
}

function updateField(fieldName, user) {
  let field = new Field(fieldName);
  field.updateElementFor(user);
}

function Field(fieldName) {
  const element = document.querySelector(`[data-user="${fieldName}"]`);

  this.updateElementFor = function(user) {
    const text = user[fieldName];
    const src = user[fieldName + "SRC"];
    const href = user[fieldName + "URL"];

    setText(text);
    setSRC(src);
    setHREF(href);
    toggleGray(element);
  }

  let setText = (text) => {
    if (text || text === 0) element.textContent = text;
  }

  let setHREF = (href) => {
    if (href) {
      element.setAttribute("href", href);
    } else {
      element.removeAttribute("href");
    }
  }

  let setSRC = (src) => {
    if (src) element.setAttribute("src", src)
  }

  let toggleGray = () => {
    element.textContent == "Not Available" 
                              ? element.parentNode.classList.add("grayed-out") 
                              : element.parentNode.classList.remove("grayed-out");
  }
}



/*----------------------------------------------------------------------------*/
/*                            COLOR THEME SWITCH                              */
/*----------------------------------------------------------------------------*/

const lightThemeToggleSwitch = document.querySelector(`[data-switch="light"]`);
const darkThemeToggleSwitch = document.querySelector(`[data-switch="dark"]`);

lightThemeToggleSwitch.addEventListener("click", () => changeThemeTo("light"));
darkThemeToggleSwitch.addEventListener("click", () => changeThemeTo("dark"));

function changeThemeTo(themeName) {
  lightThemeToggleSwitch.classList.toggle("isHidden");
  darkThemeToggleSwitch.classList.toggle("isHidden");
  document.body.setAttribute("data-theme", themeName);
}
