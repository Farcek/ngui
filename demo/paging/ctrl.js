function PagingCtrl($scope,$routeParams) {
    console.log($routeParams)
    $scope.page= parseInt($routeParams.page)  || 1;
    $scope.total=315;
}