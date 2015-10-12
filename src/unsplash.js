import Request from 'request'

export default class Unsplash {
  constructor(clientID) {
    if(!clientID) {
      throw new Error('Client ID must be declared.')
    } else if (typeof clientID !== 'string') {
      throw new Error('Client ID must be an string.')
    } else {
      this.clientID = clientID
      this.URL = "https://api.unsplash.com/"
    }
  }
  __get(endpoint, options = {}) {
    var opts = {
      method: 'GET',
      baseUrl: this.URL,
      json: true,
      headers: {
        'Accept-Version': 'v1',
        'Authorization': `Client-ID ${this.clientID}` },
      qs: options
    }
    return new Promise((resolve, reject) => {
      Request(endpoint, opts, (error, response, body) => {
        if(error) reject(error)
        else resolve(body)
      })
    })
  }
  users(username) {
    return {
      self: this.__get(`/users/${username}`),
      photos: this.__get(`/users/${username}/photos`)
    }
  }
  photos(page = 1, per_page = 10) {
    return {
      self: this.__get('/photos', {
        'page': page,
        'per_page': per_page
      }),
      byID: (id) => {
        return this.__get(`/photos/${id}`)
      },
      custom: (id, w = undefined, h = undefined, rect = []) => {
        return this.__get(`/photos/${id}`, {
          'w': w,
          'h': h,
          'rect': rect.join() })
      }
    }
  }
  search(query, category = [], page = 1, per_page = 10) {
    return this.__get('/photos/search/', {
      'query': query,
      'category': category.join(),
      'page': page,
      'per_page': per_page })
  }
  random() {
    return {
      self: this.__get('/photos/random'),
      filter: (category = [], featured = false, username = '', query = '', w = undefined, h = undefined) => {
        return this.__get('/photos/random', {
          'category': category.join(),
          'featured': featured,
          'username': username,
          'query': query,
          'w': w,
          'h': h })
      }
    }
  }
  categories() {
    return {
      self: this.__get('/categories'),
      byID: (id) => {
        return this.__get(`/categories/${id}`)
      },
      photos: (id, page = 1, per_page = 10) => {
        return this.__get(`/categories/${id}/photos`, {
          'page': page,
          'per_page': per_page})
      }
    }
  }
  curated(page = 1, per_page = 10) {
    return {
      self: this.__get('/curated_batches', {
      'page': page,
      'per_page': per_page }),
      byID: (id) => {
        return this.__get(`/curated_batches/${id}`)
      },
      photos: (id) => {
        return this.__get(`/curated_batches/${id}/photos`, {
          'page': page,
          'per_page': per_page
        })
      }
    }
  }
  stats() {
    return this.__get('/stats/total')
  }
}
