(function () {
    'use strict';
    /* global angular */
    var auth = angular.module('ngui-auth', ['ngCookies']);
    auth.run(['$rootScope', '$state', '$authService', '$authConfig',
        function ($rootScope, $state, $authService, $authConfig) {

            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

                var to = $state.get(toState.name);

                if (toState.secret && !$authService.token) {

                    $rootScope.$returnToState = [toState, toParams];

                    $state.transitionTo($authConfig.loginState);
                    event.preventDefault();
                }
            });
        }
    ]);

    auth.provider("$authConfig", function () {
        var loginState = 'login', homeState = 'home', cookieName = '$cid';
        return {
            setLoginState: function (value) {
                loginState = value;
            },
            setHomeState: function (value) {
                homeState = value;
            },
            setCookieName: function (value) {
                cookieName = value;
            },
            $get: function () {
                return {
                    get loginState() {
                        return loginState;
                    },
                    get homeState() {
                        return homeState;
                    },
                    get cookieName() {
                        return cookieName;
                    }
                };
            }
        };
    });

    auth.factory('$authService', ['$rootScope', '$state', '$authConfig', '$cookies',
        function ($rootScope, $state, $authConfig, $cookies) {


            var cnToken = $authConfig.cookieName;
            var _token = $cookies.get(cnToken),_data;

            return {
                get data() {
                    return _token ? _data : null;
                },
                get token() {
                    return _token;
                },
                setData: function (data) {
                    _data = data;
                },
                setToken: function (token) {
                    $cookies.put(cnToken, _token = token);
                },
                clear: function () {
                    _token = null;
                    _data = null;
                    $cookies.remove(cnToken);
                },
                returnToState: function (state) {
                    if (Array.isArray(state) && state.length > 0) {
                        $state.go(state[0], state.length > 1 ? state[1] : null);
                    } else if (Array.isArray($rootScope.$returnToState) && $rootScope.$returnToState.length > 0) {
                        var to = $rootScope.$returnToState[0];
                        var params = $rootScope.$returnToState.length > 1 ? $rootScope.$returnToState[1] : null;
                        $state.go(to, params);
                    } else {
                        $state.go($authConfig.homeState);
                    }
                }
            };
        }
    ]);
})();