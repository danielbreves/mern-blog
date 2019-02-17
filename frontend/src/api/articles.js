const API_URL = 'http://localhost:8000';

const defaultResponse = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response.json();
};

const ArticlesAPI = {
  get() {
    return fetch(`${API_URL}/articles`).then(defaultResponse);
  },

  create(article) {
    return fetch(`${API_URL}/articles`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ article: article })
    }).then(defaultResponse);
  },

  update(id, article) {
    return fetch(`${API_URL}/articles/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ article: article })
    }).then(defaultResponse);
  },

  delete(id) {
    return fetch(`${API_URL}/articles/${id}`, {
      method: 'DELETE'
    }).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
    });
  }
}

export default ArticlesAPI;
