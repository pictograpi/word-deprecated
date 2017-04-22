import inputView from './input.view.html';

export default {
  templateUrl: inputView,
  controller: inputController
};

inputController.$inject = ['$rootScope', 'pawMainConstants', 'pawWordService'];

/**
 * Input controller.
 *
 * @param {any} $rootScope
 * @param {any} pawWordService
 */
function inputController($rootScope, pawMainConstants, pawWordService) {
  var ctrl = this,
    previous = '';

  /**
   * Resets input.
   */
  function reset() {
    ctrl.input = '';
    pawWordService.update('');
  }

  /**
   * Updates the word service with the new input introduced.
   */
  ctrl.onUpdate = () => {
    pawWordService.update(ctrl.input);
  };

  $rootScope.$on(pawMainConstants.EVENTS.USER_LOGGED_OUT, () => reset());
}
