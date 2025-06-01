const fs = require('fs');

function openFile(fileName) {
  const data = fs.readFileSync(fileName, 'utf-8');
  console.log(`Zawartość pliku ${fileName}: ${data}`);
}

function appendToFile(fileName, content) {
  fs.appendFileSync(fileName, content);
  console.log(`Zapisalem do pliku ${fileName}: ${content}`);
}

function deleteFile(fileName) {
  fs.unlinkSync(fileName);
  console.log(`Usunalem plik ${fileName}`);
}


const args = process.argv.slice(2);

if(!fs.existsSync(args[1])) {
  console.error(`Plik ${args[1]} nie istnieje.`);
  process.exit();
}

switch(args[0]) {
  case 'open':
    openFile(args[1]);
    break;

  case 'append':
    appendToFile(args[1], args[2]);
    break;

  case 'delete':
    deleteFile(args[1]);
    break;

  default:
    console.log("Niepoprawna operacja");
    break;
}
