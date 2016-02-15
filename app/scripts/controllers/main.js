'use strict';

/**
 * @ngdoc function
 * @name adabFlickrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adabFlickrApp
 */
angular.module('adabFlickrApp').filter('reverse', function () {
    return function (items) {
        if (!items) return;
        return items.slice().reverse();
    };
});

angular.module('adabFlickrApp')
    .controller('MainCtrl', function ($scope) {
        // add returned images from flickr
        $scope.getData = function () {
            $scope.data = returnedData.items;
            // if we have favourites saved
            if (localStorage.getItem('selectedImages')) {
                var selectedImages = JSON.parse(localStorage.getItem('selectedImages'));
                var items = $scope.data.items.length;
                for (var i = 0; i < selectedImages.length; i++) {

                    $scope.data.items.push(selectedImages[i]);

                    $scope.selectedImage[items - 1] = true;

                    for (var d = 0; d < items; d++) {
                        if ($scope.data.items[d].media.m === selectedImages[i].media.m) {
                            $scope.data.items.splice(d, 1);
                            items--;
                        }
                    }
                }
            }
        };

        if (typeof(returnedData.items) !== 'undefined') {
            $scope.getData();
        } else {
            // Deprecated... I know. Need to update this
            Object.observe(returnedData, function () {
                $scope.$apply(function () {
                    $scope.getData();
                });
            });
        }

        $scope.masonryIMGs = function () {
            var container = document.getElementById('flickr-images');
            var masonry = new Masonry(container, {});
        };

        $scope.selectedImage = new Object();
        $scope.addOrRemoveSelected = function (pos) {
            var selectedImages = JSON.parse(localStorage.getItem('selectedImages'));
            if ($scope.selectedImage[pos]) {
                $scope.selectedImage[pos] = false;

                for (var i = 0; i < selectedImages.length; i++) {
                    if ($scope.data.items[pos].media.m === selectedImages[i].media.m) {
                        var b = i;
                        break;
                    }
                }
                selectedImages.splice(b, 1);
            } else {
                $scope.selectedImage[pos] = true;

                if (selectedImages) {
                    selectedImages[selectedImages.length] = {
                        media: {
                            m: $scope.data.items[pos].media.m
                        }
                    };
                } else {
                    selectedImages = [{
                        media: {
                            m: $scope.data.items[pos].media.m
                        }
                    }];
                }
            }
            localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
        };
    });
