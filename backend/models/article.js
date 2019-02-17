const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

module.exports = mongoose.model('Article', articleSchema);
