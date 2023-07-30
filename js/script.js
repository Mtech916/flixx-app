const global = {
  currentPage: window.location.pathname,
};

// Display 20 most Popular Movies
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

// Display 20 most Popular TV Shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('/tv/popular');
  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="movie-details.html?id=${show.id}">
        ${
          show.poster_path
          ? `<img
          src="https://image.tmdb.org/t/p/w500${show.poster_path}"
          class="card-img-top"
          alt="${show.name}"
          />` : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
          />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Air Date: ${show.first_air_date}</small>
        </p>
      </div>
    `;

    document.querySelector('#popular-shows').appendChild(div);
  })
}

// Fetch Data from TMDB API
async function fetchAPIData(endpoint) {
  // Register my key at https://www.themoviedb.org/settings/api and enter here
  // Only use this for development or very small projects. I should store my key and  make requests from a server
  const API_KEY = '98fb5a79fd8db0d1e3c3b68ad433c690';
  const BASE_URL = 'https://api.themoviedb.org/3';

  showSpinner();

  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

  const data = await response.json();

  hisdeSpinner();

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hisdeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
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
      break;
    case '/shows.html':
      displayPopularShows();
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