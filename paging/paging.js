/**
 * Created by Administrator on 11/29/2015.
 */
(function (angular) {
    'use strict';
    /* global angular */
    var ui = angular.module('ngui-paging', []);
    ui

        .directive('nguiPaging', ['$nguiConfig',
            function ($nguiConfig) {
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
                                if (scope.active <= $paging.totalPage && scope.active > 0) {
                                    return scope.active;
                                }

                                return 1;
                            },
                            get totalPage() {
                                var limit = $paging.limit;
                                return (limit && Math.ceil($paging.total / limit)) || 0;
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
                                return $paging.endPage < $paging.totalPage - 1;
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