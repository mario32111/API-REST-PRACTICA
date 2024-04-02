const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY
    }
});

//utils

function createMovies(movies, container){
    container.innerHTML = "";
    container.classList.remove('category-container--loading')

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () =>{
            location.hash = '#movie='+ movie.id;
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-container-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer)
    });
}

function createCategiries(categores, container){
    container.innerHTML= ""
    
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
        container.appendChild(categoryContainer);

    });
}

//llamados a la api
async function getTrendingMoviesPreview() {
    const {data} = await api("trending/movie/day");

    const movies = data.results;
    
    const trendingTop = document.querySelector('#trendingPreview .trending-container-bot')
    trendingTop.innerHTML = ""

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('trending-container-bot--movie-container');
        movieContainer.addEventListener('click', () =>{
            location.hash = '#movie='+ movie.id;
        })

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
    createCategiries(categores, categoriesList)

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
    createMovies(movies, categoryImgs)
}

async function getSearchByCategory(query) {
    const {data} = await api("search/movie", {
        params: {
            query,
        }
    });

    const movies = data.results;
    createMovies(movies, categoryImgs)
}

async function getTrendingMovies() {
    const {data} = await api("trending/movie/day");


    const movies = data.results;
    createMovies(movies, categoryImgs)
}

async function getMovieById(id) {
    const { data: movie } = await api("movie/" + id);
    
    
    const movieImgUrl= 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
    const estiloPseudoElemento = document.styleSheets[0].addRule('.detalles-container-top::before', `background-image: url(${movieImgUrl})`);

    //fondo.style.background= `url(${movieImgUrl})`;
    detallesImage.setAttribute('src', movieImgUrl)
    containerTopTitulo.textContent = movie.title;
    score.textContent = movie.vote_average; 
    DescriptionMovie.textContent = movie.overview;

    createCategiries(movie.genres,categoriesList)
    getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id){
    const { data } = await api(`movie/${id}/similar`);
    
    const relatedMovies =  data.results;
    console.log(relatedMovies)
    
    const trendingTop = document.querySelector('.similares-container-bot')
    trendingTop.innerHTML = ""

    relatedMovies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('.similares-container-bot--movie-container');
        movieContainer.addEventListener('click', () =>{
            location.hash = '#movie='+ movie.id;
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-container-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingTop.appendChild(movieContainer)
    });
}