'use strict';

// Load external modules
const Hapi = require('hapi');
const Lab = require('lab');
const Sinon = require('sinon');

// Load internal modules
const HapiServiceDiscovery = require('..');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

lab.describe('Plugin', () => {
  lab.it('registers the services', (done) => {
    const sandbox = Sinon.sandbox.create().stub(process, 'env', {
      SERVICE_USER_HOST: '172.10.0.1',
      SERVICE_USER_PORT: 8080
    });

    const server = new Hapi.Server();
    server.connection();

    const plugin = {
      register: HapiServiceDiscovery,
      options: {
        services: ['user']
      }
    };

    server.register(plugin)
      .then(() => {
        expect(server.plugins['hapi-service-discovery'].services).to.be.an.object();
        expect(server.plugins['hapi-service-discovery'].services.user).to.be.an.object();

        return server.stop();
      })
      .then(() => {
        sandbox.restore();
        done();
      })
      .catch(done);
  });

  lab.it('returns an error when host is missing', (done) => {
    const sandbox = Sinon.sandbox.create().stub(process, 'env', {
      SERVICE_USER_PORT: 8080
    });

    const server = new Hapi.Server();
    server.connection();

    const plugin = {
      register: HapiServiceDiscovery,
      options: {
        services: ['user']
      }
    };

    server.register(plugin)
      .catch((err) => {
        expect(err.message).to.equal('Host is missing for "user" service.');

        sandbox.restore();
        done();
      });
  });

  lab.it('returns an error when host is missing', (done) => {
    const sandbox = Sinon.sandbox.create().stub(process, 'env', {
      SERVICE_USER_HOST: '172.10.0.1'
    });

    const server = new Hapi.Server();
    server.connection();

    const plugin = {
      register: HapiServiceDiscovery,
      options: {
        services: ['user']
      }
    };

    server.register(plugin)
      .catch((err) => {
        expect(err.message).to.equal('Port is missing for "user" service.');

        sandbox.restore();
        done();
      });
  });
});
