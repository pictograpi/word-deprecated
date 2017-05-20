import registrationView from './registration.view.html';

export default {
  templateUrl: registrationView,
  controller: registrationController
};

registrationController.$inject = ['$rootScope', '$timeout', 'pawMainConstants',
  'pawAuthService'
];

/**
 * Registration controller.
 *
 * @param {any} $rootScope
 * @param {any} $timeout
 * @param {any} pawMainConstants
 * @param {any} pawAuthService
 */
function registrationController($rootScope, $timeout, pawMainConstants,
  pawAuthService) {
  var ctrl = this;

  function reset() {
    ctrl.isError = false;
    ctrl.text = 'Register';
    ctrl.isSuccess = false;
  }

  /**
   * Shows an error when login fails.
   * @param {Object} error Error response
   */
  function showError(error) {
    ctrl.isError = true;
    ctrl.text = error.data.error.details.messages.email[0];
    $timeout(() => reset(), 2000);
  }

  function success() {
    ctrl.isSuccess = true;
    ctrl.text = 'Success!';
    $timeout(() => ctrl.onHide(), 5000);
  }

  /**
   * Hides the login form.
   */
  ctrl.onHide = () => {
    reset();
    ctrl.isVisible = false;
  };

  /**
   * Log in the user when submit button is clicked.
   */
  ctrl.onSubmit = data => {
    if (!data || !data.email || !data.password || !data.name) {
      showError();
    } else {
      pawAuthService
        .register({
          name: data.name,
          email: data.email,
          password: data.password
        }).then(() => success())
        .catch(error => showError(error));
    }
  };

  ctrl.$onInit = () => {
    ctrl.text = 'Register';
  };

  $rootScope.$on(pawMainConstants.EVENTS.SHOW_REGISTRATION,
    () => ctrl.isVisible = true);
}
