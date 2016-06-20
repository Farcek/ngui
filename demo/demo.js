angular.module('demobs', ['ngRoute', 'ngui'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: '/demo/home/view.html'
            })
            .when('/alert', {
                templateUrl: '/demo/alert/view.html',
                controller: AlertCtrl
            })
            .when('/syspanel', {
                templateUrl: '/demo/syspanel/view.html',
                controller: SyspanelCtrl,
                controllerAs : 'SyspanelCtrl'
            })
            .when('/form', {
                templateUrl: '/demo/form/view.html',
                controller: FormCtrl
            })
            .otherwise({
                redirectTo: '/home'
            });

        //$locationProvider.html5Mode(true);
    });
;

angular.module('ngui', ['ngui-core', 'ngui-alert','ngui-syspanel','ngui-form'])
    .config(function ($nguiConfigProvider) {
        $nguiConfigProvider.setBaseTemplateUrl('/tpl-bootstrap');
    });
;