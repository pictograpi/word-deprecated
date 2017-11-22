import pictographView from './pictograph.view.html';
import base64Img from 'base64-img';

export default {
  templateUrl: pictographView,
  bindings: {
    word: '='
  },
  controller: pictographController
};

pictographController.$inject = ['$rootScope', 'pawPictographService',
  'pawConfigService'
];

/**
 * Pictographs controller.
 *
 * @param {any} $rootScope
 * @param {any} pawPictographService
 * @param {any} pawConfigService
 */
function pictographController($rootScope, pawPictographService,
  pawConfigService) {
  var ctrl = this;
  var availablePictographs;
  var selectedIndex = 0;

  /**
   * Obtains pictographs from the API.
   *
   * @param {string} term Term to find pictographs.
   * @returns {Array.<Object>} Array of pictographs.
   */
  function getPictographs(term) {
    let standarizeTerm = term.replace(/[\.,\¿\?\¡!]/g, '').toLocaleLowerCase();

    return pawPictographService.get(standarizeTerm)
      .then(pictographs => {
        availablePictographs = pictographs;
        ctrl.hasMore = availablePictographs.length > 1;
        return availablePictographs;
      });
  }

  /**
   * Obtains selected pictograph.
   *
   * @param {Array.<Object>} pictographs Pictographs returned by the API.
   * @returns {Object} Selected pictograph.
   */
  function getSelectedPictograph(pictographs) {
    return pictographs[selectedIndex];
  }

  /**
   * Loads pictograph information into scope.
   *
   * @param {any} selectedPictograph
   */
  function loadPictograph(selectedPictograph) {
    // eslint-disable-next-line
    console.log(`Loaded pictograph ${selectedPictograph}`);

    if (selectedPictograph) {
      if (selectedPictograph.image) {
        base64Img.requestBase64(selectedPictograph.image.url,
          (err, res, body) => {
            if (!err) {
              $rootScope.$evalAsync(() => ctrl.imageUrl = body);
            }
          }
        );
      }

      if (selectedPictograph.type) {
        ctrl.typeClass = `paw-pictograph__${selectedPictograph.type.code}`;
      }
    }
  }

  /**
   * Changes pictograph when it is clicked.
   */
  ctrl.onChangePictograph = () => {
    selectedIndex = availablePictographs.length - 1 === selectedIndex ?
      0 : selectedIndex + 1;
    loadPictograph(getSelectedPictograph(availablePictographs));
  };

  /**
   * Updates pictograph information when the word is changed.
   */
  ctrl.$onChanges = () => {
    ctrl.term = ctrl.word.replace(/\"/g, '');

    ctrl.isLoading = true;

    getPictographs(ctrl.term)
      .then(pictographs => getSelectedPictograph(pictographs))
      .then(selectedPictograph => loadPictograph(selectedPictograph))
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