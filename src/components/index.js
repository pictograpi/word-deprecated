import angular from 'angular';
import headerComponent from './header/header.component';
import menuComponent from './menu/menu.component';
import inputComponent from './input/input.component';
import outputComponent from './output/output.component';
import pictogramComponent from './pictogram/pictogram.component';

export default angular.module('paw.components', [])
  .component('pawHeader', headerComponent)
  .component('pawMenu', menuComponent)
  .component('pawInput', inputComponent)
  .component('pawOutput', outputComponent)
  .component('pawPictogram', pictogramComponent)
  .name;
