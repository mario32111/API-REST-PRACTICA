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
    const trendingTop = document.querySelector('#trendingPreview .trending-container-bot')
    trendingTop.innerHTML = ""

    movies.forEach(movie => {
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
    console.log(categores)
    const categoriesList = document.querySelector('#categoriesPreview .categories-container--lista')
    categoriesList.innerHTML = ""

    categores.forEach(category => {

        const categoryContainer = document.createElement('li');
        categoryContainer.classList.add('lista-categorie');

        const categoryTitle = document.createElement('a');
        categoryTitle.classList.add('lista-categorie-titile');
        /*categoryTitle.setAttribute('href', "#");*/ 
        categoryTitle.addEventListener('click', () => location.hash = '#category='+ category.id)       
        const categoryTitleText = document.createTextNode(category.name);
        const categoryColor = document.createElement('span')
        categoryColor.setAttribute('id', 'id' + category.id);


        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryColor)
        categoryContainer.appendChild(categoryTitle)
        categoriesList.appendChild(categoryContainer);

    });
}

async function getCategoryName(id) {
    const {data} = await api("genre/movie/list");
    const categores = data.genres;

    // Utiliza find en lugar de forEach para buscar la categoría
    const category = categores.find(category => category.id == id);

    // Devuelve el nombre de la categoría si se encontró, de lo contrario, devuelve una cadena vacía
    return category ? category.name : "";
}



async function getMoviesByCategory(id) {
    const {data} = await api("discover/movie", {
        params: {
            with_genres: id,
        }
    });

    const movies = data.results;

    
    categoryImgs.innerHTML = ""

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-container-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        categoryImgs.appendChild(movieContainer)
    });
}