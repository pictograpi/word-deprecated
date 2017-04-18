module.exports = {
  templateUrl: require('./input.view.html'),
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
