import pictogramView from './pictogram.view.html';

export default {
  templateUrl: pictogramView,
  bindings: {
    word: '='
  },
  controller: pictogramController
};

pictogramController.$inject = ['pawPictogramService', 'pawConfigService'];

/**
 * Pictograms controller.
 *
 * @param {any} pawPictogramService
 * @param {any} pawConfigService
 */
function pictogramController(pawPictogramService, pawConfigService) {
  var ctrl = this;
  var availablePictograms;
  var selectedIndex = 0;

  /**
   * Obtains pictograms from the API.
   *
   * @param {string} term Term to find pictograms.
   * @returns {Array.<Object>} Array of pictograms.
   */
  function getPictograms(term) {
    let standarizeTerm = term.replace(/[\.,]/g, '').toLocaleLowerCase();
    return pawPictogramService.get(standarizeTerm)
      .then(pictograms => {
        availablePictograms = pictograms;
        ctrl.hasMore = availablePictograms.length > 1;
        return availablePictograms;
      });
  }

  /**
   * Obtains selected pictogram.
   *
   * @param {Array.<Object>} pictograms Pictograms returned by the API.
   * @returns {Object} Selected pictogram.
   */
  function getSelectedPictogram(pictograms) {
    return pictograms[selectedIndex];
  }

  /**
   * Loads pictogram information into scope.
   *
   * @param {any} selectedPictogram
   */
  function loadPictogram(selectedPictogram) {
    // eslint-disable-next-line
    console.log(`Loaded pictogram ${selectedPictogram}`);

    if (selectedPictogram) {
      if (selectedPictogram.image) {
        ctrl.imageUrl = selectedPictogram.image.url;
      }

      if (selectedPictogram.type) {
        ctrl.typeClass = `paw-pictogram__${selectedPictogram.type.code}`;
      }
    }
  }

  /**
   * Changes pictogram when it is clicked.
   */
  ctrl.onChangePictogram = () => {
    selectedIndex = availablePictograms.length - 1 === selectedIndex ?
      0 : selectedIndex + 1;
    loadPictogram(getSelectedPictogram(availablePictograms));
  };

  /**
   * Updates pictogram information when the word is changed.
   */
  ctrl.$onChanges = () => {
    ctrl.term = ctrl.word.replace(/\"/g, '');

    getPictograms(ctrl.term)
      .then(pictograms => getSelectedPictogram(pictograms))
      .then(selectedPictogram => loadPictogram(selectedPictogram));
  };

  /**
   * Checks if border is active.
   */
  ctrl.isBorderActive = pawConfigService.getBorderActive;

  /**
   * Checks if word is active.
   */
  ctrl.isWordActive = pawConfigService.getWordActive;
}
