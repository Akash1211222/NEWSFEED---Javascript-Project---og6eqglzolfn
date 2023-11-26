class Storage {
    static addtolocalstorage(e) {
        let savedNews = Storage.getSavedNewsItems();
        if (savedNews.length == 0) {
            savedNews.push(e);
        } else {
            let isPresent = false;
            savedNews.forEach((ele) => {
                if (e.id == ele.id) {
                    isPresent = true;
                }
            })
            if (!isPresent) {
                savedNews.push(e);
            }
        }
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
    static isPresent(e) {
        let savedNews = Storage.getSavedNewsItems();
        let hasElement = false;
        savedNews.forEach((ele) => {
            if (e.id == ele.id) {
                hasElement = true;
            }
        })
        return hasElement;
    }
    static checkItemToBeMarked(e){
        let savedNews = Storage.getSavedNewsItems();
        let hasElement = false;
        savedNews.forEach((ele) => {
            if (e == ele.id) {
                hasElement = true;
            }
        })
        return hasElement;
    }
    static removeNewsItem(e) {
        let savedItems = Storage.getSavedNewsItems();
        let updated = savedItems.filter((ele) => ele.id != e.id);
        localStorage.setItem('savedNews', JSON.stringify(updated));
    }
    static removeFavorite(e){
        let savedItems = Storage.getSavedNewsItems();
        let updated = savedItems.filter((ele) => ele.id != e);
        localStorage.setItem('savedNews', JSON.stringify(updated));
    }
}
Window.Storage = Storage;