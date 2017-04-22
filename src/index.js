import angular from 'angular';
import ngResource from 'angular-resource';
import pictograpiServices from './libs/pictograpi-services';
import pawComponents from './components';
import pawServices from './services';
import pawConstants from './constants';

export default angular.module('paw', [
    'pawTemplates',
    ngResource,
    pictograpiServices,
    pawServices,
    pawComponents,
    pawConstants
  ])
  .config((LoopBackResourceProvider) => {
    LoopBackResourceProvider.setUrlBase('https://api.pictograpi.com/api');
  })
  .config(($httpProvider) => {
    $httpProvider.interceptors.push(function ($rootScope, $q, $location,
      LoopBackAuth) {
      return {
        responseError: function (rejection) {
          if (rejection.status == 401) {
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
            $rootScope.isAuth = false;
          }
          return $q.reject(rejection);
        }
      };
    });
  })
  .run(($rootScope, LoopBackAuth) => {
    $rootScope.isAuth = angular.isString(LoopBackAuth.accessTokenId);
  })
  .name;
