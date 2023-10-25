const vacations = require("./data/vacations.json");

const groupVacations = (vacations) => {
  const data = {};

  vacations.forEach(({ user, startDate, endDate }) => {
    const { _id, name } = user;

    if (!data.hasOwnProperty(_id)) {
      data[_id] = { userId: _id, userName: name, vacations: [] };
    }

    data[_id].vacations.push({ startDate, endDate });
  });

  return Object.values(data);
};

const start = () => {
  const vacationsGrouped = groupVacations(vacations);
  console.log(vacationsGrouped);
};

start();
