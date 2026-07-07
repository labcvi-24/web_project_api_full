
  class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  

  getUserInfo() {
    const token = localStorage.getItem("jwt");

    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        Authorization:`Bearer ${token}`,
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
    
    

  }

  updateUserInfo(data) {
    const token = localStorage.getItem("jwt"); 
    
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization:`Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  getInitialCards() {
    const token = localStorage.getItem("jwt");

    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        Authorization:`Bearer ${token}`,
      },
    }).then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  addCard(data) {
    const token = localStorage.getItem("jwt");

    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization:`Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  updateAvatar(avatarLink) {
    const token = localStorage.getItem("jwt");

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization:`Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  deleteCard(cardId) {
    const token = localStorage.getItem("jwt");

    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization:`Bearer ${token}`,
      },
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }


  likeCard(cardId) {
    const token = localStorage.getItem("jwt");

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        Authorization:`Bearer ${token}`,
      },
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }


  unlikeCard(cardId) {
    const token = localStorage.getItem("jwt");

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization:`Bearer ${token}`,
      },
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  changeLikeCardStatus(cardId, isLiked) {
    const token = localStorage.getItem("jwt");
  return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    method: isLiked ? "DELETE" : "PUT",
    headers:{
      ...this._headers, //uso del operador spread
      Authorization: `Bearer ${token}`,
    }  
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}

  getAppInfo() {
    return Promise.all([
      this.getUserInfo(),
      this.getInitialCards()
    ]);
  }

}

const api = new Api({
    baseUrl:  "https://api.visage.strangled.net",
    headers: {
      "Content-Type": "application/json",
    }  
});

export default api;