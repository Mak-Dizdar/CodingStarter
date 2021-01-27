function loadSelectedArticle() {
    var currentArticleId = Number(sessionStorage.getItem("currArticle"));
    console.log("load curr Article with Id " + currentArticleId);
    fetch("./data/articles.json").then(res => res.json()).then(data => {
        data.categories.forEach(category => {
            category.articles.forEach(article => {
                if (article.Id === currentArticleId) {
                    var titleElement = document.getElementById("title");
                    var textElement = document.getElementById("text");
                    var snippetContainerElement = document.getElementById("code");
                    var snippetElement = document.getElementById("codeSnippet");
                    var videoElement = document.getElementById("video");
                    var iframe = document.createElement("iframe");
                    iframe.src = "https://www.youtube.com/embed/" + article.videoId;
                    iframe.width = "100%";
                    iframe.height = "100%";
                    iframe.controls = false;
                    iframe.allowFullscreen = true;
                    videoElement.appendChild(iframe);
                    titleElement.innerHTML = article.title;
                    textElement.innerHTML = article.text;
                    if(article.snippet) {
                     snippetElement.innerHTML = article.snippet;
                    } else {
                        snippetContainerElement.innerHTML = "";
                    }
                }
            })
        });

    });
}

window.onload = function() {
    loadSelectedArticle();
}