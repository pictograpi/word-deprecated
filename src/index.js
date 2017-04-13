let angular = require('angular');

module.exports = angular.module('paw', [
    'pawTemplates',
    require('./components')
  ])
  .name;
