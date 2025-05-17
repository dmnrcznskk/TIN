class Auto {
  #rok;
  #przebieg;
  #cena_wyjsciowa;
  #cena_koncowa;

  constructor(rok, przebieg, cena_wyjsciowa) {
    this.#rok = rok;
    this.#przebieg = przebieg;
    this.#cena_wyjsciowa = cena_wyjsciowa;
    this.obliczCene();
  }
  
  get rok() {
    return this.#rok;
  }

  set rok(r) {
    this.#rok = r;
  }

  get przebieg() {
    return this.#przebieg;
  }

  set przebieg(p) {
    this.#przebieg = p;
  }

  get cena_wyjsciowa() {
    return this.#cena_wyjsciowa;
  }

  set cena_wyjsciowa(c) {
    this.#cena_wyjsciowa = c;
  }

  get cena_koncowa() {
    return this.#cena_koncowa;
  }
  
  powiekszO1000() {
    this.#cena_wyjsciowa += 1000;
  }

  #zmniejszCeneO1000WzgledemRoku() {
    this.#cena_koncowa -= (2025 - this.#rok) * 1000;
  }

  #zmniejszCeneO10000WzgledemPrzebiegu() {
    this.#cena_koncowa -= Math.floor(this.#przebieg / 100000) * 10000;
  }

  obliczCene() {
    this.#cena_koncowa = this.#cena_wyjsciowa;
    this.#zmniejszCeneO1000WzgledemRoku();
    this.#zmniejszCeneO10000WzgledemPrzebiegu();
  }

  zwiekszRok() {
    this.#rok = this.#rok + 1;
    this.obliczCene();
  }

  aktualizujDane(rok, przebieg){
    this.#rok = rok;
    this.#przebieg = przebieg;
    this.obliczCene();
  }

  toString() {
    console.log(`rok: ${this.#rok},\nprzebieg: ${this.#przebieg},\ncena wyjsciowa: ${this.#cena_wyjsciowa},\ncena koncowa: ${this.#cena_koncowa}`);
  }
}


let tablica = [];

function dopiszDoTablicy(auto) {
  if (auto.cena_wyjsciowa > 10000) {
    tablica.push(auto);
  }
}

function zwiekszRok() {
  for (let auto of tablica) {
    auto.zwiekszRok();
  }
}

function wypiszTablice(tablica) {
  for (let auto of tablica) {
    auto.toString();
  }
}

let a1 = new Auto(2024, 100000, 9000);
let a2 = new Auto(2024, 100000, 20000);

dopiszDoTablicy(a1);
dopiszDoTablicy(a2);

zwiekszRok();

wypiszTablice(tablica);
               
