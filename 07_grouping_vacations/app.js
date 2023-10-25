const vacations = require("./data/vacations.json");

const groupVacations = (vacations) => {
  const data = new Map();

  vacations.forEach(({ user, startDate, endDate }) => {
    const { _id, name } = user;

    if (!data.has(_id)) {
      data.set(_id, { userId: _id, userName: name, vacations: [] });
    }

    data.get(_id).vacations.push({ startDate, endDate });
  });

  return Array.from(data.values());
};

const start = () => {
  const vacationsGrouped = groupVacations(vacations);
  console.log(vacationsGrouped);
};

start();
