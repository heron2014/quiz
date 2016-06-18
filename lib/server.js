'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Handlebars = require('handlebars');
const Assets = require('./assets');
const routes = require('./routes');

const server = new Hapi.Server();
server.connection({port: 3000});

server.register([Inert, Vision, Assets], (err) => {

  if (err) {
    throw err;
  }

  server.route(routes);

  server.views({
    engines: {
      html: Handlebars
    },
    relativeTo: __dirname + '/../views/',
    path: '.',
    layout: 'index',
    layoutPath: 'layout'
  });

});

server.start((err) => {

  if (err) {
    throw err;
  }

  console.log('Server running at: ', server.info.uri);
});
