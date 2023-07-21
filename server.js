const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
const bodeParser = require("body-parser");
const handlebars = require("express-handlebars");
const handlebarsDateformat = require("handlebars-dateformat");
const hbs = handlebars.create({
  helpers: {
    dateFormat: handlebarsDateformat,
  },
  layoutsDir: __dirname + "/views/layouts",
  defaultLayout: "index",
});

app.use(express.json());
app.use(bodeParser.urlencoded({ extended: false }));
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);
app.use(express.static("public"));

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});
