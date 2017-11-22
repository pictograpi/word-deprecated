import outputView from './output.view.html';

export default {
  templateUrl: outputView,
  controller: outputController
};

outputController.$inject = ['$rootScope', 'pawMainConstants', 'pawWordService'];

/**
 * Output controller.
 *
 * @param {any} $rootScope
 * @param {any} pawMainConstants
 * @param {any} pawWordService
 */
function outputController($rootScope, pawMainConstants, pawWordService) {
  var ctrl = this;

  /**
   * Creates a listener to update data.
   */
  function createPictographListener() {
    $rootScope.$on(pawMainConstants.EVENTS.NEW_WORD_INSERTED, () => {
      ctrl.words = pawWordService.get();
      // eslint-disable-next-line
      console.log(`Existing words: ${ctrl.words}`);
    });
  }

  /**
   * Creates a listener for the pictograph event.
   */
  ctrl.$onInit = () => {
    createPictographListener();
  };
}