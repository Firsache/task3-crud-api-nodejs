const db = require("../db");

const getAll = async () => {
  const users = await db;
  return users;
  // return new Promise((resolve, reject) => resolve(db));
};
module.exports = getAll;
