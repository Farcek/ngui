Use of ngui notification

1. import js files
    <script src="/ngui/notify/notify.js"></script>

2.
    angular.module("appname", [
        "ngui-notify"
    ]).run();

3. in html template  (call directive)

    <div ngui-notify></div>

    functions: 
      success('message');
      info('message');
      warning('message')
      error('message')
        
        
4. import $nguiNotify in controller
    function NotifyCtrl($scope, $nguiNotify) {
      $scope.notify = $nguiNotify;
    }
