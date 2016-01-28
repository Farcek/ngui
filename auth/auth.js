(function () {
    'use strict';
    /* global angular */
    var auth = angular.module('ngui-auth', ['ngCookies']);
    auth.run(['$rootScope', '$state', '$authService', '$authConfig',
        function ($rootScope, $state, $authService, $authConfig) {

            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

                var to = $state.get(toState.name);

                if (toState.secret && !$authService.isAuthenticated) {

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
            var _user;

            var cnToken = $authConfig.cookieName;
            var cnTokenObj = $authConfig.cookieName + '_obj';

            var cookieObj = $cookies.getObject(cnTokenObj);
            if (cookieObj) {
                _user = cookieObj;
            }

            return {
                get isAuthenticated() {
                    return !!_user;
                },
                get token() {
                    return _user && _user.token;
                },
                get user() {
                    return _user;
                },
                setAuth: function (options) {
                    if (options && options.username && options.userid && options.token) {
                        _user = {
                            userid: options.userid,
                            username: options.username,
                            token: options.token
                        };


                        if ('custom' in options) {
                            _user.custom = options.custom;
                        }

                        $cookies.putObject(cnTokenObj, _user);
                        $cookies.put(cnToken, _user.token);
                    }
                },
                clearAuth: function () {
                    $cookies.remove(cnToken);
                    $cookies.remove(cnTokenObj);
                    _user = false;
                    $state.go($authConfig.homeState);
                },
                returnToState: function (state) {
                    if (Array.isArray(state) && state.length > 0) {
                        $state.go(state[0], state.length > 1 ? state[1] : null);
                    } else if (Array.isArray($rootScope.$returnToState) && $rootScope.$returnToState.length > 0) {
                        $state.go($rootScope.$returnToState[0],
                            $rootScope.$returnToState.length > 1 ? $rootScope.$returnToState[1] : null);
                    } else {
                        $state.go($authConfig.homeState);
                    }
                }
            };
        }
    ]);
})();