const express = require("express");
const app = express();
const articleRouter = require("./routes/articles");
const Article = require("./models/article");

// VIEW ENGINE SETUP -- EJS
app.set("view engine", "ejs");

// ROUTES
app.use("/articles", articleRouter);

app.get("/", (req, res) => {
  const articles = new Article({
    title: "Test Article",
    description: "Test Description"
  });
  res.render("index", { articles: articles });
});

app.listen(5000);
