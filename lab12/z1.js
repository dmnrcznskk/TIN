const args = process.argv.slice(2);

if(args.length < 1) {
  console.error("Podaj argument");
  process.exit();
}

console.log(`Hello ${args[0]}`);
