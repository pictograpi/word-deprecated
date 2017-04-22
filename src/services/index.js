import angular from 'angular';
import pawWordService from './word.service';
import pawPictogramService from './pictogram.service';

export default angular.module('paw.services', [])
  .factory('pawWordService', pawWordService)
  .factory('pawPictogramService', pawPictogramService)
  .name;
