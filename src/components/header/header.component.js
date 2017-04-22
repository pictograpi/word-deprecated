import headerView from './header.view.html';

export default {
  templateUrl: headerView,
  controller: headerController
};

headerController.$inject = ['$rootScope', 'pawMainConstants', 'pawAuthService'];

function headerController($rootScope, pawMainConstants, pawAuthService) {
  var ctrl = this;

  /**
   * Shows login when login is clicked.
   */
  ctrl.onLoginClick = () => $rootScope.$emit(
    pawMainConstants.EVENTS.SHOW_LOGIN);

  ctrl.onLogoutClick = () => pawAuthService.logout();

  $rootScope.$on(pawMainConstants.EVENTS.USER_LOGGED_IN,
    () => ctrl.userLoggedIn = true);
}
