import menuView from './menu.view.html';
import angular from 'angular';

export default {
  templateUrl: menuView,
  controller: menuController
};

menuController.$inject = ['$window'];

/**
 * Menu controller.
 *
 * @param {any} $window
 */
function menuController($window) {
  var ctrl = this;

  /**
   * Callback executed to print the page.
   */
  ctrl.onPrint = () => {
    // Remove output scroll.
    document.getElementsByClassName('paw-main--output')[0].scrollTop = 0;
    $window.print();
  };
}
