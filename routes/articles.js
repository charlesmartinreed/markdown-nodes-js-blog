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

router.post("/", async (req, res) => {
  // create the new article
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  });

  // save the new article
  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (error) {
    // return to the article creation page, with the previously entered data added
    res.render("articles/new", { article: article });
  }
});

module.exports = router;
