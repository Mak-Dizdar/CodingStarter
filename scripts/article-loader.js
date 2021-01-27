function selectArticle(event) {
    console.log(event);
    var articleId = event.target.id;
    sessionStorage.removeItem("currArticle");
    sessionStorage.setItem("currArticle", articleId + "");
    window.location.href = "article.html";
}

function getArticlePreview(article) {
    var articleContainer = document.createElement("article");
    console.log("add event listener for Id " + article.Id);
    articleContainer.id = article.Id;
    articleContainer.addEventListener("click",selectArticle);
    articleContainer.style.cursor = "pointer";
    articleContainer.width =325;
    var imgWrapper = document.createElement("div");
    imgWrapper.id = article.Id;
    imgWrapper.classList.add("img-wrapper");
    var thumbnailPath = "https://img.youtube.com/vi/" + article.videoId +"/0.jpg";
    var img = document.createElement("img");
    img.id = article.Id;
    img.src = thumbnailPath;
    img.classList.add("thumbnail");
    img.width = 300;
    img.height = 200;
    imgWrapper.appendChild(img);
    var textWrapper = document.createElement("div");
    textWrapper.id = article.Id;
    textWrapper.classList.add("text-wrapper");
    var subtitleTextElement = document.createElement("h2");
    subtitleTextElement.innerText = article.title;
    subtitleTextElement.id = article.Id;
    textWrapper.appendChild(subtitleTextElement);
    articleContainer.appendChild(imgWrapper);
    articleContainer.appendChild(textWrapper);
    return articleContainer;
}

function loadArticlePreviews(categoryTitle,target) {
    var noArticles = "Articles are coming soon!";
    var targetElement = document.getElementById(target);
    targetElement.innerHTML = "";
    var allVideos = categoryTitle === "all";
    fetch("./data/articles.json").then(res => res.json()).then(data => {
        console.log("Got JSON DATA: ", data);
        var foundCategories = data.categories.filter(category => category.categoryTitle == categoryTitle);
        if (foundCategories.length === 1) {
            return foundCategories[0];
        }
        return null;
    }).then(category => {
        console.log("filtered category: ", category);
        if (category === null) {
            targetElement.innerHTML = noArticles;
            return;
        }
        for (var i = 0; i < category.articles.length; i++) {
            var article = category.articles[i];
            console.log(article);
            var articleContainer = getArticlePreview(article);
            targetElement.appendChild(articleContainer);
        }
    });
}

function loadNewestArticles(targetId) {
    var noArticles = "Articles are coming soon!";
    var targetElement = document.getElementById(targetId);
    var articles = [];
    fetch("./data/articles.json").then(res => res.json()).then(data => {
        data.categories.forEach(categorie => categorie.articles.forEach(article => articles.push(article)));
        articles = articles.sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
        if (articles.length === 0) {
            targetElement.innerHTML = noArticles;
            return;
        }
        articles.forEach(article => {
            var articleContainer = getArticlePreview(article);
            targetElement.appendChild(articleContainer);
        });
    });
}