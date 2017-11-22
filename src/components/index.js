import angular from 'angular';
import headerComponent from './header/header.component';
import menuComponent from './menu/menu.component';
import inputComponent from './input/input.component';
import outputComponent from './output/output.component';
import pictographComponent from './pictograph/pictograph.component';
import loginComponent from './login/login.component';
import shareComponent from './share/share.component';

export default angular.module('paw.components', [])
  .component('pawHeader', headerComponent)
  .component('pawMenu', menuComponent)
  .component('pawInput', inputComponent)
  .component('pawOutput', outputComponent)
  .component('pawPictograph', pictographComponent)
  .component('pawLogin', loginComponent)
  .component('pawShare', shareComponent)
  .name;