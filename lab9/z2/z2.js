document.getElementById('calculate').addEventListener('click', () => {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operator = document.getElementById('operator').value;
    const resultDiv = document.getElementById('result');
  
    if (isNaN(num1) || isNaN(num2)) {
      resultDiv.textContent = "Błąd: wpisz liczby!";
      return;
    }
  
    if (operator === '/' && num2 === 0) {
      resultDiv.textContent = "Błąd: dzielenie przez zero!";
      return;
    }
  
    let wynik = 0;
    switch (operator) {
      case '+':
        wynik = num1 + num2;
        break;
      case '-':
        wynik = num1 - num2;
        break;
      case '*':
        wynik = num1 * num2;
        break;
      case '/':
        wynik = num1 / num2;
        break;
    }
  
    resultDiv.textContent = wynik;
  });
  