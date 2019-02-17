import React, { Component } from 'react';

class Article extends Component {
  constructor(props) {
    super(props);
    this.handleBackClicked = this.handleBackClicked.bind(this);
  }

  handleBackClicked() {
    this.props.onBackClicked();
  }

  render() {
    const content = {
      __html: this.props.article.content
    };

    return (
      <div>
        <h1>{this.props.article.title}</h1>
        <div dangerouslySetInnerHTML={content} />
        <button onClick={this.handleBackClicked}>Back</button>
      </div>
    );
  }
}

export default Article;
