/**
 * Created by Administrator on 6/20/2016.
 */
/**
 * Created by Administrator on 6/17/2016.
 */

(function () {
    'use strict';
    /* global angular */
    var nguiModule = angular.module('ngui-gridview', []);


    nguiModule.factory('$nguiGridview', ['$nguiConfig',
        function ($nguiConfig) {
            return function () {
                var columns = {};
                return {
                    addColumn: function (column) {
                        columns[column.name] = column;
                    }
                };
            };
        }
    ]);

    nguiModule.directive('nguiGridview', ['$nguiConfig', '$nguiGridview',
        function ($nguiConfig, $nguiGridview) {
            return {
                restrict: 'A',

                replace: true,
                scope: {
                    gridview: '=nguiGridview'
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/gridview.htm';
                },
                controller: ['$scope',
                    function ($scope) {
                        var $gridview = $scope.$gridview = $scope.gridview || $nguiGridview();

                        this.addColumn = function (column) {
                            $gridview.addColumn(column);
                        };
                    }
                ]
            };
        }
    ]);

    nguiModule.directive('nguiGridviewColumn', ['$nguiConfig', '$nguiGridview',
        function ($nguiConfig, $nguiGridview) {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    gridview: '=nguiGridview'
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/gridview.htm';
                },
                controller: ['$scope',
                    function ($scope) {
                        var $gridview = $scope.$gridview = $scope.gridview || $nguiGridview();

                        this.addColumn = function (column) {
                            $gridview.addColumn(column);
                        };
                    }
                ]
            };
        }
    ]);


})();