/**
 * Created by Administrator on 11/29/2015.
 */
(function (angular) {
    'use strict';
    /* global angular */
    var ui = angular.module('ngui-paging', []);
    ui
        .factory('$pagingFactory', [
            function () {
                return function (options) {
                    options = options || {};
                    var o = {
                        total: options.total || 0,
                        page: options.page || 1,
                        limit: options.limit || 10,
                        maxPage: options.maxPage || 10,

                        print: function () {
                            return o.total > 0;
                        },
                        totalPage: function () {
                            return Math.ceil(o.total / o.limit);
                        },
                        startPage: function () {
                            var pr = Math.round(o.maxPage / 2);
                            var p = o.page - pr;
                            return p < 1 ? 1 : p;
                        },
                        endPage: function () {
                            var pr = Math.round(o.maxPage / 2), t = o.totalPage();
                            var p = o.page + pr;
                            return p > t ? t : p;
                        },
                        showPages: function () {
                            var r = [];
                            for (var i = o.startPage(); i <= o.endPage(); i++) {
                                r.push(i);
                            }
                            return r;
                        },
                        hasFirst: function () {
                            return o.startPage() > 1;
                        },
                        hasFirstRange: function () {
                            return o.startPage() > 2;
                        },
                        hasLast: function () {
                            return o.endPage() < o.totalPage();
                        },
                        hasLastRange: function () {
                            return o.endPage() < o.totalPage() - 1;
                        },
                        update: function (data) {
                            if (data) {
                                o.total = data.total;
                                o.page = data.page || o.page;
                                o.limit = data.limit || o.limit;
                                o.maxPage = data.maxPage || o.maxPage;
                            }
                        },
                        queryString: function () {
                            return JSON.stringify({
                                page: o.page,
                                limit: o.limit
                            });
                        }

                    };

                    return o;
                };
            }
        ])
        .directive('nguiPaging', ['$nguiConfig', '$pagingFactory',
            function ($nguiConfig, $pagingFactory) {
                return {
                    templateUrl: function (elem, attrs) {
                        return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/paging/paging.htm';
                    },
                    restrict: 'A',
                    transclude: true,
                    //replace: true,
                    scope: {
                        paging: '=nguiPaging',
                        active: '=',
                        total: '=',
                        limit: '=',
                        maxPage: '=',
                        urlFormat: '@',
                        onChange: '&'
                    },
                    link: function (scope, el, attr, ctrl, $transclude) {
                        // scope.test = 323;
                        // var child = scope.$new();
                        // child.test = "kk";
                        // el.append(tran( scope ));
                        scope.cp = function (p) {
                            scope.active = p;

                        };


                        var $paging = scope.$paging = {
                            get $scope() {
                                return scope.$parent;
                            },
                            get $transclude() {
                                return $transclude;
                            },
                            get total() {
                                return scope.total || 0;
                            },
                            get limit() {
                                return scope.limit || 10;
                            },
                            get maxPage() {
                                return scope.maxPage || 10;
                            },
                            get active() {
                                return scope.active || 1;
                            },
                            get totalPage() {
                                var limit = $paging.limit;
                                return limit && Math.ceil($paging.total / limit);
                            },
                            get startPage() {
                                var pr = Math.round($paging.maxPage / 2);
                                var p = $paging.active - pr;
                                return p < 1 ? 1 : p;
                            },
                            get endPage() {
                                var pr = Math.round($paging.maxPage / 2), t = $paging.totalPage;
                                var p = $paging.active + pr;
                                return p > t ? t : p;
                            },
                            get printingPages() {
                                var r = [];
                                for (var i = $paging.startPage; i <= $paging.endPage; i++) {
                                    r.push(i);
                                }
                                return r;
                            },
                            get hasFirst() {
                                return $paging.startPage > 1;
                            },
                            get hasFirstRange() {
                                return $paging.startPage > 2;
                            },
                            get hasLast() {
                                return $paging.endPage < $paging.totalPage;
                            },
                            get hasLastRange() {
                                return $paging.endPage < $paging.totalPage;
                            }
                        };
                    }
                };
            }
        ])
        .directive('nguiPagingItem', [
            function () {
                return {
                    restrict: 'A',
                    //transclude: true,
                    //replace: true,
                    scope: {
                        $paging: '=nguiPagingItem',
                        $page: '=page'
                    },
                    link: function (scope, el, attrs) {

                        var $scope = scope.$paging.$scope.$new();
                        $scope.$page = scope.$page;
                        scope.$paging.$transclude($scope, function (clone) {
                            el.replaceWith(clone);
                        });
                    }
                };
            }
        ])
    ;
})(angular)