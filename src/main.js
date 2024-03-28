const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY
    }
});

async function getTrendingMoviesPreview() {
    const {data} = await api("trending/movie/day");

    const movies = data.results;

    movies.forEach(movie => {
        const trendingTop = document.querySelector('#trendingPreview .trending-container-bot')
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('trending-container-bot--movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-container-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingTop.appendChild(movieContainer)
    });
}

async function getCategoriesPreview() {
    const {data} = await api("genre/movie/list");

    const categores= data.genres

    categores.forEach(category => {
        const categoriesList = document.querySelector('#categoriesPreview .categories-container--lista')

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
        categoriesList.appendChild(categoryContainer);

    });
}

