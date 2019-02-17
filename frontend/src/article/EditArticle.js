import React, { Component } from 'react';
import ArticlesAPI from '../api/articles.js';

class EditArticle extends Component {
  constructor(props) {
    super(props);
    const original = this.props.article || {};
    this.state = {
      title: original.title || "",
      content: original.content || ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleArticleSaved = this.handleArticleSaved.bind(this);
    this.handleBackClicked = this.handleBackClicked.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleArticleSaved(e) {
    const savedArticle = {
      title: this.state.title,
      content: this.state.content
    };

    const actionPromise = this.props.article ?
      ArticlesAPI.update(this.props.article._id, savedArticle) :
      ArticlesAPI.create(savedArticle);

    actionPromise
      .then(res => this.props.onArticleSaved(res.article))
      .catch(error => this.props.onError("Failed to save article :("));

    e.preventDefault();
  }

  handleBackClicked() {
    this.props.onBackClicked();
  }

  render() {
    return (
      <div>
        <h2>{this.props.article ? "Edit Article" : "Add New"}</h2>
        <form onSubmit={this.handleArticleSaved}>
          <input name="title" type="text" value={this.state.title} onChange={this.handleInputChange}></input><br />
          <textarea name="content" value={this.state.content} onChange={this.handleInputChange}></textarea><br />
          <input type="submit" value="Submit" />
        </form>
        <button onClick={this.handleBackClicked}>Back</button>
      </div>
    );
  }
}

export default EditArticle;
