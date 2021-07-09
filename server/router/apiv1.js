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
  updateUser,
} = require("../app/controllers/user");

const {
  addTransaction,
  updateTransaction,
  getTransactions,
  getTransaction,
} = require("../app/controllers/transaction");

const { housesFilter } = require("../app/controllers/filter");

const { uploadImg } = require("../app/middleware/upload");

// USERS & AUTH
route.post("/signup", signUp);
route.post("/signin", signIn);
route.patch("/user/:id", updateUser);
route.get("/users", getUsers);
route.get("/user/:id", getUser);
route.delete("/user/:id", auth, deleteUser);

// HOUSE
route.get("/houses", getHouses);
route.get("/house/:id", getHouse);
route.post(
  "/house",
  auth,
  uploadImg("photo", "detailOne", "detailTwo", "detailThree"),
  addHouse
);
route.patch("/house/:id", auth, updateHouse);
route.delete("/house/:id", auth, deleteHouse);

// TRANSACTIONS
route.post("/transaction", auth, uploadImg("attachment"), addTransaction);
route.patch("/order/:id", auth, updateTransaction);
route.get("/orders", getTransactions);
route.get("/order/:id", getTransaction);

// FILTER
route.get("/housess", housesFilter);

module.exports = route;
