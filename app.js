require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const app = express();
const routes = require("./routes");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", routes);

app.listen(port, () => console.log("esta rodando"));
