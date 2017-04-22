import angular from 'angular';
import pawMainConstants from './main.constants';

export default angular.module('paw.constants', [])
  .constant('pawMainConstants', pawMainConstants)
  .name;
