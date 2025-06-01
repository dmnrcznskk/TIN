const table = document.querySelector(".table tbody");
const news = document.querySelector(".news");

let previousData = {};

async function fetchData() {
    fetch("http://szuflandia.pjwstk.edu.pl/~ppisarski/zad8/dane.php")
        .then(response => response.json())
        .then(data => {
            updateTable(data.stock);
            updateNews(data.news);
        });
}

function updateTable(stock) {
    table.innerHTML = "";

    const isMobile = window.innerWidth <= 1000;

    for (const [company, value] of Object.entries(stock)) {
        const row = document.createElement('tr');

        let change = "=";
        let color = "gray";
        if (previousData[company] !== undefined) {
            if (value > previousData[company]) {
                change = "wzrost";
                color = "green";
            } else if (value < previousData[company]) {
                change = "spadek";
                color = "red";
            }
        }

        previousData[company] = value;

        row.innerHTML = isMobile
            ? `
                <td>${company}</td>
                <td style="color:${color}">${value}</td>
              `
            : `
                <td>${company}</td>
                <td>${value}</td>
                <td style="color:${color}">${change}</td>
              `;

        table.appendChild(row);
    }
}


let recentNews = [];

function updateNews(newsText) {
    if (!recentNews.includes(newsText)) {
        recentNews.unshift(newsText); 
        if (recentNews.length > 3) recentNews.pop();
    }

    news.innerHTML = `
        <h3>BREAKING NEWS</h3>
        <ul>
            ${recentNews.map(n => `<li>${n}</li>`).join("")}
        </ul>
    `;
}


fetchData();
setInterval(fetchData, 5000);
