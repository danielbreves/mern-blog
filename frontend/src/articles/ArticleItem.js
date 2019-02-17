import React, { Component } from 'react';

class ArticleItem extends Component {
  render() {
    const truncatedContent = this.props.article.content.slice(0, 200) + "...";

    return (
      <div>
        <h2>{this.props.article.title}</h2>
        <p>{truncatedContent.replace(/<p>|<\/p>/, '')}</p>
      </div>
    );
  }
}

export default ArticleItem;
