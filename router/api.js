const { Router } = require("express");
const route = Router();
const { auth } = require("../middleware/auth");
const { addHouse, getHouses, getHouse } = require("../controllers/house");
const {
  signUp,
  signIn,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/user");

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
// UPDATE //
// DELETE //

module.exports = route;
