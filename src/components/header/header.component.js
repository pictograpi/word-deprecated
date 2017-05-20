import headerView from './header.view.html';

export default {
  templateUrl: headerView,
  controller: headerController
};

headerController.$inject = ['$rootScope', 'pawMainConstants', 'pawAuthService'];

function headerController($rootScope, pawMainConstants, pawAuthService) {
  const EVENTS = pawMainConstants.EVENTS;
  var ctrl = this;

  /**
   * Shows login popup when login is clicked.
   */
  ctrl.onLoginClick = () => $rootScope.$emit(EVENTS.SHOW_LOGIN);

  /**
   * Logouts the user when clicked.
   */
  ctrl.onLogoutClick = () => pawAuthService.logout();

  /**
   * Shows register popup when clicked.
   */
  ctrl.onRegisterClick = () => $rootScope.$emit(EVENTS.SHOW_REGISTRATION);

  $rootScope.$on(EVENTS.USER_LOGGED_IN, () => ctrl.userLoggedIn = true);
}
