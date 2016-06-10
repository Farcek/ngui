Use of ngui date picker
1. import js files
    <script src="/bower_components/ngui/core.js"></script>
    <script src="/bower_components/ngui/date/date.js"></script>

2.
    angular.module("appname", [
        "ngui-date"
    ]).run();

3. initialize with config /init.js/

    .config(['$nguiConfigProvider',
            function ($nguiConfigProvider) {
              $nguiConfigProvider.setBaseTemplateUrl('/bower_components/ngui');
            }
    ])


3. in html template 

    <div ng-controller="MainCtrl as ctrl">
      <div ngui-date ng-model="ctrl.mydate" max-date="2017-09-09" min-date="2010-06-09" start-year="" end-year="" required></div>
      <div class="row">
        <div class="columns medium-4">
          <input type="date" ng-model= "ctrl.mydate" min="2016-06-09">
          Date of birth: <b> {{ctrl.mydate | date : 'yyyy-MM-dd'}} </b>
        </div>
      </div>
    </div>

