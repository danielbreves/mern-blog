'use strict';

const fixtures = require('./fixtures.js');
const Article = require('./models/article.js');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(process.env.MONGO_URL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  Article.estimatedDocumentCount((err, count) => {
    if (count > 0) {
      return;
    }

    fixtures.articles.forEach(article => {
      new Article({
        title: article.title,
        content: article.content
      }).save();
    });
  });
});

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use('/articles', require('./controllers/articles.js'));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
