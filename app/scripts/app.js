'use strict';

/**
 * @ngdoc overview
 * @name adabFlickrApp
 * @description
 * # adabFlickrApp
 *
 * Main module of the application.
 */
angular
    .module('adabFlickrApp', [])
    .directive('elemLoaded', function ($parse) {
        return {
            restrict: 'A',
            link: function ($scope, elem, attrs) {
                elem.ready(function () {
                    $scope.$apply(function () {
                        var func = $parse(attrs.elemLoaded);
                        func($scope);
                    })
                })
            }
        }
    });