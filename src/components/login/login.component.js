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
  ctrl.onHide = () => ctrl.isVisible = false;

  /**
   * Log in the user when submit button is clicked.
   */
  ctrl.onSubmit = data => {
    if (!data || !data.email || !data.password) {
      showError();
    } else {
      pawAuthService.login(data)
        .then(() => ctrl.onHide())
        .catch(() => showError());
    }
  };

  $rootScope.$on(pawMainConstants.EVENTS.SHOW_LOGIN,
    () => ctrl.isVisible = true);
}
