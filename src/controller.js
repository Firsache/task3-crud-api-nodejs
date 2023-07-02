const { v4: uuidv4 } = require("uuid");
const db = [];

class Controller {
  async getUsers() {
    return db;
  }

  async getUser(userId) {
    const user = db.find((user) => user.id === userId); // or parseInt(userId)
    return user;
  }

  async addUser(userData) {
    const newUser = { ...userData, id: uuidv4() };
    db.push(newUser);
    return newUser;
  }

  async removeUser(userId) {
    const userToDelIndex = db.findIndex((user) => user.id === userId);
    if (userToDelIndex === -1) {
      return false;
    } else {
      db.splice(userToDelIndex, 1);
      return `User with id ${userId} is deleted`;
    }
  }

  async updateUserById(userId, userData) {
    const userIdx = db.findIndex((user) => user.id === userId);
    if (!userIdx) {
      return false;
    } else {
      const userUpdated = { ...userData, id: userId };
      db[userIdx] = userUpdated;
      return userUpdated;
    }
  }
}
module.exports = Controller;
