window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

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

    location.hash
}

function homePage() {
    console.log('Home!!')    
    detallesSection.classList.add('ocultar')
    similaresSection.classList.add('ocultar')
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function trendsPage() {
    headerSection.classList.add('ocultar')
    categoriesSection.classList.add('ocultar')
    trendingSection.classList.add('ocultar')
    console.log('!TRENDS!!')
}

function searchPage() {
    console.log('SEARCH!!')
}

function moviePage() {
    console.log('MOVIE!!')
}

function categoryPage() {
    console.log('CATEGORY!!')
    headerSection.classList.add('ocultar')
    detallesSection.classList.add('ocultar')
    trendingSection.classList.add('ocultar')
    similaresSection.classList.add('ocultar')
    categoriesSection.classList.add('ocultar')
    backButton.classList.remove('ocultar')
}