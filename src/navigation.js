let maxPage = 0
let page = 1;
let infiniteScroll;
window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)
window.addEventListener('scroll', infiniteScroll, false)


searchButton.addEventListener('click', () => {
    location.hash = '#search='+ searchInput.value;
})

verMasTrending.addEventListener('click', () => {
    location.hash = '#trends'
})

backButton.addEventListener('click', () => {
    history.back()
    document.documentElement.scrollTop= 0
});

verMasTrending.addEventListener('click', getTrendingMovies())

function navigator() {
    if(infiniteScroll){
        window.removeEventListener('scroll', infiniteScroll, { passive: false });
        infiniteScroll= undefined;
    }

    console.log({ location })

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        moviePage();
    } else if (location.hash.startsWith('#category=')) {
        categoryPage();
    } else {
        homePage();
    }
    document.documentElement.scrollTop= 0

    if(infiniteScroll){
        window.addEventListener('scroll', infiniteScroll, { passive: false });
    }
}

function homePage() {
    console.log('Home!!')  
    headerSection.classList.remove('ocultar')  
    detallesSection.classList.add('ocultar')
    similaresSection.classList.add('ocultar')
    backButton.classList.add('ocultar')
    tituloCategoria.classList.add('ocultar')
    categoryImgs.classList.add('ocultar')
    categorySection.classList.add('ocultar')
    tituloCategoria.classList.add('ocultar')
    

    categoriesList.classList.remove('ocultar')
    categoriesSection.classList.remove('ocultar')
    trendingSection.classList.remove('ocultar')
    searchInput.value= ""
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function moviePage() {
    headerSection.classList.add('ocultar')
    categoriesSection.classList.remove('ocultar')
    trendingSection.classList.add('ocultar')
    categorySection.classList.add('ocultar')
    tituloCategoria.classList.add('ocultar')
    
    
    categoriesSection.classList.remove('ocultar')
    detallesSection.classList.remove('ocultar')
    similaresSection.classList.remove('ocultar')
    backButton.classList.remove('ocultar')

    getMovieById (location.hash.split('movie=')[1]);
    console.log('!MOVIE!!')
}

function searchPage() {
    console.log('SEARCH!!')

    detallesSection.classList.add('ocultar')
    trendingSection.classList.add('ocultar')
    similaresSection.classList.add('ocultar')
    categoriesSection.classList.add('ocultar')

    backButton.classList.remove('ocultar')
    headerSection.classList.remove('ocultar')
    categorySection.classList.remove('ocultar')
    tituloCategoria.classList.add('ocultar')

    getSearchByCategory(location.hash.split('search=')[1])
    infiniteScroll= getPaginatedSearchByCategory
}

function trendsPage() {
    console.log('TRENDS!!')
    headerSection.classList.add('ocultar')
    detallesSection.classList.add('ocultar')
    trendingSection.classList.add('ocultar')
    similaresSection.classList.add('ocultar')
    categoriesSection.classList.add('ocultar')

    categorySection.classList.remove('ocultar')
    categoryImgs.classList.remove('ocultar')
    backButton.classList.remove('ocultar')
    tituloCategoria.classList.remove('ocultar')
    console.log('xd')
    tituloCategoria.textContent = "tendencias";
    getTrendingMovies();
    infiniteScroll= getPaginatedTrendingMovies;
}

function categoryPage() {
    console.log('CATEGORY!!')
    headerSection.classList.add('ocultar')
    detallesSection.classList.add('ocultar')
    trendingSection.classList.add('ocultar')
    similaresSection.classList.add('ocultar')
    categoriesSection.classList.add('ocultar')

    categoryImgs.classList.remove('ocultar')
    backButton.classList.remove('ocultar')
    categorySection.classList.remove('ocultar')
    tituloCategoria.classList.remove('ocultar')

    // Utiliza then para manejar la promesa devuelta por getCategoryName
    getCategoryName(location.hash.split('category=')[1])
        .then(nombre => {
            tituloCategoria.textContent = nombre;
        })
        .catch(error => {
            console.error("Error al obtener el nombre de la categoría:", error);
        });

    getMoviesByCategory(location.hash.split('category=')[1]);
    infiniteScroll= getPaginatedMoviesByCategory;
}
