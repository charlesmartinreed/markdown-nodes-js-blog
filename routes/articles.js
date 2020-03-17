const express = require("express");
const router = express.Router();

const Article = require("../models/article");

// GET -- ALL ARTICLES
router.get("/", (req, res) => {
  res.send("Made it to articles");
});

// POST -- NEW ARTICLE
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

// GET -- ARTICLE BY ID
router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });

  if (article == null) res.redirect("/");

  // catch route
  res.render("articles/show", { article: article });
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown

  // save the new article
  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (error) {
    // return to either the article creation page, with the previously entered data added or the edited page
    res.render(`articles/${path}`, { article: article });
  }
  }
}

// PUT -- UPDATE ARTICLE BY ID
router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render('articles/edit', { article: article });
})

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id);
  next()
}, saveArticleAndRedirect('edit'))

// POST -- CREATE NEW ARTICLE

router.post("/", async (req, res, next) => {
  req.article = new Article() // create new article and pin it to the request
  next() //moves on to the saveArticleAndRedirect function
}, saveArticleAndRedirect('new'));

// DELETE -- REMOVE ARTICLE BY ID
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
