
const movieData = []

const url = 'https://api.themoviedb.org/3/';
const apiKey = '18e47822630f2a53c3f1a30a5b2dc698';




function addToFavorites(movie) {

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.some(fav => fav.id === movie.id)) {
        favorites.push(movie);
        updateFavoritesSlider(favorites);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}



function updateFavoritesSlider(favorites) {
    const favoritesSlidesContainer = document.getElementById('favouriteSlides');
    favoritesSlidesContainer.innerHTML = '';

    favorites.forEach(fav => {
        const slide = document.createElement('li');
        slide.classList.add('splide__slide');
        slide.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${fav.poster_path}" alt="${fav.title}">
        <div class="movie-details">
            <h2>${fav.title}</h2>               
            <p>Release Date: ${fav.release_date}</p>
            <div class="heart-icon-favourite" >&#10084;</div>
      
        </div>
    `;
        favoritesSlidesContainer.appendChild(slide);
    });


    new Splide('#favourite-movies', {
        perPage: 4,
        perMove: 4,
        gap: "30px",
        pagination: false,
    }).mount();
}


function displaySearchResults(results) {
    if (results === undefined) {
        const searchResultsContainer = document.querySelector('.movie-data-container');
        searchResultsContainer.innerHTML = `
            <img src="data:image/jpeg;base64,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"
    alt="lamb">

            <div class="movie-details">
                <h2>Movie Title</h2>
                <span>category</span>
                <p>release date</p>
                <p>description</p>

            </div>
            `;

    }
    else {


        const searchResultsContainer = document.querySelector('.movie-data-container');
        searchResultsContainer.innerHTML = '';

        const movie = results[0]

        const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'placeholder-image.jpg';

        searchResultsContainer.innerHTML = `
        <img src="${posterUrl}" alt="${movie.title}">
                <div class="movie-details">
                    <h2>${movie.title}</h2>
                    <span>Category</span>
                    <p>Release Date: ${movie.release_date}</p>
                    <p>${movie.overview}</p>
                </div>
            `;

    }

}


function displayRecommendedSlides(movies) {

    const recommendedSlidesContainer = document.getElementById('recommendedSlides');
    recommendedSlidesContainer.innerHTML = '';

    movies.forEach(movie => {
        const slide = document.createElement('li');
        slide.classList.add('splide__slide');
        slide.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
        <div class="movie-details">
            <h2>${movie.title}</h2>
            <p>Release Date: ${movie.release_date}</p>
         
        </div>
        <div class="heart-icon" onclick="addToFavorites(${JSON.stringify(movie)})">&#10084;</div>
    `;


        slide.querySelector('.heart-icon').addEventListener('click', () => addToFavorites(movie));

        recommendedSlidesContainer.appendChild(slide);
    });


    new Splide('#recommended-movies', {
        perPage: 4,
        perMove: 4,
        gap: "30px",
        pagination: false,
    }).mount();
}


function getFavoritesFromLocalStorage() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    updateFavoritesSlider(favorites);
}



function searchMovies(e) {

    if (e.target.value === "") {

        const searchResultsContainer = document.querySelector('.movie-data-container');
        searchResultsContainer.innerHTML = `
            <img src="data:image/jpeg;base64,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"
    alt="lamb">

            <div class="movie-details">
                <h2>Movie Title</h2>
                <span>category</span>
                <p>release date</p>
                <p>description</p>

            </div>
            `;

    }
    else {
        const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${e.target.value}&api_key=2ad18877c2ecce5382256b80fefda964`;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYWQxODg3N2MyZWNjZTUzODIyNTZiODBmZWZkYTk2NCIsInN1YiI6IjY1YjIzMjY1NmVlY2VlMDBjOTMzZjA2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L1aSTQjDzIQ1BAH2OCc2A0kqegYT53YPtUNQHT2FD40`,
            },
        };
        fetch(apiUrl, options)
            .then(res => res.json())
            .then(data => {
                movieData.push(data.results)
                displaySearchResults(data.results);
                console.log(data.results)
                displayRecommendedSlides(data.results);
            }
            )
            .catch(error => console.log(error))
    }


}


function sortFavorites(e) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (e.target.value === "title") {
        const sortedArr = favorites.sort((movie1, movie2) => {
            return movie1.title.localeCompare(movie2.title);
        });
        updateFavoritesSlider(sortedArr);
        localStorage.setItem('favorites', JSON.stringify(sortedArr));
    } else if (e.target.value === "release-date") {
        const sortedArr = favorites.sort((movie1, movie2) => {

            return new Date(movie1.release_date) - new Date(movie2.release_date);
        });
        updateFavoritesSlider(sortedArr);
        localStorage.setItem('favorites', JSON.stringify(sortedArr));
    }
}


document.querySelector('input[type="text"]').addEventListener("input", searchMovies)

document.querySelector('#filterSelect').addEventListener('change', sortFavorites)

getFavoritesFromLocalStorage();


new Splide('#recommended-movies', {
    perPage: 4,
    perMove: 4,
    gap: "30px",
    pagination: false,
}).mount();

