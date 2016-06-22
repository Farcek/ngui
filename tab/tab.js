/**
 * Created by Farcek on 6/17/2016.
 */

(function () {
    'use strict';
    /* global angular */
    var nguiModule = angular.module('ngui-tab', []);


    nguiModule.directive('nguiTab', ['$nguiConfig', '$nguiTab',
        function ($nguiConfig, $nguiTab) {
            return {
                restrict: 'A',
                transclude: true,
                replace: true,
                scope: {
                    tab: '=nguiTab'
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/tab/tab.htm';
                },
                controller: function ($scope) {
                    var $tab = $scope.$tab = $scope.tab || $nguiTab();

                    var first = false;

                    this.addPanel = function (panel) {
                        if (first === false) {
                            first = panel.name;
                        }
                        $tab.addPanel(panel);
                    };
                }
            };
        }
    ]);

    nguiModule.directive('nguiTabPanel', ['$nguiConfig',
        function ($nguiConfig) {
            return {
                restrict: 'A',
                transclude: true,
                replace: true,
                require: '^nguiTab',
                scope: {
                    name: '@nguiTabPanel',
                    title: '@', titleVar: '=',
                    active: '@', activeVar: '='
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/tab/tab-panel.htm';
                },
                link: function ($scope, $elem, attr, $tab) {
                    if (!$scope.name) {
                        throw new TypeError("required TabPanel name");
                    }
                    var $panel = $scope.$panel = {
                        get name() {
                            return $scope.name;
                        },
                        get title() {
                            return $scope.titleVar || $scope.title || $scope.name;
                        },
                        get selected() {
                            return 'selected' in $scope ? $scope.selected : !!$scope.activeVar || !!$scope.active;
                        },
                        setSelected: function (flag) {
                            $scope.selected = flag;
                        }
                    };
                    $tab.addPanel($panel);
                }
            };
        }
    ]);

    nguiModule.factory('$nguiTab', [
        function () {
            return function () {
                var panels = {};
                return {
                    get panels() {
                        return panels;
                    },
                    select: function (name) {
                        angular.forEach(panels, function (it, n) {
                            if (name === n) {
                                it.setSelected(true);
                            } else {
                                it.setSelected(false);
                            }
                        });
                    },
                    get selected() {
                        var selected;
                        angular.forEach(panels, function (it, n) {
                            if (it.selected) {
                                selected = it.name;
                                return false;
                            }
                        });
                        return selected;
                    },
                    addPanel: function (panel) {
                        panels[panel.name] = panel;
                    }
                };
            };
        }
    ]);

})();