const { Router } = require("express");
const route = Router();
const { auth } = require("../app/middleware/auth");
const {
  addHouse,
  getHouses,
  getHouse,
  updateHouse,
  deleteHouse,
} = require("../app/controllers/house");
const {
  signUp,
  signIn,
  getUsers,
  getUser,
  deleteUser,
} = require("../app/controllers/user");

const { addTransaction } = require("../app/controllers/transaction");

// USERS & AUTH
route.post("/signup", signUp);
route.post("/signin", signIn);
route.get("/users", getUsers);
route.get("/user/:id", getUser);
route.delete("/user/:id", deleteUser);

// HOUSE
route.get("/houses", getHouses);
route.get("/house/:id", getHouse);
route.post("/house", auth, addHouse);
route.patch("/house/:id", auth, updateHouse);
route.delete("/house/:id", auth, deleteHouse);

// TRANSACTIONS
route.post("/transaction", auth, addTransaction);

module.exports = route;
