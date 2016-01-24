/**
 * Unsplash public API wrapper for Node.js
 * @author carlos gonzález <cgrs@cgrs.tk>
 * @license MIT
 * @version 0.1.0
 */

import Request from 'request'
/**
 * Unsplash wrapper class
 * @desc Contains the methods to access the Unsplash API.
 */
export default class Unsplash {
    /**
     * Create a wrapper.
     * @param {string} clientID - Client ID obtained from the Unsplash developers site.
     */
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
  /**
   * Pseudo-private request method to communicate with the API.
   * @param {string} endpoint - Path to resolve.
   * @param {Object} options - Optional settings to send the API.
   * @return {Promise}
   * @private
   */
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
  /**
   * Get the user's profile and photos
   * @param {string} username - The alias of the username
   * @return {Object} Contains an object with two Promises: one is the user profile (self) and the other is the photo list (photos).
   */
  users(username) {
    return {
      self: this.__get(`/users/${username}`),
      photos: this.__get(`/users/${username}/photos`)
    }
  }
  /**
   * Get a paged list of photos.
   * @param {int} page - Number of the page.
   * @param {int} per_page - Number of elements per page
   * @return {Object} Contains an object with 3 Promises
   */
  photos(page = 1, per_page = 10) {
    return {
      /** Get a paged list by default */
      self: this.__get('/photos', {
        'page': page,
        'per_page': per_page
      }),
      /**
       * Search photos by an ID
       * @param {int} id - The identifier of the photo
       */
      byID: (id) => {
        return this.__get(`/photos/${id}`)
      },
      /**
       * Search photos by an ID and a custom size/clipping.
       * @param {int} id - The identifier of the photo
       * @param {int} w - Photo width
       * @param {int} h - Photo height
       * @param {Array} rect - Array of four elements defining the clipping box
       */
      custom: (id, w = undefined, h = undefined, rect = []) => {
        return this.__get(`/photos/${id}`, {
          'w': w,
          'h': h,
          'rect': rect.join() })
      }
    }
  }
  /**
   * Search a list of photos with some filters
   * @param {string} query - Search query
   * @param {Array} category - List of categories to search
   * @param {int} page - Number of page
   * @param {int} per_page - Number of elements per page
   * @return {Promise}
   */
  search(query, category = [], page = 1, per_page = 10) {
    return this.__get('/photos/search/', {
      'query': query,
      'category': category.join(),
      'page': page,
      'per_page': per_page })
  }
  /**
   * Get a random photo
   * @return {Object}
   */
  random() {
    return {
     /** Only a random photo */
      self: this.__get('/photos/random'),
     /** 
      * Random photo filtered
      * @param {Array} category
      * @param {Boolean} featured - Whether to pick a random photo from the featured list
      * @param {string} username - Username id to pick a random photo from
      * @param {string} query - Search query to choose a random photo
      * @param {int} w
      * @param {int} h
      */
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
  /**
   * Get a list of categories
   */
  categories() {
    return {
      self: this.__get('/categories'),
      /**
       * Get a category by ID
       * @param {int} id
       * @return {Promise}
       */
      byID: (id) => {
        return this.__get(`/categories/${id}`)
      },
      /**
       * Get photos from a specific category
       * @param {int} id
       * @param {int} page
       * @param {int} per_page
       * @return {Promise}
       */
      photos: (id, page = 1, per_page = 10) => {
        return this.__get(`/categories/${id}/photos`, {
          'page': page,
          'per_page': per_page})
      }
    }
  }
  /**
   * Get a list of curated batches
   * @param {int} page
   * @param {int} per_page
   */
  curated(page = 1, per_page = 10) {
    return {
      /** Get a paged list of curated batches */
      self: this.__get('/curated_batches', {
      'page': page,
      'per_page': per_page }),
      /**
       * Get a curated batch by ID
       * @params {int} id - ID of the curated batch
       */
      byID: (id) => {
        return this.__get(`/curated_batches/${id}`)
      },
      /**
       * Get a list of the photos from a specific curated batch
       * @params {int} id
       */
      photos: (id) => {
        return this.__get(`/curated_batches/${id}/photos`, {
          'page': page,
          'per_page': per_page
        })
      }
    }
  }
  /**
   * Get the stats of the Unsplash service
   * @return {Promise}
   */
  stats() {
    return this.__get('/stats/total')
  }
}
