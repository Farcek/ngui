function FormCtrl($scope, $nguiAlert) {
    $scope.mdl = {
        name : 'farcek',
        age : 32
    };

    $scope.labelAge = "Age frpm ctrl"

    $scope.submit = function () {
      console.log($scope.mdl);
    };
}