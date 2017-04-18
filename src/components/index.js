let angular = require('angular');

module.exports = angular.module('paw.components', [])
  .component('pawHeader', require('./header/header.component'))
  .component('pawMenu', require('./menu/menu.component'))
  .component('pawInput', require('./input/input.component'))
  .component('pawOutput', require('./output/output.component'))
  .name;
