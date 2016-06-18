'use strict';

const getHome = require('./handlers/home/get_home');

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      description: 'return home page',
      handler: getHome
    }
  }
]
