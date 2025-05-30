const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.right__nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });