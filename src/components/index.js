let angular = require('angular');

module.exports = angular.module('paw.components', [])
  .component('pawHeader', require('./header/header.component'))
  .component('pawMenu', require('./menu/menu.component'))
  .name;
