
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("CI/CD Pipeline is Working!");
});

app.listen(8888, () => {
  console.log("Server running on port 8888");
});