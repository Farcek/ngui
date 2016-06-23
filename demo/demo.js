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
                controllerAs: 'SyspanelCtrl'
            })
            .when('/form', {
                templateUrl: '/demo/form/view.html',
                controller: FormCtrl
            })
            .when('/select', {
                templateUrl: '/demo/select/view.html',
                controller: SelectCtrl,
                controllerAs : 'SelectCtrl'
            })
            .when('/tab', {
                templateUrl: '/demo/tab/view.html',
                controller: TabCtrl
            })
            .when('/gridview', {
                templateUrl: '/demo/gridview/view.html',
                controller: GridviewCtrl
            })
            .when('/paging', {
                templateUrl: '/demo/paging/view.html',
                controller: PagingCtrl
            })
            .when('/paging/:page', {
                templateUrl: '/demo/paging/view.html',
                controller: PagingCtrl
            })
            .when('/htmltext', {
                templateUrl: '/demo/htmltext/view.html',
                controller: HtmltextCtrl
            })
            .when('/modal', {
                templateUrl: '/demo/modal/view.html',
                controller: ModalCtrl
            })
            .otherwise({
                redirectTo: '/home'
            });

        //$locationProvider.html5Mode(true);
    });

angular.module('ngui', [
    'ngui-core',
    'ngui-alert',
    'ngui-syspanel',
    'ngui-form',
    'ngui-select',
    'ngui-gridview',
    'ngui-paging',
    'ngui-tab',
    'ngui-htmltext',
    'ngui-modal'
])
    .config(function ($nguiConfigProvider) {
        $nguiConfigProvider.setBaseTemplateUrl('/tpl-bootstrap');

    })
    .config(function ($logProvider) {
        $logProvider.debugEnabled(true);

    });
