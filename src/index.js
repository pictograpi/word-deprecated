import angular from 'angular';
import ngResource from 'angular-resource';
import pictograpiServices from './libs/pictograpi-services';
import pawComponents from './components';
import pawServices from './services';
import pawConstants from './constants';
import angularCache from 'angular-cache';
import angularFire from 'angularfire';

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

export default angular
  .module('paw', [
    'pawTemplates',
    angularFire,
    angularCache,
    ngResource,
    pictograpiServices,
    pawServices,
    pawComponents,
    pawConstants
  ])
  .config(LoopBackResourceProvider => {
    LoopBackResourceProvider.setUrlBase(process.env.PICTOGRAPI_ENDPOINT);
  })
  .config($httpProvider => {
    $httpProvider.interceptors.push(function ($rootScope, $q, $location,
      $firebaseAuth, LoopBackAuth, pawMainConstants) {
      return {
        responseError: function (rejection) {
          let auth = $firebaseAuth();

          if (rejection.status == 401) {
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
            $rootScope.isAuth = false;

            return auth.$signOut()
              .then(() => {
                $rootScope.isAuth = false;
                $rootScope.user = undefined;
                $rootScope.$emit(pawMainConstants.EVENTS.USER_LOGGED_OUT);
              });
          }
          return $q.reject(rejection);
        }
      };
    });
  })
  .run(($rootScope, $http, CacheFactory, pawAuthService) => {
    pawAuthService.checkInitialLogin();

    $http.defaults.cache = CacheFactory('defaultCache', {
      maxAge: 30 * 60 * 1000,
      cacheFlushInterval: 60 * 60 * 1000,
      deleteOnExpire: 'aggressive',
      storageMode: 'localStorage'
    });
  }).name;
