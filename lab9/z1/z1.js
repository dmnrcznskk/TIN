const container = document.querySelector('.container');

const btn1 = document.getElementById('btn1');
btn1.addEventListener('click', () => {
    const new_div = document.createElement('div');
    new_div.setAttribute('class', 'something');
    container.appendChild(new_div);
});

const btn2 = document.getElementById('btn2');
btn2.addEventListener('click', () => {
    const all_divs = document.getElementsByClassName('something');
    all_divs[0].remove();
});

const btn3 = document.getElementById('btn3');
var btn3_clicked = false;
btn3.addEventListener('click', () => {
    const all_divs = document.getElementsByClassName('something');
    const element = all_divs[2];
    btn3_clicked ? btn3_clicked = false : btn3_clicked = true;
    btn3_clicked ? element.style.backgroundColor = '#D2D0A0' : element.style.backgroundColor = '#eee';
});

const btn4 = document.getElementById('btn4');
btn4.addEventListener('click', () => {
    const all_divs = document.querySelectorAll('.something');
        all_divs.forEach(el => {
        el.textContent = "Nowy tekst";
    });
});