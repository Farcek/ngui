(function () {
    'use strict';
    /* global angular */
    var app = angular.module('ngui-alert', []);


    app.factory('$nguiAlert', ['$timeout',
        function ($timeout) {
            return function (options) {
                options = options || {};
                var _msg = {}, self;

                return (self = {
                    show: function (params) {

                        _msg.message = params.message || params;
                        _msg.type = params.type;
                        _msg.icon = params.icon;
                        if (params.timeout) {
                            $timeout(function () {
                                self.hide();
                            }, params.timeout * 1000);
                        }


                        _msg.showing = true;
                    },
                    hide: function () {
                        _msg.showing = false;
                    },
                    get showing() {
                        return _msg.showing;
                    },
                    get type() {
                        return _msg.type || options.type || 'info';
                    },
                    get icon() {
                        return _msg.icon || options.icon;
                    },
                    get message() {
                        return _msg.message;
                    }
                });
            };
        }
    ]);

    app.directive('nguiAlert', [
        function () {
            return {
                restrict: 'A',
                scope: {
                    $alert: '=nguiAlert'
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || '/ngui/alert/alert.htm';
                }
            };
        }
    ]);
})();