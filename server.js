const express = require("express");
const app = express();
const mongoose = require('mongoose');
const articleRouter = require("./routes/articles");
const Article = require("./models/article");

// DB SETUP
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected successfully to DB')
})

// VIEW ENGINE SETUP -- EJS
app.set("view engine", "ejs");

// MIDDLEWARE
// allows us to access our article form's body data
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
  const articles = [
    {
      title: 'test article',
      createdAt: new Date(),
      description: 'test description'
    }
  ]; 
  res.render("articles/index", { articles: articles });
});

// ROUTES
app.use("/articles", articleRouter);

app.listen(5000);
