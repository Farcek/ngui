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
                    'menu': 'panelMenu',
                    'body': 'panelBody'
                },
                scope: {
                    open : '=menuOpen'
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/syspanel.htm';
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