/**
 * Created by Administrator on 6/17/2016.
 */

(function () {
    'use strict';
    /* global angular */
    var app = angular.module('ngui-form', ['ngMessages']);
    app.directive('nguiFormField', ['$nguiConfig', '$nguiFormConfig',
        function ($nguiConfig, $nguiFormConfig) {
            return {
                require: ['^form'],
                restrict: 'A',
                replace: true,
                transclude: true,
                scope: {
                    field: '=nguiFormField',
                    label: "@", labelVar: "="
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/form/field.htm';
                },
                link: function ($scope, $element, $attrs, controllersArr) {
                    var frm = controllersArr[0];
                    $scope.$data = {
                        get label() {
                            return $scope.labelVar || $scope.label;
                        },
                        get field() {
                            return $scope.field;
                        },
                        get showError() {
                            var $field = $scope.field;
                            return $field && $field.$invalid && ($field.$touched || frm.$submitted);
                        },
                        get errorMessages() {
                            return $nguiFormConfig.messages;
                        },
                    };


                }

            };
        }
    ]);

    app.provider("$nguiFormConfig", function () {
        var _messages = {
            required: 'Please enter a value for this field',
            email: 'This field must be a valid email address.',
            maxlength: 'This field can be at most 15 characters long.'
        };

        return {
            put: function (key, message) {
                _messages[key] = message;
            },

            $get: function () {
                return {
                    get messages() {
                        return _messages;
                    }
                };
            }
        };
    });


})();