(function () {
    'use strict';

    angular.module('angularMinuteSearch', [])
        .directive('angularMinuteSearch', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                replace: true,
                scope: {angularMinuteSearch: '=', title: '@', placeholder: '@', searchMode: '@'},
                template: '<div class="searchbar">' +
                '<div class="pull-left"><h3>{{obj.searchText && \'Search results..\' || title}}</h3></div>' +
                '<div class="pull-right"><input type="search" class="form-control" placeholder="{{placeholder || \'Search..\'}}" ng-model="obj.searchText"></div>' +
                '<div class="clearfix"></div></div>',
                link: function ($scope, element, attrs) {
                    $scope.obj = {};
                    var mode = $scope.searchMode || 'LIKE';
                    $scope.angularMinuteSearch.setSearchMode(mode);

                    $scope.$watch('obj.searchText', function (v) {
                        if (typeof(v) != 'undefined') {
                            $timeout.cancel($scope.obj.lastTimeout);
                            $scope.obj.lastTimeout = $timeout(function () {
                                $scope.angularMinuteSearch.setSearchCriteria(mode == 'LIKE' ? '%' + v + '%' : v);
                            }, 350);
                        }
                    });
                }
            };
        }]);
})();
