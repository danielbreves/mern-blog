const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const Article = require('../models/article.js');

const typeDefs = `
  type Article {
    _id: String,
    title: String,
    content: String
  }

  type Query {
    articles: [Article]
    article(_id: String): Article
  }
`;

const resolvers = {
  Query: {
    articles: () => Article.find({}),
    article: (_, { _id }) => Article.findById(_id)
  }
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
