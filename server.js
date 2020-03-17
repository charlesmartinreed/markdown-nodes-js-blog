const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");

// DB SETUP
mongoose.connect(
  "mongodb://localhost/blog",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  () => {
    console.log("connected successfully to DB");
  }
);

// MIDDLEWARE
// VIEW ENGINE SETUP -- EJS
app.set("view engine", "ejs");

// allows us to access our article form's body data
app.use(express.urlencoded({ extended: false }));

// when we set _method in a form, it will override the actual method so we can call our delete
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });

  res.render("articles/index", { articles: articles });
});

// ROUTES
app.use("/articles", articleRouter);

app.listen(5000);
