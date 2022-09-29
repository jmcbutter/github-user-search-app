"use strict";
let user = "jmcbutter";

fetch(`https://api.github.com/users/${user}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    updateUser(data)
  });

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
        el.textContent = "No bio available for this user";
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
      if(value) {
        el.textContent = value;
      } else {
        el.textContent = "Not Available";
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