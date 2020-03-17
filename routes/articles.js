const express = require("express");
const router = express.Router();

// GET -- ALL ARTICLES
router.get("/", (req, res) => {
  res.send("Made it to articles");
});

module.exports = router;
