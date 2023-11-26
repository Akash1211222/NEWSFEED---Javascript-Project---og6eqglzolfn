//this function will load news content from API
let newsData;
async function fetchNews() {
    let result = [];
    try {
        const response = await fetch(`https://content.newtonschool.co/v1/pr/64e3d1b73321338e9f18e1a1/inshortsnews`);
        result = await response.json();
        newsData = result;
        let key = 0;
        newsData.map((e) => {
            e.id = key;
            key = key + 1;
        })
    }
    catch (error) {
        console.log(`Error occured while fetching the news!`);
    }
    finally {
        return result;
    }
}


//this function will classify news content
let newsClass;
async function getNewsClassification() {
    await fetchNews();
    newsClass = new Set();
    newsClass.add('All');
    newsData.forEach((e) => {
        if (!newsClass.has(e.category)) {
            newsClass.add(e.category);
        }
    });
}


//this function will render buttons based on news category
async function displayBtnByClass() {
    await getNewsClassification();
    const divElement = document.getElementById("news-category");
    divElement.innerHTML = "";
    newsClass.forEach((ele) => {
        const btn = `<button class="loadbtn" onclick="fetchNewsByCategory('${ele}')">${ele}</button>`;
        divElement.innerHTML = divElement.innerHTML + btn;
    });
}


//This function will add news to favorites
function addToFavorites(e) {
    let item = document.getElementById(e);
    let favElement = newsData.filter((ele) => {
        if(e == ele.id){
            return ele;
        }
    })[0];
    if(Storage.isPresent(favElement)){
        Storage.removeNewsItem(favElement);
        item.classList.remove('selected-fav-element');
    }else{
        Storage.addtolocalstorage(favElement);
        item.classList.add('selected-fav-element');
    }
}


//this function will check content in local storage and will mark items as favorite from news data when page is loaded
function markFavorite(e){
    if(Storage.checkItemToBeMarked(e)){
        document.getElementById(e).classList.add('selected-fav-element');
    }
}


async function loadNews() {
    await displayBtnByClass();
    const newsBody = document.getElementById('show-news-content');
    newsBody.innerHTML = "";
    newsData.forEach((e) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('newsItemDiv');
        itemDiv.innerHTML = `<span class='newsCategory'>Category: <b>${e.category}</b></span>
        <p>By <b>${e.author}</b></p>
        <p>${e.content} <a href='${e.url}'>Read more</a></p>
        <span class="material-symbols-outlined" id = "${e.id}" onclick="addToFavorites('${e.id}')">favorite</span>`;
        newsBody.appendChild(itemDiv);
        markFavorite(e.id);
    })
}

//this function will fetch news by category
async function fetchNewsByCategory(ele) {
    const newsBody = document.getElementById('show-news-content');
    newsBody.innerHTML = "";
    if (ele === 'All') {
        newsData.forEach((e) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('newsItemDiv');
            itemDiv.innerHTML = `<span class='newsCategory'>Category: <b>${e.category}</b></span>
            <p>By <b>${e.author}</b></p>
            <p>${e.content} <a href='${e.url}'>Read more</a></p>
            <span class="material-symbols-outlined" id = "${e.id}" onclick="addToFavorites('${e.id}')">favorite</span>`;
            newsBody.appendChild(itemDiv);
            markFavorite(e.id);
        })
    }
    else {
        newsData.forEach((e) => {
            if (e.category === ele) {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('newsItemDiv');
                itemDiv.innerHTML = `<span class='newsCategory'>Category: <b>${e.category}</b></span>
                <p>By <b>${e.author}</b></p>
                <p>${e.content} <a href='${e.url}'>Read more</a></p>
                <span class="material-symbols-outlined" id = "${e.id}" onclick="addToFavorites('${e.id}')">favorite</span>`;
                newsBody.appendChild(itemDiv);
                markFavorite(e.id);
            }
        });
    }
}

loadNews();