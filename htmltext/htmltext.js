(function() {
  'use strict';
  var app = angular.module('ngui-htmltext', []);

  app.directive('nguiHtmltext', [
    function () {
      return {
        restrict: 'A', //A - attribute type, E - Element || acts as directive, C - reads from component class
        require: '?ngModel',
        link: function ($scope, $element, $attrs, ngModel) {
          var ck = CKEDITOR.replace($element[0], {
            customConfig: $attrs.customConfig
          });
          $element.bind('$destroy', function() {
            CKEDITOR.instances[ck.name].destroy();
            $scope.$destroy();
          });
          ck.on('instanceReady', function() {
            ck.setData(ngModel.$viewValue);
          });
          ck.on('change', function() {
            ngModel.$setViewValue(ck.getData());
          });
          ngModel.$render = function(value) {
            ck.setData(ngModel.$modelValue);
          };
        }
      };
    }
  ]);
})();
