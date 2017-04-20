import angular from 'angular';
import pawComponents from './components';

export default angular.module('paw', [
    'pawTemplates',
    pawComponents
  ])
  .name;
