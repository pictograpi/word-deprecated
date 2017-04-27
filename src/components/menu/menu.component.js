import menuView from './menu.view.html';
import angular from 'angular';

export default {
  templateUrl: menuView,
  controller: menuController
};

menuController.$inject = ['$window', '$rootScope', 'pawMainConstants'];

/**
 * Menu controller.
 *
 * @param {any} $window
 * @param {any} $rootScope
 * @param {any} pawMainConstants
 */
function menuController($window, $rootScope, pawMainConstants) {
  var ctrl = this;

  /**
   * Callback executed to print the page.
   */
  ctrl.onPrint = () => {
    // Remove output scroll.
    $window.document.getElementsByClassName(
      'paw-main--output')[0].scrollTop = 0;
    $window.print();
  };

  /**
   * Callback executed when chain is clicked.
   */
  ctrl.onChain = () => {
    $rootScope.$emit(pawMainConstants.EVENTS.EDITOR_ON_CHAIN);
  };
}
