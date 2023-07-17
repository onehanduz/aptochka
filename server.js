const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api", require("./routes"));

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});
