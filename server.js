const express = require("express");
const app = express();
const articleRouter = require("./routes/articles");
const Article = require("./models/article");

// VIEW ENGINE SETUP -- EJS
app.set("view engine", "ejs");

// ROUTES
app.use("/articles", articleRouter);

app.get("/", (req, res) => {
  const articles = [
    new Article({
    title: "Test Article",
    description: "Test Description"
  }), 
    new Article({
    title: "Test Article 2",
    description: "Another Description"
  })
];
  res.render("articles/index", { articles: articles });
});

app.listen(5000);
