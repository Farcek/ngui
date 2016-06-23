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
            return function (options) {
                var opts = options || {};
                var onChangeListeners = [];
                var self = {
                    sorting: {},
                    filter: {},
                    onChange: function (handle) {
                        onChangeListeners.push(handle);
                    },
                    $onChange: function () {
                        onChangeListeners.forEach(function (handle) {
                            handle(self);
                        });
                    }
                };

                return self;
            };
        }
    ]);

    nguiModule.directive('nguiGridview', ['$nguiConfig', '$nguiGridview',
        function ($nguiConfig, $nguiGridview) {
            return {
                restrict: 'A',
                scope: {
                    gridview: '=nguiGridview',
                    onChange: '&'
                },
                controller: function ($scope) {
                    var $gridview = this.$gridview = $scope.$gridview = $scope.gridview || $nguiGridview();
                    $gridview.onChange(function () {
                        if ($scope.onChange) {
                            $scope.onChange();
                        }
                    });
                }
            }

            return {
                restrict: 'A',
                terminal: true,
                replace: true,
                // scope: {
                //     gridview: '=nguiGridview'
                // },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/gridview.htm';
                },
                controller: ['$scope',
                    function ($scope) {
                        alert(5)


                        this.addColumn = function (column) {
                            $gridview.addColumn(column);
                        };
                    }
                ],
                compile: function () {
                    alert(10)
                    return {
                        pre: function () {
                            alert(11)
                            console.log('compile', arguments)
                        },
                        post: function () {
                            alert(22)
                            console.log('compile', arguments)
                        }
                    }
                },
                link: function (s, e, a, c, t) {
                    alert(22)
                    console.log('link', arguments)
                }
            };
        }
    ]);

    nguiModule.directive('nguiGridviewSorting', ['$nguiConfig',
        function ($nguiConfig) {
            return {
                restrict: 'A',
                require: '^nguiGridview',
                transclude: true,
                //replace: true,
                scope: {
                    field: '@nguiGridviewSorting'
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/gridview/title.htm';
                },
                link: function ($scope, $elem, $attrs, $ctrl, $tran) {
                    $scope.$soring = {
                        get status() {
                            return $ctrl.$gridview.sorting[$scope.field];
                        },
                        sort: function (flag) {
                            var old = $ctrl.$gridview.sorting[$scope.field];
                            if (old !== flag) {
                                $ctrl.$gridview.sorting[$scope.field] = flag;
                                $ctrl.$gridview.$onChange();
                            }
                        }
                    }
                    $elem.append($tran());
                }
            };
        }
    ]);

    nguiModule.directive('nguiGridviewFilterNumber', ['$nguiConfig',
        function ($nguiConfig) {
            return {
                restrict: 'A',
                require: '^nguiGridview',
                scope: {
                    field: '@nguiGridviewFilterNumber'
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/gridview/filter-number.htm';
                },
                link: function ($scope, $elem, $attrs, $ctrl, $tran) {
                    $scope.$filter = {
                        get query() {
                            return $ctrl.$gridview.filter[$scope.field];
                        },
                        set query(value) {
                            var old = $ctrl.$gridview.filter[$scope.field];
                            if (old !== value) {
                                $ctrl.$gridview.filter[$scope.field] = value;
                                $ctrl.$gridview.$onChange();
                            }
                        }
                    };
                }
            };
        }
    ]);

    nguiModule.directive('nguiGridviewFilterText', ['$nguiConfig',
        function ($nguiConfig) {
            return {
                restrict: 'A',
                require: '^nguiGridview',
                scope: {
                    field: '@nguiGridviewFilterText'
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/gridview/filter-text.htm';
                },
                link: function ($scope, $elem, $attrs, $ctrl, $tran) {
                    $scope.$filter = {
                        get query() {
                            return $ctrl.$gridview.filter[$scope.field];
                        },
                        set query(value) {
                            var old = $ctrl.$gridview.filter[$scope.field];
                            if (old !== value) {
                                $ctrl.$gridview.filter[$scope.field] = value;
                                $ctrl.$gridview.$onChange();
                            }
                        }
                    };
                }
            };
        }
    ]);


})();