const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const memory = {
  words: [],
  digits: [],
};

const options = {
  greeting: "Hello. Enter 10 words or digits separated by spaces: ",
  questionCategory: "How would you like to sort values: ",
  sortCategory: [
    "Words by name (from A to Z)",
    "Show digits from the smallest",
    "Show digits from the biggest",
    "Words by quantity of letters",
    "Only unique words",
    "Unique words and digits",
  ],
  bye: "Goodbye! Come back again.",
  select: "Select (1 - 6) and press ENTER: ",
  exitCommand: "exit",
};

async function getUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function selectOption() {
  const choice = await getUserInput(options.select);
  let isContinue = true;

  switch (choice.trim()) {
    case "1":
      console.log(memory.words.sort());
      break;

    case "2":
      console.log(memory.digits.sort((a, b) => Number(a) - Number(b)));
      break;

    case "3":
      console.log(memory.digits.sort((a, b) => Number(b) - Number(a)));
      break;

    case "4":
      console.log(memory.words.sort((a, b) => b.length - a.length));
      break;

    case "5":
      const uniqueWords = Array.from(new Set(memory.words));
      console.log(uniqueWords);
      break;

    case "6":
      const uniqueValues = Array.from(
        new Set(...memory.words, ...memory.digits)
      );
      console.log(uniqueValues);
      break;

    case options.exitCommand:
      isContinue = false;
      rl.close();
      console.log(options.bye);
      break;

    default:
      break;
  }

  if (isContinue) {
    memory.digits = [];
    memory.words = [];
    start();
  }
}

function showMenu() {
  console.log(options.questionCategory);
  options.sortCategory.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });
  console.log("\n");

  selectOption();
}

async function start() {
  const input = await getUserInput(options.greeting);
  const inputArray = input.split(" ");

  inputArray.forEach((value) => {
    if (value.length <= 0) {
      return;
    }
    if (!isNaN(value)) {
      memory.digits.push(value);
    } else {
      memory.words.push(value);
    }
  });

  showMenu();
}

start();
