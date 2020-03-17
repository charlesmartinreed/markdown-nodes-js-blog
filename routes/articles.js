const express = require("express");
const router = express.Router();

// GET -- ALL ARTICLES
router.get("/", (req, res) => {
  res.send("Made it to articles");
});

// POST -- NEW ARTICLE
router.get('/new', (req, res) => {
    res.render('articles/new')
})

module.exports = router;
