function FormCtrl($scope, $nguiAlert) {
    $scope.mdl = {
        name : 'farcek',
        age : 32
    };

    $scope.submit = function () {
      console.log($scope.mdl);
    };
}