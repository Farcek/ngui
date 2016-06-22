function FormCtrl($scope, $nguiAlert) {
    $scope.mdl = {
        name : 'farcek',
        age : 32,
        longtext: 'Hello it`s about me',
        justtext: 'me'
    };

    $scope.labelAge = "Age frpm ctrl"

    $scope.submit = function () {
      console.log($scope.mdl);
    };
}
