import angular from 'angular';
import headerComponent from './header/header.component';
import menuComponent from './menu/menu.component';
import inputComponent from './input/input.component';
import outputComponent from './output/output.component';
import pictogramComponent from './pictogram/pictogram.component';
import loginComponent from './login/login.component';
import registrationComponent from './registration/registration.component';

export default angular.module('paw.components', [])
  .component('pawHeader', headerComponent)
  .component('pawMenu', menuComponent)
  .component('pawInput', inputComponent)
  .component('pawOutput', outputComponent)
  .component('pawPictogram', pictogramComponent)
  .component('pawLogin', loginComponent)
  .component('pawRegistration', registrationComponent)
  .name;
