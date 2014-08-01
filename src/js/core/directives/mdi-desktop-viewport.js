(function(){
    'use strict';

    var module = angular.module('mdi.desktop.viewport', []);

    module.controller('mdiDesktopViewportController', ['$scope', '$element', '$window', '$document',
        function ($scope, $element, $window, $document) {
            var self = this;

            self.getViewportDimensions = function() {
              return $scope.dimensions;
            };
            
            self.mouseMove = function(event) {
                $scope.$apply(function() {
                    $scope.showFillOutline = event.pageY <= $scope.options.viewportTop;
                    $scope.showLeftOutline = event.pageX <= 0;
                    $scope.showRightOutline = event.pageX >= $scope.dimensions.width - 1;
                });
            };

            self.mouseUp = function() {
                $scope.$apply(function() {
                    $scope.showFillOutline = false;
                    $scope.showLeftOutline = false;
                    $scope.showRightOutline = false;
                });
                $document.unbind('mousemove', self.mouseMove);
                $document.unbind('mouseup', self.mouseUp);
            };

            $scope.dimensions = {};
            $scope.showLeftOutline = false;
            $scope.showRightOutline = false;
            $scope.displayViewportDimensions = false;
            $scope.logoUrl = undefined;

            $scope.viewportMouseDown = function (event) {
                //Ignore resize events.
                if (event.target.nodeName.toLowerCase() === 'span') return;

                $document.on('mousemove', self.mouseMove);
                $document.on('mouseup', self.mouseUp);
            };

            /**
             * @mdi.doc $watch function
             * @name mdiDesktopViewportController.visibilityWatch
             * @module mdi.desktop.viewport
             * @function
             *
             * @description
             * Monitors for visibility changes. This method is responsible for updating the viewport
             * dimensions in situations where the viewport is initially hidden.
             *
             */
            $scope.$watch(function () {
                //Emulates jQuery's $(element).is(':visible')
                return $element[0].offsetWidth > 0 && $element[0].offsetHeight > 0;
            }, function () {
                $scope.dimensions = {
                    height: $element[0].clientHeight,
                    width: $element[0].clientWidth
                };
            });

            /**
             * @mdi.doc window.resize
             * @name mdiDesktopViewportController.resize
             * @module mdi.desktop.viewport
             * @function
             *
             * @description
             * This method is responsible for updating the viewport dimensions when the
             * browser window has been re-sized.
             *
             */
            angular.element($window).bind('resize', function () {
                $scope.$apply(function () {
                    $scope.dimensions = {
                        height: $element[0].clientHeight,
                        width: $element[0].clientWidth
                    };
                });
            });

            document.querySelectorAll(".desktop-viewport-container")[0].onscroll = function (event) {
                event.preventDefault();
                document.querySelectorAll(".desktop-viewport-container")[0].scrollTop = 0;
            };

            $scope.init = function() {
                $scope.displayViewportDimensions = $scope.options.displayViewportDimensions;
                $scope.logoUrl = $scope.options.logoUrl;
            }
        }]);

    module.directive('mdiDesktopViewport', [function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'src/templates/mdi-desktop-viewport.html',
            require: '?^mdiDesktop',
            controller: 'mdiDesktopViewportController',
            scope: {
                windows: '='
            },
            link: function(scope, element, attrs, desktopCtrl) {
                scope.desktopCtrl = desktopCtrl;
                scope.options = desktopCtrl.getOptions();
                scope.init();
            }
        };
    }]);
})();
