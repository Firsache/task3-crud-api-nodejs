const db = require("../db");

const getAll = async (_, res) => {
  const users = db;
  res.json({
    status: 200,
    message: "success",
    data: {
      result: users,
    },
  });
};
module.exports = getAll;
