angular.module('demobs', ['ngRoute', 'ngui'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: '/demo/home/view.html',
                page:'home'
            })
            .when('/alert', {
                templateUrl: '/demo/alert/view.html',
                controller: AlertCtrl,
                page:'alert'
            })
            .when('/syspanel', {
                templateUrl: '/demo/syspanel/view.html',
                controller: SyspanelCtrl,
                controllerAs: 'SyspanelCtrl',
                page:'syspanel'
            })
            .when('/form', {
                templateUrl: '/demo/form/view.html',
                controller: FormCtrl,
                page:'form'
            })
            .when('/select', {
                templateUrl: '/demo/select/view.html',
                controller: SelectCtrl,
                controllerAs: 'SelectCtrl',
                page:'select'
            })
            .when('/select-one', {
                templateUrl: '/demo/select-one/view.html',
                controller: SelectOneCtrl,
                controllerAs: 'SelectOneCtrl',
                page:'select-on'
            })
            .when('/tab', {
                templateUrl: '/demo/tab/view.html',
                controller: TabCtrl,
                page:'tab'
            })
            .when('/gridview', {
                templateUrl: '/demo/gridview/view.html',
                controller: GridviewCtrl,
                page:'gridview'
            })
            .when('/paging', {
                templateUrl: '/demo/paging/view.html',
                controller: PagingCtrl,
                page:'paging'
            })
            .when('/paging/:page', {
                templateUrl: '/demo/paging/view.html',
                controller: PagingCtrl,
                page:'paging'
            })
            .when('/htmltext', {
                templateUrl: '/demo/htmltext/view.html',
                controller: HtmltextCtrl,
                page:'htmltext'
            })
            .when('/modal', {
                templateUrl: '/demo/modal/view.html',
                controller: ModalCtrl,
                page:'modal'
            })
            .when('/notify', {
                templateUrl: '/demo/notify/view.html',
                controller: NotifyCtrl,
                page:'notify'
            })
            .when('/date', {
                templateUrl: '/demo/date/view.html',
                controller: DateCtrl,
                page:'date'
            })
            .otherwise({
                redirectTo: '/home'
            });


        //$locationProvider.html5Mode(true);
    })
    .run(['$rootScope', '$route', function ($rootScope, $route) {

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.$pageName = document.title = $route.current.page;

        });


    }])
;
;

angular.module('ngui', [
    'ngui-core',
    'ngui-alert',
    'ngui-syspanel',
    'ngui-form',
    'ngui-select',
    'ngui-select-one',
    'ngui-gridview',
    'ngui-paging',
    'ngui-tab',
    'ngui-htmltext',
    'ngui-modal',
    'ngui-notify',
    'ngui-date'
])
    .config(function ($nguiConfigProvider) {
        $nguiConfigProvider.setBaseTemplateUrl('/tpl-bootstrap');

    })
    .config(function ($logProvider) {
        $logProvider.debugEnabled(true);

    });
;
