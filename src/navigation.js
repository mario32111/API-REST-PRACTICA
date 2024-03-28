window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

searchButton.addEventListener('click', () => {
    location.hash = '#search='
})

verMasTrending.addEventListener('click', () => {
    location.hash = '#trends'
})

verMasTrending

function navigator() {
    console.log({ location })

    if (location.hash.startsWith('#trends')) {
        trendsPage()
    } else if (location.hash.startsWith('#search=')) {
        searchPage()
    } else if (location.hash.startsWith('#movie=')) {
        moviePage()
    } else if (location.hash.startsWith('#category=')) {
        categoryPage()
    } else {
        homePage()
    }

}

function homePage() {
    console.log('Home!!')  
    headerSection.classList.remove('ocultar')  
    detallesSection.classList.add('ocultar')
    similaresSection.classList.add('ocultar')
    categorySection.classList.add('ocultar')
    tituloCategoria.classList.add('ocultar')
    backButton.classList.add('ocultar')
    tituloCategoria.classList.add('ocultar')

    categoriesSection.classList.remove('ocultar')
    trendingSection.classList.remove('ocultar')
    tituloCategoria.classList.remove('ocultar')
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function moviePage() {
    headerSection.classList.add('ocultar')
    categoriesSection.classList.add('ocultar')
    trendingSection.classList.add('ocultar')
    categorySection.classList.add('ocultar')
    tituloCategoria.classList.add('ocultar')

    detallesSection.classList.remove('ocultar')
    similaresSection.classList.remove('ocultar')
    backButton.classList.remove('ocultar')

    console.log('!MOVIE!!')
}

function searchPage() {
    console.log('SEARCH!!')

    detallesSection.classList.add('ocultar')
    trendingSection.classList.add('ocultar')
    similaresSection.classList.add('ocultar')
    categoriesSection.classList.add('ocultar')

    headerSection.classList.remove('ocultar')
    categorySection.classList.remove('ocultar')
    tituloCategoria.classList.remove('ocultar')
    tituloCategoria.textContent = "busqueda";

}

function trendsPage() {
    console.log('TRENDS!!')
    headerSection.classList.add('ocultar')
    detallesSection.classList.add('ocultar')
    trendingSection.classList.add('ocultar')
    similaresSection.classList.add('ocultar')
    categoriesSection.classList.add('ocultar')
    
    backButton.classList.remove('ocultar')
    categorySection.classList.remove('ocultar')
    tituloCategoria.classList.remove('ocultar')
    console.log('xd')
    tituloCategoria.textContent = "tendencias";

}

function categoryPage() {
    console.log('CATEGORY!!')
    headerSection.classList.add('ocultar')
    detallesSection.classList.add('ocultar')
    trendingSection.classList.add('ocultar')
    similaresSection.classList.add('ocultar')
    categoriesSection.classList.add('ocultar')
    
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

    console.log('xd')

}
