const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const moviesEl = document.getElementById("movies");
const formEl = document.getElementById("form");
const searchBar = document.getElementById("search-bar");

getMovies(APIURL);

// get popular movies immediately
async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  // console.log(respData);

  showMovie(respData.results);
}

function showMovie(movies) {
  // clear moviesEl
  moviesEl.innerHTML = "";
  
  movies.forEach(movie => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML=`
      ${poster_path ? `<img src="${IMGPATH + poster_path}" alt="${title}">` : `<h2>POSTER NOT FOUND</h2>`}
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview: </h3>
          ${overview}
        </div>
    `;
    moviesEl.appendChild(movieEl);
  });
}

// change the rating color by the rate
function getClassByRate(rate){
  switch(true) {
    case rate > 8: return "green";
    case rate >= 5: return "orange";
    default: return "red";
  }
}

// search the movie
formEl.addEventListener("submit", e => {
  e.preventDefault();

  const searchTerm = searchBar.value;
  // console.log(searchTerm);

  if(searchTerm) {
    getMovies(SEARCHAPI + searchTerm);

    searchBar.value = "";
  }
})
