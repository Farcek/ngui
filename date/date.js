(function () {
    'use strict';
    var app = angular.module('ngui-date', [ 'ngui-core']);

    app.directive('nguiDate', [ '$filter', '$nguiConfig',
        function ($filter, $nguiConfig) {
            return {
                restrict: 'A',
                require: '?ngModel',
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/date/date.htm';
                },
                link: function (scope, el, attrs, model) {

                  model.$render = function() {
                        scope.date = {
                          day: $filter('date')(model.$viewValue, 'd'),
                          month: $filter('date')(model.$viewValue, 'M'),
                          year: $filter('date')(model.$viewValue, 'yyyy')
                        };
                  };

                  scope.getYears = function() {
                        var years = [];
                        if(attrs.startYear && attrs.endYear) {
                              for (var i = attrs.endYear; i >= attrs.startYear; i--) {
                                years.push(i.toString());
                              }
                        }
                        else{
                          if(attrs.startYear) {

                            var end = parseInt(attrs.startYear) + 10;
                                for (var i = attrs.startYear; i <= end; i++) {
                                  years.push(i.toString());
                                }

                          }
                          else{

                            if(attrs.endYear) {
                            var start = parseInt(attrs.endYear) - 10;
                                for (var i = start; i <= attrs.endYear; i++) {
                                  years.push(i.toString());
                                }
                            }
                            else{
                              if(attrs.maxDate && attrs.minDate){
                                var max = parseInt($filter('date')(attrs.maxDate, 'yyyy'));
                                var min = parseInt($filter('date')(attrs.minDate, 'yyyy'));
                                  for (var i = max; i >= min; i--) {
                                    years.push(i.toString());
                                  }
                              }
                              else{
                                if(attrs.maxDate){
                                    var max = parseInt($filter('date')(attrs.maxDate, 'yyyy'));
                                    for (var i = max-10; i <= max; i++) {
                                      years.push(i.toString());
                                    }
                                }
                                else{
                                  if(attrs.minDate){
                                    var min = parseInt($filter('date')(attrs.minDate, 'yyyy'));
                                    for (var i = min; i <= min+10; i++) {
                                      years.push(i.toString());
                                    }
                                  }
                                  else{
                                    var now = parseInt($filter('date')(new Date(), 'yyyy'));
                                    for (var i = now-10; i <= now; i++) {
                                      years.push(i.toString());
                                    }
                                  }

                                }

                              }
                            }

                          }


                        }
                        return years;
                  }

                  scope.getAllMonths = function(months) {
                        for (var i = 1; i <= 12; i++) {
                          months.push(i.toString());
                        }
                        return months;
                  }
                  scope.getLowerMonths = function(months, max) {
                        for (var i = 1; i <= max; i++) {
                          months.push(i.toString());
                        }
                        return months;
                  }
                  scope.getHigherMonths = function(months, min) {
                        for (var i = min; i <= 12; i++) {
                          months.push(i.toString());
                        }
                        return months;
                  }

                  scope.getMonths = function() {
                        var months = [];

                        if(attrs.maxDate && attrs.minDate){
                                var max = parseInt($filter('date')(attrs.maxDate, 'M'));
                                var min = parseInt($filter('date')(attrs.minDate, 'M'));
                                var maxyear = parseInt($filter('date')(attrs.maxDate, 'yyyy'));
                                var minyear = parseInt($filter('date')(attrs.minDate, 'yyyy'));
                                if(maxyear == parseInt(scope.date.year) || minyear == parseInt(scope.date.year)){
                                  if(maxyear == parseInt(scope.date.year)){
                                      scope.getLowerMonths(months, max);
                                  }
                                  else{
                                      scope.getHigherMonths(months, min);
                                  }
                                }
                                else{
                                  scope.getAllMonths(months);
                                }
                        }
                        else{
                            if(attrs.maxDate){
                                var max = parseInt($filter('date')(attrs.maxDate, 'M'));
                                var maxyear = parseInt($filter('date')(attrs.maxDate, 'yyyy'));
                                  if(maxyear == parseInt(scope.date.year)){
                                      scope.getLowerMonths(months, max);
                                  }
                                  else{
                                      scope.getAllMonths(months);
                                  }
                            }
                            else{
                                if(attrs.minDate){
                                  var min = parseInt($filter('date')(attrs.minDate, 'M'));
                                  var minyear = parseInt($filter('date')(attrs.minDate, 'yyyy'));
                                  if(minyear == parseInt(scope.date.year)){
                                      scope.getHigherMonths(months, min);
                                  }
                                  else{
                                      scope.getAllMonths(months);
                                  }
                                }
                                else{
                                  scope.getAllMonths(months);
                                }
                            }
                        }

                        return months;
                  }

                  scope.getAllDays = function(days, calculatedDays) {
                        for (var i = 1; i <= calculatedDays; i++) {
                          days.push(i.toString());
                        }
                        return days;
                  }
                  scope.getLowerDays = function(days, max) {
                        for (var i = 1; i <= max; i++) {
                          days.push(i.toString());
                        }
                        return days;
                  }
                  scope.getHigherDays = function(days, calculatedDays, min) {
                        for (var i = min; i <= calculatedDays; i++) {
                          days.push(i.toString());
                        }
                        return days;
                  }
                  scope.getDays = function() {
                        var days = [];
                        var calculatedDays = new Date(scope.date.year, scope.date.month, 0).getDate();
                        var selectedyear = parseInt(scope.date.year);
                        var selectedmonth = parseInt(scope.date.month);

                        if(attrs.maxDate && attrs.minDate){
                                var maxmonth= parseInt($filter('date')(attrs.maxDate, 'M'));
                                var minmonth= parseInt($filter('date')(attrs.minDate, 'M'));
                                var maxyear = parseInt($filter('date')(attrs.maxDate, 'yyyy'));
                                var minyear = parseInt($filter('date')(attrs.minDate, 'yyyy'));
                                var max= parseInt($filter('date')(attrs.maxDate, 'd'));
                                var min= parseInt($filter('date')(attrs.minDate, 'd'));

                                  if(maxyear == selectedyear && maxmonth == selectedmonth){
                                      scope.getLowerDays(days, max);
                                  }
                                  else{
                                      if(minyear == selectedyear && minmonth == selectedmonth){
                                          scope.getHigherDays(days, calculatedDays, max);
                                      }
                                      else{
                                        scope.getAllDays(days, calculatedDays);
                                      }
                                  }
                        }
                        else{
                            if(attrs.maxDate){
                                var maxyear = parseInt($filter('date')(attrs.maxDate, 'yyyy'));
                                var maxmonth= parseInt($filter('date')(attrs.maxDate, 'M'));
                                var max= parseInt($filter('date')(attrs.maxDate, 'd'));
                                  if(maxyear == selectedyear && maxmonth == selectedmonth){
                                      scope.getLowerDays(days, max);
                                  }
                                  else{
                                      scope.getAllDays(days, calculatedDays);
                                  }
                            }
                            else{
                                if(attrs.minDate){
                                    var minmonth= parseInt($filter('date')(attrs.minDate, 'M'));
                                    var minyear = parseInt($filter('date')(attrs.minDate, 'yyyy'));
                                    var min= parseInt($filter('date')(attrs.minDate, 'd'));
                                      if(minyear == selectedyear && minmonth == selectedmonth){
                                          scope.getHigherDays(days, calculatedDays, min);
                                      }
                                      else{
                                        scope.getAllDays(days, calculatedDays);
                                      }
                                }
                                else{
                                    scope.getAllDays(days, calculatedDays);
                                }
                            }
                        }
                        return days;
                  }

                  scope.$watch('date.year', function(newyear){
                        if(attrs.required){
                          if(newyear && scope.date.month && scope.date.day){
                            model.$setViewValue(new Date(newyear, scope.date.month-1 , scope.date.day));
                          }
                          else{
                            alert('Огноог гүйцэт сонгоно уу.');
                          }
                        }
                        else{
                          model.$setViewValue(new Date(newyear, scope.date.month-1 , scope.date.day));
                        }
                  });
                  scope.$watch('date.month', function(newmonth){
                        if(attrs.required){
                          if(scope.date.year && newmonth && scope.date.day){
                            model.$setViewValue(new Date(scope.date.year, newmonth-1 , scope.date.day));
                          }
                          else{
                            alert('Огноог гүйцэт сонгоно уу.');
                          }
                        }
                        else{
                            model.$setViewValue(new Date(scope.date.year, newmonth-1 , scope.date.day));
                        }
                  });
                  scope.$watch('date.day', function(newday){
                        if(attrs.required){
                          if(scope.date.year && scope.date.month && newday){
                            model.$setViewValue(new Date(scope.date.year, scope.date.month-1 , newday));
                          }
                          else{
                            alert('Огноог гүйцэт сонгоно уу.');
                          }
                        }
                        else{
                            model.$setViewValue(new Date(scope.date.year, scope.date.month-1 , newday));
                        }
                  });

                }
            };
        }
    ])
    ;
})();
