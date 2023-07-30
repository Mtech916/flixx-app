const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData('/movie/popular');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
          ? `<img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="card-img-top"
          alt="${movie.title}"
        />` : `<img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
      />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>
    `;

    document.querySelector('#popular-movies').appendChild(div);
  })
}

// Fetch Data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = '98fb5a79fd8db0d1e3c3b68ad433c690';
  const BASE_URL = 'https://api.themoviedb.org/3';

  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

  const data = await response.json();

  return data;
}

// Highlight Active Link
function highlightActiveLink() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}


// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      console.log('Home Page');
      break;
    case '/shows.html':
      console.log('Shows Page');
      break;
    case '/movie-details.html':
      console.log('Movie Details Page');
      break;
    case '/tv-details.html':
      console.log('TV Details Page');
      break;
    case '/search.html':
      console.log('Search Page');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);