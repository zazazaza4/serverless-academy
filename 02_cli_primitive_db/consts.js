const path = require("path");

const dbPath = path.join(__dirname, "db", "users.txt");

const prompts = {
  name: {
    type: "input",
    name: "name",
    message: "Enter the user's name. Press ENTER to exit: ",
  },
  gender: {
    type: "list",
    name: "gender",
    message: "Choose your Gender: ",
    choices: ["male", "female"],
  },
  age: {
    type: "number",
    name: "age",
    message: "Enter your age: ",
    default: 20,
  },
  isSearch: {
    type: "confirm",
    name: "isSearch",
    message: "Do you want to search values in DB: ",
  },
  searchName: {
    type: "input",
    name: "searchName",
    message: "Enter the user's name you want to find in DB: ",
  },
};

module.exports = {
  dbPath,
  prompts,
};
