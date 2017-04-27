import angular from 'angular';
import ngResource from 'angular-resource';
import pictograpiServices from './libs/pictograpi-services';
import pawComponents from './components';
import pawServices from './services';
import pawConstants from './constants';
import angularCache from 'angular-cache';

export default angular.module('paw', [
    'pawTemplates',
    angularCache,
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
  .run(($rootScope, $http, CacheFactory, LoopBackAuth) => {
    $rootScope.isAuth = angular.isString(LoopBackAuth.accessTokenId);

    $http.defaults.cache = CacheFactory('defaultCache', {
      maxAge: 30 * 60 * 1000,
      cacheFlushInterval: 60 * 60 * 1000,
      deleteOnExpire: 'aggressive',
      storageMode: 'localStorage'
    });
  })
  .name;
