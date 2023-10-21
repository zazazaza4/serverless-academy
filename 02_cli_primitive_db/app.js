const fs = require("fs").promises;
const inquirer = require("inquirer");

const { dbPath, prompts } = require("./consts");

async function loadUsers() {
  try {
    const data = await fs.readFile(dbPath, "utf8");
    const users = data
      .split("\n")
      .map((user) => {
        if (user) {
          return JSON.parse(user);
        }
      })
      .filter(Boolean);

    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function saveUser(user) {
  const userJSON = JSON.stringify(user) + "\n";
  try {
    await fs.appendFile(dbPath, userJSON);
  } catch (error) {
    console.error("Error saving user:", error);
  }
}

function showUsers(users) {
  if (users.length === 0) {
    console.log("No users in the DB.");
  } else {
    console.log(users);
  }
}

function findUserByName(name, users) {
  const foundUser = users.find(
    (user) => user.name.toLowerCase() === name.toLowerCase()
  );

  if (foundUser) {
    console.log(`User ${name} was found`);
    console.log(JSON.stringify(foundUser));
  } else {
    console.log(`User ${name} not was found`);
  }
}

async function start() {
  while (true) {
    const { name } = await inquirer.prompt([prompts.name]);

    if (name) {
      const { gender, age } = await inquirer.prompt([
        prompts.gender,
        prompts.age,
      ]);

      const user = { name, gender, age };
      await saveUser(user);
    } else {
      break;
    }
  }

  const { isSearch } = await inquirer.prompt([prompts.isSearch]);

  if (isSearch) {
    let users = await loadUsers();
    showUsers(users);

    const { searchName } = await inquirer.prompt([prompts.searchName]);

    findUserByName(searchName, users);
  }
}

start().catch((err) => {
  console.log(err);
});
