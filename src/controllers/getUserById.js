const db = require("../db");

const getUserById = async (userId) => {
  const user = await db.find((user) => user.id === userId); // or parseInt(userId)
  if (!user) {
    return `user with id ${userId} is not found`;
  }
  return user;
  // return new Promise((resolve, reject) => {
  //  const user = await db.find((user) => user.id === userId); // or parseInt(userId)
  //  if (!user) {
  //    reject(`user with id ${userId} is not found`);
  //  }
  //  resolve(user);
  //   });
};
module.exports = getUserById;
