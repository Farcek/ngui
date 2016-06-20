/**
 * Created by Administrator on 6/17/2016.
 */

(function () {
    'use strict';
    /* global angular */
    var app = angular.module('ngui-form', ['ngMessages']);


    app.directive('nguiForm', ['$nguiConfig',
        function ($nguiConfig) {


            return {
                restrict: 'A',
                transclude: true,
                require: '^form',
                scope: {},
                template: '<div ng-transclude></div>',
                controller: function ($scope) {

                },
                link: function (scope, element, attrs, formCtrl) {
                    //scope.$setFrm(formCtrl);
                }
            };
        }
    ]);

    app.directive('nguiFormText', ['$nguiConfig', '$nguiFormConfig',
        function ($nguiConfig, $nguiFormConfig) {
            return {
                require: ['^nguiForm', '^form', '^ngModel'],
                restrict: 'A',
                scope: true,
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/form/text.htm';
                },
                link: function ($scope, $element, $attrs, controllersArr) {
                    var nguiFrm = controllersArr[0];
                    var frm = controllersArr[1];
                    var model = controllersArr[2];


                    $scope.data = {
                        get label() {
                            return $attrs.label;
                        },
                        get name() {
                            return $attrs.nguiFormText;
                        },
                        get required() {
                            return 'rq' in $attrs;
                        },
                        get $model() {
                            return this.$frm[this.name];
                        },
                        get $frm() {
                            return frm;
                        },
                        get $nguiFrm() {
                            return nguiFrm;
                        },
                        get showError() {
                            var $model = this.$model;
                            return $model && $model.$invalid && ($model.$touched || frm.$submitted);
                        },

                        get errorMessages() {
                            return $nguiFormConfig.messages;
                        },

                        get model() {
                            return model.$modelValue;
                        },
                        set model(value) {
                            model.$setViewValue(value);
                        }
                    };

                }

            };
        }
    ]);
    app.directive('nguiFormField', ['$nguiConfig', '$nguiFormConfig',
        function ($nguiConfig, $nguiFormConfig) {
            return {
                require: ['^form'],
                restrict: 'A',
                transclude: true,
                scope: {
                    field: '=nguiFormField',
                    label: "@",
                    labelVar: "="
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/form/field.htm';
                },
                link: function ($scope, $element, $attrs, controllersArr,transclude) {
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