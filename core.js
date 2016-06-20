(function () {
    'use strict';
    var app = angular.module('ngui-core', []);
    app.provider("$nguiConfig", function () {
        var baseTemplateUrl = "/ngui";

        return {
            setBaseTemplateUrl: function (url) {
                baseTemplateUrl = url;
            },
            $get: function () {
                return {
                    get baseTemplateUrl() {
                        return baseTemplateUrl;
                    }
                };
            }
        };
    });
})();
