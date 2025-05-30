class Ocena {
    #przedmiot;
    #wartosc;

    constructor(przedmiot, wartosc) {
        this.#przedmiot = przedmiot;
        this.#wartosc = wartosc;
    }
    get przedmiot() {
        return this.#przedmiot;
    }

    get wartosc() {
        return this.#wartosc;
    }
}

class Student {
    #oceny = [];
    #srednia;
    #imie;
    #nazwisko;

    constructor(imie, nazwisko) {
        this.#imie = imie;
        this.#nazwisko = nazwisko;
        this.#srednia = 0;
    } 

    hello() {
        return `Witaj ${this.#imie} ${this.#nazwisko}, twoja srednia ocen to: ${this.#srednia}`;
    }

    get imie() {
        return this.#imie;
    }

    get nazwisko() {
        return this.#nazwisko;
    }

    set oceny(o) {
        if(o instanceof Ocena) {
            this.#oceny.push(o);
            this.przeliczSrednia();
        }
    }

    get ocenyRaw() {
        return this.#oceny;
    }
    

    get oceny() {
        return this.#oceny
          .map(o => `Przedmiot: ${o.przedmiot} - ocena ${o.wartosc}`)
          .join('. ') + '.';
      }

      przeliczSrednia() {
        if(this.#oceny.length === 0) {
            this.#srednia = 0;
        } else {
            let sum = 0;
            this.#oceny.forEach(p => sum += p.wartosc);
            this.#srednia = sum / this.#oceny.length;
        }
    }

}

let s = new Student("Walter", "White");
s.oceny = new Ocena('WPR', 5);
s.oceny = new Ocena('TIN', 5);
s.oceny = new Ocena('POJ', 3);

let s1 = new Student("Jessie", "Pinkman");
s1.oceny = new Ocena('WPR', 3);
s1.oceny = new Ocena('TIN', 3);
s1.oceny = new Ocena('POJ', 2);

let s2 = new Student("Gustavo", "Fring");
s2.oceny = new Ocena('WPR', 4);
s2.oceny = new Ocena('TIN', 5);
s2.oceny = new Ocena('POJ', 3);

var lista_studentow = [s, s1, s2];

function generujListeStudentow(lista_studentow) {
    const div = document.getElementById('lista-studentow');

    lista_studentow.forEach(student => {
        const studentDiv = document.createElement('div');
        studentDiv.textContent = `${student.imie} ${student.nazwisko}`;
        studentDiv.style.cursor = 'pointer';
        studentDiv.style.marginBottom = '10px';
        studentDiv.style.fontWeight = 'bold';

        const detailsDiv = document.createElement('div');
        detailsDiv.style.display = 'none';
        detailsDiv.style.marginLeft = '20px';

        const lista = document.createElement('ul');
        student.ocenyRaw.forEach(ocena => {
            const li = document.createElement('li');
            li.textContent = `${ocena.przedmiot}: ${ocena.wartosc}`;
            lista.appendChild(li);
        });

        const srednia = document.createElement('p');
        srednia.textContent = `Średnia: ${(
            student.ocenyRaw.reduce((a, b) => a + b.wartosc, 0) /
            student.ocenyRaw.length
        ).toFixed(2)}`;

        detailsDiv.appendChild(lista);
        detailsDiv.appendChild(srednia);

        studentDiv.addEventListener('click', () => {
            detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
        });

        div.appendChild(studentDiv);
        div.appendChild(detailsDiv);
    });
}


generujListeStudentow(lista_studentow);