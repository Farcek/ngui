function GridviewCtrl($scope, $nguiGridview, $http) {
    $scope.$gridview = $nguiGridview({
        
    });

    $scope.page = 1;

    $scope.load = function () {
        console.log('data load')
        $http.get('/demo/gridview/data.json')
            .success(function (data) {
                $scope.$items = data.items;
                $scope.$total = data.total;
            });
    };

    $scope.load();
}