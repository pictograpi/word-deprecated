import angular from 'angular';
import pawWordService from './word.service';
import pawPictographService from './pictograph.service';
import pawAuthService from './auth.service';
import pawConfigService from './config.service';

export default angular.module('paw.services', [])
  .factory('pawWordService', pawWordService)
  .factory('pawPictographService', pawPictographService)
  .factory('pawAuthService', pawAuthService)
  .factory('pawConfigService', pawConfigService)
  .name;