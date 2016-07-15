###
# Unsplash public API wrapper for Node.js
# @author carlos gonzález <cgrs@cgrs.tk>
# @license MIT
# @version 0.2.0
###

Request = require "request"

class Unsplash

  _clientID: null

  constructor: (clientID) ->
    if typeof clientID is "undefined"
      throw Error "Client ID must be declared."
    else if typeof clientID != "string"
      throw Error "Client ID must be an string."
    else
      @_clientID = clientID

  _get: (endpoint, options = {}) ->
    opts =
      method: "GET"
      baseUrl: "https://api.unsplash.com/"
      json: true
      headers:
        "Accept-Version": "v1"
        "Authorization": "Client-ID #{@_clientID}"
      qs: options
    return new Promise (resolve, reject) ->
      Request endpoint, opts, (err, res, body) ->
        if err then reject err
        else resolve body

  users: (username) ->
    self: @_get "/users/#{username}"
    photos: @_get "/users/#{username}/photos"

  photos: (page = 1, per_page = 10) ->
    self: @_get "/photos", 
      "page": page
      "per_page": per_page
    byID: (id) =>
      @_get "/photos/#{id}"
    custom: (id, w = undefined, h = undefined, rect = []) =>
      @_get "/photos/#{id}",
        "w": w
        "h": h
        "rect": rect.join()

  search: (query, category = [], page = 1, per_page = 10) ->
    @_get "/photos/search/",
      "query": query
      "category": category.join()
      "page": page
      "per_page": per_page

  random: ->
    self: @_get "/photos/random"
    filter: (category = [], featured = false, username = "", query = "", w = undefined, h = undefined) =>
      @_get "/photos/random",
        "category": category.join()
        "featured": featured
        "username": username
        "query": query
        "w": w
        "h": h

  categories: ->
    self: @_get "/categories"
    byID: (id) =>
      @_get "/categories/#{id}"
    photos: (id, page = 1, per_page = 10) =>
      @_get "/categories/#{id}/photos",
        "page": page
        "per_page": per_page

  curated: (page = 1, per_page = 10) ->
    self: @_get "/curated_batches",
      "page": page
      "per_page": per_page
    byID: (id) =>
      @_get "/curated_batches/#{id}"
    photos: (id) =>
      @_get "/curated_batches/#{id}/photos",
        "page": page
        "per_page": per_page
  stats: ->
    @_get "/stats/total"
module.exports = Unsplash