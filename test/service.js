'use strict';

// Load external modules
const Lab = require('lab');

const nock = require('nock');

// Load internal modules
const Service = require('../src/service');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

lab.beforeEach((done) => {
  nock.cleanAll();
  done();
});

lab.describe('Service', () => {
  lab.describe('request()', () => {
    lab.it('supports GET', (done) => {
      nock('http://172.10.0.1:8080')
        .get('/test')
        .reply(200, 'success');

      const service = new Service('172.10.0.1', 8080);

      service.request('/test')
        .then((response) => {
          expect(response).to.equal('success');
          done();
        })
        .catch(done);
    });

    lab.it('supports POST', (done) => {
      nock('http://172.10.0.1:8080')
        .post('/test', {
          test: 'test'
        })
        .reply(200, 'success');

      const service = new Service('172.10.0.1', 8080);

      service.request('/test', { method: 'POST', body: { test: 'test' }, json: true })
        .then((response) => {
          expect(response).to.equal('success');
          done();
        })
        .catch(done);
    });
  });
});
