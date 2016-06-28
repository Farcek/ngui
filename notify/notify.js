(function () {
    'use strict';
    var app = angular.module('ngui-notify', []);

    app.factory('$nguiNotify', ['$timeout',
        function ($timeout) {

                var notifications = {}, index=0;

                var push = function(type,message){

                      index++;
                      var item = notifications[index] = {
                          type : type,
                          message : message,
                          index : index
                      };

                      item.timer = $timeout(function(){
                          delete notifications[item.index];
                      }, 5000);

                },

                self = {
                      success: function (message) {
                          push('success', message);
                      },
                      info: function (message) {
                          push('info', message);
                      },
                      error: function (message) {
                          push('danger', message);
                      },
                      warning: function (message) {
                          push('warning', message);
                      },

                      close: function (item) {
                          $timeout.cancel(item.timer);
                          delete notifications[item.index];
                      },

                      get notifications(){
                          return notifications;
                      }
                };

                return self;
        }
    ]);

    app.directive('nguiNotify', ['$nguiConfig', '$nguiNotify',
        function ($nguiConfig, $nguiNotify) {

              return {
                    restrict: 'A',
                    templateUrl: function (elem, attrs) {
                        return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/notify/notify.htm';
                    },
                    link: function(scope, lmt, attr){
                        scope.$nguiNotify = $nguiNotify;
                    }
              };

        }
    ]);

})();
