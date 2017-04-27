import inputView from './input.view.html';

export default {
  templateUrl: inputView,
  controller: inputController
};

inputController.$inject = ['$rootScope', '$window', 'pawMainConstants', 'pawWordService'];

/**
 * Input controller.
 *
 * @param {any} $rootScope
 * @param {any} $window
 * @param {any} pawMainConstants
 * @param {any} pawWordService
 */
function inputController($rootScope, $window, pawMainConstants,
  pawWordService) {
  var ctrl = this;

  /**
   * Resets input.
   */
  function reset() {
    ctrl.input = '';
    pawWordService.update('');
  }

  /**
   * Chains a text.
   */
  function onChain() {
    let inputElement = $window.document.getElementsByClassName('paw-input')[0];
    let selectedText = $window.getSelection().toString();
    let selectionStart = inputElement.selectionStart;
    let selectionEnd = inputElement.selectionEnd;

    ctrl.input = `${ctrl.input.substr(0, selectionStart)}"${selectedText}"${ctrl.input.substr(selectionEnd)}`;
    pawWordService.update(ctrl.input);
  };

  /**
   * Updates the word service with the new input introduced.
   */
  ctrl.onUpdate = () => {
    pawWordService.update(ctrl.input);
  };

  $rootScope.$on(pawMainConstants.EVENTS.USER_LOGGED_OUT, () => reset());

  $rootScope.$on(pawMainConstants.EVENTS.EDITOR_ON_CHAIN, () => onChain());
}
