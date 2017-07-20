import shareView from './share.view.html';
import html2canvas from 'html2canvas';
import angular from 'angular';
import downloadJs from 'downloadjs';

export default {
  templateUrl: shareView,
  controller: shareController
};

shareController.$inject = ['$rootScope', 'pawMainConstants'];

/**
 * Share controller
 *
 * @param {any} $rootScope
 * @param {any} pawMainConstants
 */
function shareController($rootScope, pawMainConstants) {
  let ctrl = this,
    bodyElement = angular.element(document.getElementsByTagName('body')[0]);

  /**
   * Creates an image to share it.
   */
  function onShare() {
    ctrl.isVisible = true;

    bodyElement.addClass('page__shared');

    ctrl.imageSrc = 'http://cdn.pictograpi.com/loading.svg';

    html2canvas(document.getElementsByClassName('paw-output')[0])
      .then(canvas => {
        $rootScope.$evalAsync(() => {
          bodyElement.removeClass('page__shared');
          ctrl.imageSrc = canvas.toDataURL('image/png');
        });
      });
  }

  /**
   * Downloads the file to the computer.
   */
  ctrl.onDownload = () => {
    downloadJs(ctrl.imageSrc, `pictograpi-word-image-${Date.now()}.png`,
      'image/png');
  };

  /**
   * Hides the login form.
   */
  ctrl.onHide = () => {
    ctrl.isVisible = false;
    ctrl.isError = false;
    ctrl.imageSrc = undefined;
  };

  /**
   * Inits the controller.
   */
  ctrl.$onInit = () => {
    $rootScope.$on(pawMainConstants.EVENTS.SHARE, onShare);
  };
}
