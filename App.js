//this function will load news content from API
let newsData;
async function fetchNews() {
    let result = [];
    try {
        const response = await fetch(`https://content.newtonschool.co/v1/pr/64e3d1b73321338e9f18e1a1/inshortsnews`);
        result = await response.json();
        newsData = result;
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
    getSavedNewsItems()
}


async function loadNews() {
    await displayBtnByClass();
    const newsBody = document.getElementById('show-news-content');
    newsBody.innerHTML = "";
    newsData.forEach((e) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('newsItemDiv');
        itemDiv.setAttribute('author', e.author);
        itemDiv.setAttribute('category', e.category);
        itemDiv.setAttribute('content', e.content);
        itemDiv.innerHTML = `<span class='news-category'>Category: <b>${e.category}</b></span>
        <p>By <b>${e.author}</b></p>
        <p>${e.content} <a href='${e.url}'>Read more</a></p>
        <span class="material-symbols-outlined favorite" onclick="addToFavorites()">favorite</span>`;
        newsBody.appendChild(itemDiv);
    })
}


async function fetchNewsByCategory(ele) {
    const newsBody = document.getElementById('show-news-content');
    newsBody.innerHTML = "";
    if (ele === 'All') {
        newsData.forEach((e) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('newsItemDiv');
            itemDiv.setAttribute('author', e.author);
            itemDiv.setAttribute('category', e.category);
            itemDiv.setAttribute('content', e.content);
            itemDiv.innerHTML = `<span class='news-category'>Category: <b>${e.category}</b></span>
            <p>By <b>${e.author}</b></p>
            <p>${e.content} <a href='${e.url}'>Read more</a></p>
            <span class="material-symbols-outlined favorite" onclick="addToFavorites(${e})">favorite</span>`;
            newsBody.appendChild(itemDiv);
        })
    }
    else {
        newsData.forEach((e) => {
            if (e.category === ele) {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('newsItemDiv');
                itemDiv.setAttribute('author', e.author);
                itemDiv.setAttribute('category', e.category);
                itemDiv.setAttribute('content', e.content);
                itemDiv.innerHTML = `<span class='news-category'>Category: <b>${e.category}</b></span>
                <p>By <b>${e.author}</b></p>
                <p>${e.content} <a href='${e.url}'>Read more</a></p>
                <span class="material-symbols-outlined favorite" onclick="addToFavorites(${e})">favorite</span>`;
                newsBody.appendChild(itemDiv);
            }
        });
    }
}

async function addToFavorites(e) {
    // Add the news item to local storage
    Storage.addtolocalstorage(e);
  
    // Update the saved news section
    const savedNewsSection = document.getElementById("show-saved-news");
    savedNewsSection.innerHTML = "";
  
    // Get saved news items from local storage
    const savedNewsItems = Storage.getSavedNewsItems();
  
    // Render saved news items
    savedNewsItems.forEach((newsItem) => {
      const newsDiv = document.createElement("div");
      newsDiv.classList.add("newsItemDiv");
      newsDiv.innerHTML = `
        <span class='news-category'>Category: <b><span class="math-inline">\{newsItem\.category\}</b\></span\>
  <p\>By <b\></span>${newsItem.author}</b></p>
        <p><span class="math-inline">\{newsItem\.content\} <a href\='</span>${newsItem.url}'>Read more</a></p>
        <span class="material-symbols-outlined favorite" onclick="removeNewsFromFavorites(<span class="math-inline">\{JSON\.stringify\(
  newsItem
  \)\}\)"\>favorite</span\>
  \`;
  savedNewsSection\.appendChild\(newsDiv\);
  \}\);
  \}``
  async function removeNewsFromFavorites\(newsItem\) \{
  // Remove the news item from local storage
  Storage\.removeNewsItem\(newsItem\);
  // Update the saved news section
  const savedNewsSection \= document\.getElementById\("show\-saved\-news"\);
  savedNewsSection\.innerHTML \= "";
  // Get saved news items from local storage
  const savedNewsItems \= Storage\.getSavedNewsItems\(\);
  // Render saved news items
  savedNewsItems\.forEach\(\(newsItem\) \=\> \{
  const newsDiv \= document\.createElement\("div"\);
  newsDiv\.classList\.add\("newsItemDiv"\);
  newsDiv\.innerHTML \= \`
  <span class\='news\-category'\>Category\: <b\></span>{newsItem.category}</b></span>
        <p>By <b><span class="math-inline">\{newsItem\.author\}</b\></p\>
  <p\></span>{newsItem.content} <a href='<span class="math-inline">\{newsItem\.url\}'\>Read more</a\></p\>
  <span class\="material\-symbols\-outlined favorite" onclick\="removeNewsFromFavorites\(</span>${JSON.stringify(
          newsItem
        )})">favorite</span>
      `;
      savedNewsSection.appendChild(newsDiv);
    });
  }
  


class Storage {
    static addtolocalstorage(e) {
        let savedNews = Storage.getSavedNewsItems();
        newsData.forEach((ele) => {
            if (e === ele) {
                savedNews.push(ele);
            }
        })
        localStorage.setItem('savedNews', JSON.stringify(savedNews));
    }
    static getSavedNewsItems() {
        let savedNews;
        if (localStorage.getItem('savedNews')) {
            savedNews = JSON.parse(localStorage.getItem('savedNews'));
        } else {
            savedNews = [];
        }
        return savedNews;
    }
    static removeNewsItem(e) {
        let savedNews = Storage.getSavedNewsItems();
        localStorage.setItem('savedNews', JSON.stringify(savedNews.filter((ele) => { ele !== e })));
    }
}
Window.Storage = Storage;
loadNews();