require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/apiv1");

app.use(cors());
app.use(express.json());

// Route API V1
app.use("/api/v1", router);
app.use(
  "/uploads/house",
  express.static(path.join(__dirname, "uploads/house"))
);
app.use(
  "/uploads/transaction",
  express.static(path.join(__dirname, "uploads/transaction"))
);

// Running On Port
app.listen(5000);
