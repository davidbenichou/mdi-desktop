var module = angular.module('site', ['hljs']);

module.controller('siteController', ['$scope', '$window',
    function ($scope, $window) {
        $scope.goToDemo = function() {
            $window.location.href = 'desktopDemo.html';
        }

        $scope.download = function() {
            $window.location.href = 'https://github.com/smithscripts/mdi-desktop/archive/master.zip';
        }

        $scope.goToGithub = function() {
            $window.location.href = 'https://github.com/smithscripts/mdi-desktop';
        }
    }]);