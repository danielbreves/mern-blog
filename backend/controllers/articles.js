const router = require('express').Router();
const Article = require('../models/article.js');

router.get('/', (req, res) => {
  Article.find({}).then(articles => {
    res.json({ articles: articles });
  }).catch(err => res.status(404).send(err));
});

router.post('/', (req, res) => {
  const articleData = req.body.article;

  const article = new Article({
    title: articleData.title,
    content: articleData.content
  });

  article.save().then(() => {
    res.json({ article: article });
  }).catch(err => res.status(500).send(err));
});

router.put('/:id', (req, res) => {
  Article.findOneAndUpdate({ _id: req.params.id }, req.body.article, { new: true })
    .then(article => res.json({ article: article }))
    .catch(err => res.status(500).send(err));
});

router.delete('/:id', (req, res) => {
  Article.deleteOne({ _id: req.params.id })
    .then(() => res.send('OK'))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
