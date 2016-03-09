'use strict';

// Load internal modules
const Service = require('./service');

exports.register = function (server, options, next) {
  const services = {};

  options.services.forEach((value) => {
    const host = process.env[`SERVICE_${value.toUpperCase()}_HOST`];
    const port = process.env[`SERVICE_${value.toUpperCase()}_PORT`];

    if (!host) {
      return next(new Error(`Host is missing for "${value}" service.`));
    }

    if (!port) {
      return next(new Error(`Port is missing for "${value}" service.`));
    }

    services[value] = new Service(host, port);
  });

  server.expose('services', services);
  next();
};

exports.register.attributes = {
  name: 'hapi-service-discovery'
};
