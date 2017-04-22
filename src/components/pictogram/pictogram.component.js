import pictogramView from './pictogram.view.html';

export default {
  templateUrl: pictogramView,
  bindings: {
    word: '='
  },
  controller: pictogramController
};

pictogramController.$inject = ['pawPictogramService']

/**
 * Pictograms controller.
 *
 * @param {any} pawPictogramService
 */
function pictogramController(pawPictogramService) {
  var ctrl = this;

  /**
   * Obtains pictograms from the API.
   *
   * @param {string} term Term to find pictograms.
   * @returns {Array.<Object>} Array of pictograms.
   */
  function getPictograms(term) {
    return pawPictogramService.get(term);
  }

  /**
   * Obtains selected pictogram.
   *
   * @param {Array.<Object>} pictograms Pictograms returned by the API.
   * @returns {Object} Selected pictogram.
   */
  function getSelectedPictogram(pictograms) {
    return pictograms[0];
  }

  /**
   * Loads pictogram information into scope.
   *
   * @param {any} selectedPictogram
   */
  function loadPictogram(selectedPictogram) {
    console.log(`Loaded pictogram ${selectedPictogram}`);

    if (selectedPictogram) {
      ctrl.term = selectedPictogram.term;

      if (selectedPictogram.image) {
        ctrl.imageUrl = selectedPictogram.image.url;
      }

      if (selectedPictogram.type) {
        ctrl.typeClass =`paw-pictogram__${selectedPictogram.type.code}`;
      }
    }
  }

  /**
   * Updates pictogram information when the word is changed.
   */
  ctrl.$onChanges = () => {
    ctrl.term = ctrl.word;

    getPictograms(ctrl.term)
      .then(pictograms => getSelectedPictogram(pictograms))
      .then(selectedPictogram => loadPictogram(selectedPictogram));
  };
}
