# Tab
### install

    angular.module('myapp',['ngui-tab']);



### Basic usage
    <div ngui-tab>
        <div ngui-tab-panel="tab1" data-title="tab1">
            tab1 ...
        </div>
        <div ngui-tab-panel="tab2" data-title="tab2" active="true">
            tab 2 ...
        </div>
        <div ngui-tab-panel="tab3" data-title="tab3" >
            tab3 ...
        </div>
    </div>


### more

controller.js

    function TabCtrl($scope, $nguiTab) {
        var $tab = $scope.$tab = $nguiTab();  <-- tab mabager

        $tab.select('tab3');
    }

view.html

    <div ngui-tab="$tab">
        <div ngui-tab-panel="tab1" data-title="tab1" active="true">
            tab1 ...
        </div>
        <div ngui-tab-panel="tab2" data-title="tab2">
            tab2 ...
        </div>
        <div ngui-tab-panel="tab3" data-title="tab3" >
            tab3 ...
        </div>
    </div>
    
### Tab attr

| name     |   type    | required |                       |
|:--------:|:---------:|:--------:|----------------------:|
| ngui-tab | $nguiTab  |   -      | tab manager           |



### Tab attr

| name           | type | required |                       |
|:--------------:|:----:|:--------:|----------------------:|
| ngui-tab-panel | @    |   +      | tab name              |
| title          | @    |   -      | panel tile            |
| title-var      | @    |   -      | panel title var       |
| active         | =    |   -      | default selection tab |