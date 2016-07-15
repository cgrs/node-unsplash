# Unsplash API wrapper
Simple (and unofficial) wrapper to handle the public API of [Unsplash](http://unsplash.com) [![Build Status](https://travis-ci.org/cgrs/node-unsplash.svg?branch=master)](https://travis-ci.org/cgrs/node-unsplash)

Note: Since Unsplash has released their [official API wrapper](https://github.com/unsplash/unsplash-js), this project won't be longer maintained.

## Installation

```bash
$ npm install cgrs/node-unsplash
```
## Usage
```javascript
var Unsplash = require('unsplash')
var unsplash = new Unsplash('here goes the client ID')

unsplash.users('anthonydelanoix').photos.then(function(photos){
	// make something with Anthony Delanoix photos...
})
unsplash.random().then(function(photo){
	// do whatever you want with a random photo...
})
```
## Tests
```bash
$ CLIENT_ID=[your client id] npm run test
```
## Documentation 
The code is annotated in JSDoc format. In order to create the documentation, just run `jsdoc src/unsplash.js`

## Side notes
Please be very careful with the API limit, as it runs off quickly. Once you've set out of development, please ask Unsplash so as to increase your limit.

This library is not related to Unsplash, nor supported from them.

## License

#### The MIT License (MIT)

Copyright (c) 2015 Carlos González

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
