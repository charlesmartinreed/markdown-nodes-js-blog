const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

// schema validations
articleSchema.pre("validate", function(next) {
  if (this.title) {
    // force slugify to get rid of non URL safe characters
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  next();
});

module.exports = new mongoose.model("ArticleSchema", articleSchema);
