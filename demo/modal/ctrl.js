function ModalCtrl($scope, $nguiModal) {
  var $modal = this.$modal = $nguiModal();
  var params = $scope.obj={
    text :'dada',
    greeting : 'www'
  };


  $scope.showDialog = function() {
    $modal.showDialog({
      view : '/demo/modal/test.html',
      // scope: $scope,
      params: params
    });
  };

}
