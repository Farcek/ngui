# Paging

### install

    angular.module('myapp',['ngui-paging']);

## using

controller.js
```javascript

    function PagingCtrl($scope,$routeParams) {
        $scope.page= parseInt($routeParams.page)  || 1;
        $scope.total=315;
        $scope.limit=10;
        $scope.maxPage=10;
    }

```

view.html
```html
    <!-- sample 1 -->
    <div ngui-paging active="page" total="total" limit="limit" max-page="maxPage">
        <a href="#/paging/{{$page}}">{{$page}}</a>
    </div>

    <!-- sample 2 -->
    <div ngui-paging active="page" total="total" limit="limit" max-page="maxPage">
        <a href="javascrip:;" ng-click="$parent.page=$page">{{$page}}</a>
    </div>

```

### attr
`dsdsdsd`