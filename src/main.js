async function getTrendingMoviesPreview() {
    const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY);
    const data = await res.json();

    const movies = data.results;

    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trending-container-bot')

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('trending-container-bot--movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-container-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer)
    });


}

async function getCategoriesPreview() {
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY);
    const data = await res.json();

    const categores= data.genres

    categores.forEach(category => {
        const previewCategoriesContainer = document.querySelector('#categoriesPreview .categories-container--lista')

        const categoryContainer = document.createElement('li');
        categoryContainer.classList.add('lista-categorie');

        const categoryTitle = document.createElement('a');
        categoryTitle.classList.add('lista-categorie-titile');
        categoryTitle.setAttribute('href', "#");
        const categoryTitleText = document.createTextNode(category.name);
        const categoryColor = document.createElement('span')
        categoryColor.setAttribute('id', 'id' + category.id);


        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryColor)
        categoryContainer.appendChild(categoryTitle)
        previewCategoriesContainer.appendChild(categoryContainer);

    });


}


getTrendingMoviesPreview();
getCategoriesPreview();