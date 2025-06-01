$(document).ready(function () {
    // Ładowanie albumów
    $.get("https://jsonplaceholder.typicode.com/albums", function (albums) {
        albums.forEach(album => {
            $("#albums").append(`
                <div class="album-block" data-id="${album.id}">
                    <button class="album-btn" data-id="${album.id}" data-title="${album.title}">
                        📁 ${album.title}
                    </button>
                    <!-- Miejsce na galerię tego albumu -->
                    <div class="album-details hidden"></div>
                </div>
            `);
        });
    });

    // Kliknięcie w album
    $("#albums").on("click", ".album-btn", function () {
        const albumId = $(this).data("id");
        const albumTitle = $(this).data("title");
        const $albumBlock = $(this).closest(".album-block");
        const $details = $albumBlock.find(".album-details");

        // Jeśli widoczne – chowamy
        if (!$details.hasClass("hidden")) {
            $details.addClass("hidden").empty();
            return;
        }

        // Ukrywamy inne otwarte galerie
        $(".album-details").not($details).addClass("hidden").empty();

        // Pobieramy zdjęcia
        $.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`, function (photos) {
            const photoElements = photos.map(photo => `
                <img src="${photo.thumbnailUrl}" alt="${photo.title}" class="thumb" 
                     data-full="${photo.url}" data-title="${photo.title}">
            `).join("");

            const form = `
                <form class="photo-form" data-album-id="${albumId}">
                    <h3>Dodaj zdjęcie</h3>
                    <input type="text" name="title" placeholder="Tytuł zdjęcia" required>
                    <input type="url" name="url" placeholder="Pełny URL zdjęcia" required>
                    <input type="url" name="thumbnailUrl" placeholder="URL miniaturki" required>
                    <button type="submit">Wyślij</button>
                </form>
            `;

            const content = `
                <h2>${albumTitle}</h2>
                <div class="photo-grid">${photoElements}</div>
                ${form}
            `;

            $details.html(content).removeClass("hidden");
        });
    });

    // Własny lightbox
    $("body").on("click", ".thumb", function () {
        const full = $(this).data("full");
        const title = $(this).data("title");

        $("body").append(`
            <div id="lightbox">
                <div class="lightbox-content">
                    <span id="close-lightbox">&times;</span>
                    <img src="${full}" alt="${title}">
                    <p>${title}</p>
                </div>
            </div>
        `);
    });

    // Zamknięcie lightboxa
    $("body").on("click", "#close-lightbox, #lightbox", function (e) {
        if (e.target.id === "lightbox" || e.target.id === "close-lightbox") {
            $("#lightbox").remove();
        }
    });

    // Obsługa formularza
    $("body").on("submit", ".photo-form", function (e) {
        e.preventDefault();

        const form = $(this);
        const albumId = form.data("album-id");
        const data = {
            albumId,
            title: form.find("[name='title']").val(),
            url: form.find("[name='url']").val(),
            thumbnailUrl: form.find("[name='thumbnailUrl']").val()
        };

        $.post("https://jsonplaceholder.typicode.com/photos", data, function (response) {
            alert("Wysłano zdjęcie (mock)!");
            console.log(response);
        });
    });
});
