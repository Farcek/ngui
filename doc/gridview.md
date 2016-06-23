# Gridview

### install

    angular.module('myapp',['ngui-gridview']);

## using

controller.js
```javascript

    function Control($scope,$nguiGridview) {
        var $gridview = $scope.$gridview = $nguiGridview();

        $scope.load = function() {
            $http.get('/demo/gridview/data.json')
                .success(function (data) {
                    $scope.$items = data.items;
                    $scope.$total = data.total;
                    // ....
                    $scope.page = 1;
                });
        }
    }

```

view.html
```html

<table class="table" ngui-gridview="$gridview" on-change="load()" >
    <thead>
    <tr>
        <th ngui-gridview-sorting="id">Id</th>
        <th ngui-gridview-sorting="name">Name</th>
    </tr>
    <tr>
        <th ngui-gridview-filter-number="id"></th>
        <th ngui-gridview-filter-text="name"></th>
    </tr>
    </thead>

    <tbody>
    <tr ng-repeat="it in $items">
        <td>{{it.id}}</td>
        <td>{{it.name}}</td>
    </tr>
    </tbody>

    <tfoot>
    <tr>
        <td colspan="2">
            <div ngui-paging active="page" total="$total">
                <a>{{$page}}</a>
            </div>
        </td>
    </tr>
    </tfoot>
</table>

<pre>{{$gridview | json}}</pre>
```

### attr
`...`