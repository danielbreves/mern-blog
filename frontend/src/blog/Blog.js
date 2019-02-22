import React, { Component } from 'react';
import Article from '../article/Article.js';
import EditArticle from '../article/EditArticle.js';
import Articles from '../articles/ArticlesList.js';
import ArticlesAPI from '../api/articles.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: null,
      isEditing: false,
      isAdding: false,
      articles: null,
      error: null
    };

    this.handleViewArticle = this.handleViewArticle.bind(this);
    this.handleEditArticle = this.handleEditArticle.bind(this);
    this.handleDeleteArticle = this.handleDeleteArticle.bind(this);
    this.handleArticleSaved = this.handleArticleSaved.bind(this);
    this.handleBackClicked = this.handleBackClicked.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    ArticlesAPI.get().then(response => {
      if (!response.articles) {
        this.setState({ error: "Failed to fetch articles :(" });
      } else {
        this.setState({
          articles: response.articles
        });
      }
    }).catch(error => this.setState({ error: error.message }));
  }

  findArticle(id) {
    return this.state.articles.find(article => article._id === id);
  }

  handleViewArticle(id) {
    this.setState({
      articleId: id
    });
  }

  handleEditArticle(id) {
    this.setState({
      articleId: id,
      isEditing: true
    });
  }

  handleDeleteArticle(id) {
    ArticlesAPI.delete(id).then(() => {
      this.setState({
        articles: this.state.articles.filter(article => article._id !== id)
      });
    }).catch(error => this.setState({ error: error.message }));
  }

  handleArticleSaved(saved) {
    const articleId = saved._id;
    const articleUpdated = this.findArticle(articleId);
    let articles;
    if (articleUpdated) {
      articles = this.state.articles.map(original => {
        if (original._id === saved._id) {
          return {
            ...original,
            title: saved.title,
            content: saved.content
          }
        }
        return original;
      });
    } else {
      articles = this.state.articles.slice();
      articles.push({
        _id: saved._id,
        title: saved.title,
        content: saved.content
      });
    }

    this.setState({
      articleId,
      articles,
      isEditing: false
    });
  }

  handleError(error) {
    this.setState({ error })
  }

  handleBackClicked() {
    this.setState({
      articleId: null,
      isAdding: false,
      isEditing: false,
      error: null
    });
  }

  handleAddNew() {
    this.setState({
      isAdding: true
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <p>{this.state.error}</p>
          <button onClick={this.handleBackClicked}>Back</button>
        </div>
      );
    }

    if (!this.state.articles) {
      return (<p>Loading...</p>);
    }

    if (this.state.articleId === null) {
      if (this.state.isAdding) {
        return (
          <EditArticle
            onArticleSaved={this.handleArticleSaved}
            onBackClicked={this.handleBackClicked}
            onError={this.handleError}
          />
        );
      }
      return (
        <div>
          <h1>Blog</h1>
          <button onClick={this.handleAddNew}>Add New</button>
          <Articles articles={this.state.articles}
            onViewArticle={this.handleViewArticle}
            onEditArticle={this.handleEditArticle}
            onDeleteArticle={this.handleDeleteArticle}
            />
        </div>
      )
    } else {
      const article = this.findArticle(this.state.articleId);
      if (this.state.isEditing) {
        return (
          <EditArticle article={article}
            onArticleSaved={this.handleArticleSaved}
            onBackClicked={this.handleBackClicked}
            onError={this.handleError}
          />
        )
      }
      return (<Article article={article} onBackClicked={this.handleBackClicked}/>)
    }
  }
}

export default App;
