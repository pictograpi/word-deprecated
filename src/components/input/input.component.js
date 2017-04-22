import inputView from './input.view.html';

export default {
  templateUrl: inputView,
  controller: inputController
};

inputController.$inject = ['pawWordService'];

/**
 * Input controller.
 * 
 * @param {any} pawWordService
 */
function inputController(pawWordService) {
  var ctrl = this,
    previous = '';

  /**
   * Updates the word service with the new input introduced.
   */
  ctrl.onUpdate = () => {
    pawWordService.update(ctrl.input);
  };
}
