import inputView from './input.view.html';

export default {
  templateUrl: inputView,
  controller: inputController
};

inputController.$inject = [];

function inputController() {
  var ctrl = this,
    previous = '';

  ctrl.onUpdate = event => {
    console.log(event);
  };
}
