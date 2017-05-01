import angular from 'angular';
import pawWordService from './word.service';
import pawPictogramService from './pictogram.service';
import pawAuthService from './auth.service';
import pawConfigService from './config.service';

export default angular.module('paw.services', [])
  .factory('pawWordService', pawWordService)
  .factory('pawPictogramService', pawPictogramService)
  .factory('pawAuthService', pawAuthService)
  .factory('pawConfigService', pawConfigService)
  .name;
