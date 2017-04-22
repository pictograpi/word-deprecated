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
    LoopBackResourceProvider.setUrlBase('http://api.pictograpi.com/api');
  })
  .name;
