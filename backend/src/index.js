const express = require("express");
require("dotenv").config();
require("express-async-errors");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const router = require("./routes");
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors");

const app = express();
const port = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

app.use(fileUpload());

app.get("/", (req, res) => {
  res.send(`Welcome to Sipresmaru!`);
});

app.use("/", router);

app.use("*", notFoundURLHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});