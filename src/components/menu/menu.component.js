import menuView from './menu.view.html';

export default {
  templateUrl: menuView,
  controller: menuController
};

menuController.$inject = ['$window', '$rootScope', 'pawMainConstants',
  'pawConfigService'
];

/**
 * Menu controller.
 *
 * @param {any} $window
 * @param {any} $rootScope
 * @param {any} pawMainConstants
 * @param {any} pawConfigService
 */
function menuController($window, $rootScope, pawMainConstants,
  pawConfigService) {
  var ctrl = this,
    EVENTS = pawMainConstants.EVENTS;

  /**
   * Prints the page.
   */
  ctrl.onPrint = () => {
    // Remove output scroll.
    $window.document.getElementsByClassName(
      'paw-main--output')[0].scrollTop = 0;
    $window.print();
  };

  /**
   * Chains words.
   */
  ctrl.onChain = () => {
    $rootScope.$emit(EVENTS.EDITOR_ON_CHAIN);
  };

  ctrl.onExport = () => {
    $rootScope.$emit(EVENTS.SHARE);
  };

  /**
   * Toggles pictogram borders.
   */
  ctrl.onToggleBorder = pawConfigService.toggleBorder;

  /**
   * Toggles word.
   */
  ctrl.onToggleWord = pawConfigService.toggleWord;

  /**
   * Checks if border is active.
   */
  ctrl.isBorderActive = pawConfigService.getBorderActive;

  /**
   * Checks if word is active.
   */
  ctrl.isWordActive = pawConfigService.getWordActive;
}
