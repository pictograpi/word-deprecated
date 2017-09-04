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
  .run(($rootScope, $http, CacheFactory, pawAuthService) => {
    pawAuthService.checkInitialLogin();

    $http.defaults.cache = CacheFactory('defaultCache', {
      maxAge: 30 * 60 * 1000,
      cacheFlushInterval: 60 * 60 * 1000,
      deleteOnExpire: 'aggressive',
      storageMode: 'localStorage'
    });
  }).name;