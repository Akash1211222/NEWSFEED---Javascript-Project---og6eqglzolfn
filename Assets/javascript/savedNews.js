//this function will remove news from favorites
function removeFavorite(e) {
    Storage.removeFavorite(e);
    loadNews();
}

async function loadNews() {
    const newsBody = document.getElementById('display-saved-news-container');
    newsBody.innerHTML = "";
    let newsData = Storage.getSavedNewsItems();
    if (newsData.length == 0) {
        const itemDiv = document.createElement('div');
        itemDiv.setAttribute('id', 'noNews');
        itemDiv.innerHTML = `<h1>There are no favorites. Please select an item to add it to favorite.</h1>`
        newsBody.appendChild(itemDiv);
    } else {
        newsData.forEach((e) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('newsItemDiv');
            itemDiv.innerHTML = `<span class='newsCategory'>Category: <b>${e.category}</b></span>
            <p>By <b>${e.author}</b></p>
            <p>${e.content} <a href='${e.url}'>Read more</a></p>
            <span id="${e.id}" class="material-symbols-outlined selected-fav-element" onclick="removeFavorite('${e.id}')">favorite</span>`;
            newsBody.appendChild(itemDiv);
        })
    }
}

loadNews();