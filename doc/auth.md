# Auth
angular sample auth secret service



### app-secret.js    
    angular.module("app-secret", [])
    
        // secret && auth
        .config(['$authConfigProvider',
            function ($authConfigProvider) {
                $authConfigProvider.setLoginState('login');
                $authConfigProvider.setHomeState('home');
                
                //$authConfigProvider.setCookieName('$cid');
                //$authConfigProvider.setHeaderName('authorization');
                //$authConfigProvider.setHeaderPrefix('Bearer');
            }
        ])
        .directive('userInfo', ['$authService', '$state', '$authConfig',
            function ($authService, $state, $authConfig) {
                return {
                    restrict: 'A',
                    templateUrl: '/foo/baa/user-info.htm',
                    link: function (scope, el) {
                        scope.auth = $authService;
                        scope.logout = function () {
                            $authService.clear();
                            $state.go($authConfig.homeState);
                        };
                    }
                };
            }
        ])
        .run(['$http', '$authService',
            function ($http, $authService) {
                if ($authService.token) {
                    // user info resolve from token
                    
                    $http.post('/api/login/resolve', {
                        token: $authService.token
                    })
                        .success(function (resp) {
                            $authService.setData(resp);
                        });
                }
            }
        ])
    ;


### /foo/baa/user-info.htm

    <div ng-if="auth.data">
        customer :<a href="javascript:;">{{auth.data.customerName}}</a>
        user:<a href="javascript:;" >{{auth.data.username}}</a>
        <a href="javascript:;" ng-click="logout()" >logout</a>
    </div>
    <div ng-if="!auth.data">
        <a ui-sref="login">login</a>
    </div>
    
    
    
### page route

    angular.module("my-app", [])
        
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    
                    .state('home', {
                        url: "/home",
                        templateUrl: '....'
                    })
                    .state('user-profile', { // <---------- secret
                        url: "/user-profile",
                        secret: true,
                        templateUrl: '....'
                    })
                    .state('login', {       // <----------- login
                        url: "/login",
                        secret: true,
                        templateUrl: '....'
                    })
            }
        ]);

