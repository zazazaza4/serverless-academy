const { getUserInput, rl } = require("./userInput");
const {
  getUniqueValues,
  getUniqueWords,
  sortDigitsDes,
  sortDigitsAsc,
  sortWordsByLength,
  sortWordsByName,
} = require("./sorting");

const data = {
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

async function selectOption() {
  const choice = await getUserInput(options.select);
  let isContinue = true;

  switch (choice.trim()) {
    case "1":
      console.log(sortWordsByName(data.words));
      break;

    case "2":
      console.log(sortDigitsAsc(data.digits));
      break;

    case "3":
      console.log(sortDigitsDes(data.digits));
      break;

    case "4":
      console.log(sortWordsByLength(data.words));
      break;

    case "5":
      console.log(getUniqueWords(data.words));
      break;

    case "6":
      console.log(getUniqueValues(data.words, data.digits));
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
    data.digits = [];
    data.words = [];
    start();
  }
}

function showMenu() {
  console.log(options.questionCategory);
  options.sortCategory.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });
  console.log("\n");

  selectOption(data);
}

async function start() {
  const input = await getUserInput(options.greeting);
  const inputArray = input.split(" ");

  inputArray.forEach((value) => {
    if (value.length <= 0) {
      return;
    }
    if (!isNaN(value)) {
      data.digits.push(value);
    } else {
      data.words.push(value);
    }
  });

  showMenu();
}

start();
