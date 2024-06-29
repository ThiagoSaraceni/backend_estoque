require("dotenv").config();
const express = require("express");
const estoqueRouter = require("./estoque");

const app = express();

const cors = require("cors");

app.use(cors());
app.use("/", estoqueRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
