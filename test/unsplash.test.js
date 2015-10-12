var Should = require('should')
var Unsplash = require('../unsplash')

var clientID // add here your Unsplash API client ID
var unsplash = new Unsplash(clientID)

describe('users', () => {
  it('user profile should be an object', (done) => {
    unsplash.users('anthonydelanoix').self.then((profile) => {
      profile.should.be.an.instanceOf(Object)
      done()
    })
  })
  it('user profile should have `username` property', (done) => {
    unsplash.users('anthonydelanoix').self.then((profile) => {
      profile.should.have.property('username')
      done()
    })
  })
  it('user photos should be an array', (done) => {
    unsplash.users('anthonydelanoix').photos.then((photos) => {
      photos.should.be.an.instanceOf(Object)
      done()
    })
  })
  it('user photo should be an object', (done) => {
    unsplash.users('anthonydelanoix').photos.then((photos) => {
      photos[0].should.be.an.instanceOf(Object)
      done()
    })
  })
  it('user photos should have `id` property', (done) => {
    unsplash.users('anthonydelanoix').photos.then((photos) => {
      photos[0].should.have.property('id')
      done()
    })
  })
})

describe('photos', () => {
  it('photos should be an array', (done) => {
    unsplash.photos().self.then((photos) => {
      photos.should.be.an.instanceOf(Object)
      done()
    })
  })
  it('photo should be an object', (done) => {
    unsplash.photos().self.then((photos) => {
      photos[0].should.be.an.instanceOf(Object)
      done()
    })
  })
  it('photo should have `id` property', (done) => {
    unsplash.photos().self.then((photos) => {
      photos[0].should.have.property('id')
      done()
    })
  })
  it('photo (by #ID) should have `color` property', (done) => {
    unsplash.photos().byID('YyRzD8mnqms').then((photo) => {
      photo.should.have.property('color')
      done()
    })
  })
  it('photo should have `custom` property', (done) => {
    unsplash.photos().custom('YyRzD8mnqms', 800, 600, [0,0,200,300]).then((photo) => {
      photo.urls.should.have.property('custom')
      done()
    })
  })
})

describe('search', () => {
  it('search results should return an array', (done) => {
      unsplash.search('eiffel').then((results) => {
        results.should.be.an.instanceOf(Object)
        done()
      })
  })
  it('search result should be an object', (done) => {
      unsplash.search('eiffel').then((results) => {
        results[0].should.be.an.instanceOf(Object)
        done()
      })
  })
  it('search result should have `id` property', (done) => {
      unsplash.search('eiffel').then((results) => {
        results[0].should.have.property('id')
        done()
      })
  })
})

describe('random', () => {
  it('random photo should be an object', (done) => {
      unsplash.random().self.then((photo) => {
        photo.should.be.an.instanceOf(Object)
        done()
      })
  })
  it('random photo should have `id` property', (done) => {
      unsplash.random().self.then((photo) => {
        photo.should.have.property('id')
        done()
      })
  })
  it('random photo (filtered) should be an object', (done) => {
      unsplash.random().filter([], true).then((photo) => {
        photo.should.be.an.instanceOf(Object)
        done()
      })
  })
  it('random photo (filtered) should have `id` property', (done) => {
      unsplash.random().filter([],true).then((photo) => {
        photo.should.have.property('id')
        done()
      })
  })
})

describe('categories', () => {
  it('categories should be an array', (done) => {
      unsplash.categories().self.then((categories) => {
        categories.should.be.an.instanceOf(Object)
        done()
      })
  })
  it('category should be an object', (done) => {
      unsplash.categories().self.then((categories) => {
        categories[0].should.be.an.instanceOf(Object)
        done()
      })
  })
  it('category should have `id` property', (done) => {
      unsplash.categories().self.then((categories) => {
        categories[0].should.have.property('id')
        done()
      })
  })
  it('category (by #ID) should be an object', (done) => {
      unsplash.categories().byID(2).then((category) => {
        category.should.be.an.instanceOf(Object)
        done()
      })
  })
  it('category (by #ID) should have `id` property', (done) => {
      unsplash.categories().byID(2).then((category) => {
        category.should.have.property('id')
        done()
      })
  })
  it('category photos should be an array', (done) => {
      unsplash.categories().photos(2).then((photos) => {
        photos.should.be.an.instanceOf(Object)
        done()
      })
  })
  it('category photo should be an object', (done) => {
      unsplash.categories().photos(2).then((photos) => {
        photos[0].should.be.an.instanceOf(Object)
        done()
      })
  })
  it('category photo should have `id` property', (done) => {
      unsplash.categories().photos(2).then((photos) => {
        photos[0].should.have.property('id')
        done()
      })
  })
})

describe('curated batches', () => {
  it('curated batches should be an array', (done) => {
      unsplash.curated().self.then((batches) => {
        batches.should.be.an.instanceOf(Object)
        done()
      })
  })
  it('curated batch should be an object', (done) => {
      unsplash.curated().self.then((batches) => {
        batches[0].should.be.an.instanceOf(Object)
        done()
      })
  })
  it('curated batch should have `id` property', (done) => {
      unsplash.curated().self.then((batches) => {
        batches[0].should.have.property('id')
        done()
      })
  })
  it('curated batch (by #ID) should be an object', (done) => {
      unsplash.curated().byID(2).then((batch) => {
        batch.should.be.an.instanceOf(Object)
        done()
      })
  })
  it('curated batch (by #ID) should have `id` property', (done) => {
      unsplash.curated().byID(2).then((batch) => {
        batch.should.have.property('id')
        done()
      })
  })
  it('curated batch (by #ID) photos should be an array', (done) => {
      unsplash.curated().photos(2).then((photos) => {
        photos.should.be.an.instanceOf(Object)
        done()
      })
  })
  it('curated batch (by #ID) photo should be an object', (done) => {
      unsplash.curated().photos(2).then((photos) => {
        photos[0].should.be.an.instanceOf(Object)
        done()
      })
  })
  it('curated batch (by #ID) photo should have `id` property', (done) => {
      unsplash.curated().photos(2).then((photos) => {
        photos[0].should.have.property('id')
        done()
      })
  })
})
describe('stats', () => {
  it('stats shoud be an object', (done) => {
    unsplash.stats().then((stats) => {
      stats.should.be.an.instanceOf(Object)
      done()
    })
  })
  it('stats shoud be have `photo_downloads` property', (done) => {
    unsplash.stats().then((stats) => {
      stats.should.have.property('photo_downloads')
      done()
    })
  })
})
