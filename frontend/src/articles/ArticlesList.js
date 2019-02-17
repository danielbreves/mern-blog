import React, { Component } from 'react';
import ArticleItem from './ArticleItem.js';

class Articles extends Component {
  constructor(props) {
    super(props);
    this.handleViewArticle = this.handleViewArticle.bind(this);
    this.handleEditArticle = this.handleEditArticle.bind(this);
    this.handleDeleteArticle = this.handleDeleteArticle.bind(this);
  }

  handleViewArticle(e) {
    this.props.onViewArticle(e.currentTarget.dataset.id);
  }

  handleEditArticle(e) {
    this.props.onEditArticle(e.currentTarget.dataset.id);
  }

  handleDeleteArticle(e) {
    this.props.onDeleteArticle(e.currentTarget.dataset.id);
  }

  render() {
    const articlesList = this.props.articles.map(article => {
      return (
        <li data-id={article._id} key={article._id}>
          <ArticleItem article={article} />
          <button data-id={article._id} onClick={this.handleViewArticle}>Read</button>
          <button data-id={article._id} onClick={this.handleEditArticle}>Edit</button>
          <button data-id={article._id} onClick={this.handleDeleteArticle}>Delete</button>
        </li>
      );
    });

    return (
      <div>
        <ul>{articlesList}</ul>
      </div>
    );
  }
}

export default Articles;
