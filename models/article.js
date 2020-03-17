const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");


const createDomPurify = require('dompurify'); //returns function
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window) // create HTML, render it in sanitized window

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
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
});

// schema validations
articleSchema.pre("validate", function(next) {
  if (this.title) {
    // force slugify to get rid of non URL safe characters
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // safely convert MD to HTML
  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
  }

  next();
});

module.exports = new mongoose.model("ArticleSchema", articleSchema);
