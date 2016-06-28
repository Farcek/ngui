(function() {
  'use strict';
  var app = angular.module('ngui-modal', []);

  app.factory('$nguiModal', ['$compile','$http','$rootScope', '$document',
    function($compile,$http, $rootScope,$document) {
    return function(config) {
      config = config || {};

      self = {
        showDialog: function(params) {
          $http.get(params.view)
            .then(function(resp) {
              if(resp.status == 200) {
                var html = resp.data;
                var $scope = (params.scope || $rootScope).$new();
                $scope.$modal = {
                  close : function() {
                    $scope.$destroy();
                    content.remove();
                  }
                };
                $scope.$params = params.params;

                var content= $compile(html)($scope);
                angular.element($document[0].body).append(content);
              }
            });
        }
      };
      return self;
    };
  }
  ]);

  app.directive('nguiModal', ['$nguiConfig',
    function($nguiConfig) {
      return {
        restrict: 'A',
        link: function($scope, $elem, $attrs, ctrl) {
          $elem.css({display: 'block'});
        }
      };
    }
  ]);
  // app.provider("$nguiModalConfig", function () {
  //   var active = 'AActive';
  //   return {
  //     $get: function() {
  //       return {
  //         get active() {
  //           return active;
  //         }
  //       };
  //     }
  //   };
  // });

})();
