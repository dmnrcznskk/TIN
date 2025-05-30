const table = document.querySelector(".table tbody");
const news = document.querySelector(".news");

async function fetchData() {
    fetch("http://szuflandia.pjwstk.edu.pl/~ppisarski/zad8/dane.php").then(response => response.json()).then(data => {
        updateTable(data.stock);
        updateNews(data.news);
    });
}