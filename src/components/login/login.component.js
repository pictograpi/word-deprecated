import loginView from './login.view.html';

export default {
  templateUrl: loginView,
  controller: loginController
};

loginController.$inject = ['$rootScope', '$timeout', 'pawMainConstants',
  'pawAuthService'
];

function loginController($rootScope, $timeout, pawMainConstants,
  pawAuthService) {
  var ctrl = this;

  /**
   * Shows an error when login fails.
   */
  function showError() {
    ctrl.isError = true;
    $timeout(() => ctrl.isError = false, 2000);
  }

  /**
   * Hides the login form.
   */
  ctrl.onHide = () => {
    ctrl.isVisible = false;
    ctrl.isError = false;
  };

  /**
   * Launches Facebook login.
   */
  ctrl.onFacebookLogin = () => {
    pawAuthService.loginFacebook()
      .then(() => ctrl.onHide())
      .catch(() => showError());
  };

  $rootScope.$on(pawMainConstants.EVENTS.SHOW_LOGIN,
    () => ctrl.isVisible = true);
}
