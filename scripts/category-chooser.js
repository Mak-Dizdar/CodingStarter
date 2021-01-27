var selectedCategory = "";
var targetElementId = "categoryArticles";

function changeIconColors() {
    var iconContainer = document.getElementById("categoryIcons");
    console.log("ICONS", iconContainer.children);
    Array.from(iconContainer.children).forEach(item => {
        if (item.id !== selectedCategory) {
            item.style.filter = "grayscale(100%)";
        } else {
            item.style.filter = "grayscale(0%)";
        }
    }); 
}

function chooseCategory(categoryTitle) {
    var targetElement = document.getElementById(targetElementId);
    var headline = document.getElementById("headline");
    headline.innerHTML = categoryTitle + " Tutorials"
    targetElement.innerHTML
    console.log("called chooseCategory");
    if (selectedCategory === categoryTitle) return;
    selectedCategory = categoryTitle;
    loadArticlePreviews(selectedCategory, targetElementId);
    changeIconColors();
}


window.onload = function() {
    chooseCategory("HTML");
};