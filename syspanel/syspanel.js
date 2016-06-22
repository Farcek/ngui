/**
 * Created by Administrator on 6/17/2016.
 */

(function () {
    'use strict';
    /* global angular */
    var app = angular.module('ngui-syspanel', []);


    app.directive('nguiSyspanel', ['$nguiConfig',
        function ($nguiConfig) {
            return {
                restrict: 'A',
                transclude: {
                    'header': 'panelHeader',
                    'menu': 'panelMenu',
                    'body': 'panelBody'
                },
                scope: {
                    open: '=menuOpen',
                    title: '@', titleVar: '='
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/syspanel.htm';
                },
                link: function ($scope, $ele) {
                    $ele.addClass('syspanel');
                    $scope.$watch('open', function (open) {
                        if (!open) {
                            $ele.addClass('closed-menu');
                        } else {
                            $ele.removeClass('closed-menu');
                        }
                    });
                    $scope.$data = {
                        get title() {
                            return $scope.titleVar || $scope.title;
                        }
                    };
                }
            };
        }
    ]);

    // app.directive('nguiSyspanelMenu', ['$nguiConfig',
    //     function ($nguiConfig) {
    //         return {
    //             restrict: 'A',
    //             scope: {},
    //             template: 'menu ------------------ menu'
    //         };
    //     }
    // ]);
    //
    // app.directive('nguiSyspanelBody', ['$nguiConfig',
    //     function ($nguiConfig) {
    //         return {
    //             restrict: 'A',
    //             scope: {},
    //             template: 'salaam ------------------ salaam'
    //         };
    //     }
    // ]);


})();