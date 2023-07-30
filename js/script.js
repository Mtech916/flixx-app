const global = {
  currentPage: window.location.pathname,
};

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