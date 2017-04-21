const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/muber_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('warning', err);
    });
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => drivers.endureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done());
});
