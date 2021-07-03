require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/api");

app.use(express.json());

// Route API V1
app.use("/api/v1", router);

// Running On Port
app.listen(4000);
