const express = require("express");
const app = express();
const articleRouter = require("./routes/articles");

// VIEW ENGINE SETUP -- EJS
app.set("view engine", "ejs");

// ROUTES
app.use("/articles", articleRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(5000);
