import pictogramView from './pictogram.view.html';
import base64Img from 'base64-img';

export default {
  templateUrl: pictogramView,
  bindings: {
    word: '='
  },
  controller: pictogramController
};

pictogramController.$inject = ['$rootScope', 'pawPictogramService',
  'pawConfigService'
];

/**
 * Pictograms controller.
 *
 * @param {any} $rootScope
 * @param {any} pawPictogramService
 * @param {any} pawConfigService
 */
function pictogramController($rootScope, pawPictogramService,
  pawConfigService) {
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
    let standarizeTerm = term.replace(/[\.,\¿\?\¡!]/g, '').toLocaleLowerCase();

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
        base64Img.requestBase64(selectedPictogram.image.url,
          (err, res, body) => {
            if (!err) {
              $rootScope.$evalAsync(() => ctrl.imageUrl = body);
            }
          }
        );
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

    ctrl.isLoading = true;

    getPictograms(ctrl.term)
      .then(pictograms => getSelectedPictogram(pictograms))
      .then(selectedPictogram => loadPictogram(selectedPictogram))
      .finally(() => ctrl.isLoading = false);
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