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

    set oceny(o) {
        if(o instanceof Ocena) {
            this.#oceny.push(o);
            this.przeliczSrednia();
        }
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

let s = new Student("Jan", "Kowalski");
s.oceny = new Ocena('WPR', 4);
s.oceny = new Ocena('TIN', 3);
s.oceny = new Ocena('POJ', 2);
