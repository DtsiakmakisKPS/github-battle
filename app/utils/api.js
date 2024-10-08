const id = 'YOUR_CLIENT_ID';
const sec = 'YOUR_SECRET_ID';
const params = `?client_id=${id}&client_secret=${sec}`;

// Function to fetch popular repositories based on the selected language
export function fetchPopularRepos(language) {
   const endpoint = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=desc&order=asc&type=Repositories`
   );

   return fetch(endpoint)
   .then((res) => res.json())
   .then((data) => {
    if(!data.items) {
        throw new Error(data.message)
    }
    return data.items;
   });
}

// Function to get the error message
function getErrorMsg(message, username) {
   if (message === "Not Found") {
      return `${username} doesn't exist`;
   }
   return message;
}

// Function to fetch user profile information
 function getProfile(username) {
   return fetch(`https://api.github.com/users/${username}${params}`)
      .then((res) => res.json())
      .then((profile) => {
         if (profile.message) {
            throw new Error(getErrorMsg(profile.message, username));
         }
         return profile;
      });
}

// Function to fetch user repositories  
function getRepos(username) {
   return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
      .then((res) => res.json())
      .then((repos) => {
         if (repos.message) {
            throw new Error(getErrorMsg(repos.message, username));
         }
         return repos;
      });
}

// Function to calculate the score based on followers and repositories  
function calculateScore(followers, repos) {
    return (followers * 3) + getStarCount(repos)   
    }

// Function to get the star count from the repositories
function getStarCount(repos) {
    return repos.reduce((count, {stargazers_count}) => count + stargazers_count, 0)
}

// Function to get the user data from the profile and repositories  
function getUserData(player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ])
    .then(([profile, repos]) => ({
        profile,
        score: calculateScore(profile.followers, repos)
    }))
}

// Function to sort the players based on the score  
function sortPlayers(players) {
    return players.sort((a,b) => b.score - a.score)
}

// Function to battle two players and return the winner 
export function battle(players) {
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ])
    .then((results) => sortPlayers(results))
}



