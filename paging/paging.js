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
        .directive('uiPaging', [
            function () {
                return {
                    templateUrl: function (elem, attrs) {
                        return attrs.templateUrl || 'paging.htm';
                    },
                    restrict: 'A',
                    scope: {
                        pagination: '=uiPaging',
                        onChange: '&'
                    },
                    link: function (scope) {

                        scope.cp = function (p) {
                            if (scope.pagination) {
                                scope.pagination.page = p;
                            }

                            if (scope.onChange) {
                                scope.onChange();
                            }
                        };

                    }
                };
            }
        ]);
})(angular)