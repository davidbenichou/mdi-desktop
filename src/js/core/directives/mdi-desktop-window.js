(function(){
    'use strict';

    var module = angular.module('mdi.desktop.window', []);

    module.controller('mdiDesktopWindowController', ['$scope', '$element', '$document', '$window',
        function ($scope, $element, $document, $window) {
            var self = this;

            self.top,
                self.left,
                self.right,
                self.bottom,
                self.height,
                self.width;

            self.storeWindowValues = function(top, left, right, bottom, height, width) {
                self.top = top;
                self.left = left;
                self.right = right;
                self.bottom = bottom;
                self.height = height;
                self.width = width;
            };

            self.x = $element[0].offsetLeft,
                self.y = $element[0].offsetTop,
                self.lastX = 0,
                self.lastY = 0,
                self.startX = 0,
                self.startY = 0,
                self.titleBar = undefined;
            self.viewportDimensions = undefined;

            self.mouseMove = function(event) {
                $scope.$apply(function() {
                    self.viewportDimensions = $scope.viewportCtrl.getViewportDimensions();
                    if (event.pageX <= 0 ||
                        event.pageX >= self.viewportDimensions.width ||
                        $scope.split) return false;

                    $element.css({ opacity: 0.5 });
                    self.x = event.screenX - self.startX
                    self.y = event.screenY - self.startY

                    //Top Containment
                    self.y = self.y >= 0 ? self.y : 0;
                    //Bottom Containment
                    self.y = self.y <= self.viewportDimensions.height - self.titleBar[0].offsetHeight ? self.y : self.viewportDimensions.height - self.titleBar[0].offsetHeight;

                    //Left Containment
                    self.x = self.x >= -(self.titleBar[0].offsetWidth + self.titleBar[0].offsetLeft) ? self.x : -(self.titleBar[0].offsetWidth + self.titleBar[0].offsetLeft);
                    //Right Containment
                    self.x = self.x <=  self.viewportDimensions.width - self.titleBar[0].offsetLeft ? self.x : self.viewportDimensions.width - self.titleBar[0].offsetLeft;

                    $scope.window.top = self.y + 'px';
                    $scope.window.left = self.x + 'px';
                });
            }

            self.mouseUp = function(event) {
                $scope.$apply(function() {
                    if (event.pageX <= 0) {
                        $scope.split = true;

                        self.storeWindowValues(
                            $scope.window.top,
                            $scope.window.left,
                            $scope.window.right,
                            $scope.window.bottom,
                            $scope.window.height,
                            $scope.window.width);

                        $scope.window.top = 0;
                        $scope.window.left = 0;
                        $scope.window.bottom = 0;
                        $scope.window.width = '50%';
                        $scope.window.height = 'auto';
                    }
                    self.viewportDimensions = $scope.viewportCtrl.getViewportDimensions();
                    if (event.pageX >= self.viewportDimensions.width - 1) {
                        $scope.split = true;

                        self.storeWindowValues(
                            $scope.window.top,
                            $scope.window.left,
                            $scope.window.right,
                            $scope.window.bottom,
                            $scope.window.height,
                            $scope.window.width);

                        $scope.window.top = 0;
                        $scope.window.left = '50%';
                        $scope.window.right = 0;
                        $scope.window.bottom = 0;
                        $scope.window.width = '50%';
                        $scope.window.height = 'auto';
                    }
                });
                $element.css({ opacity: 1.0 });
                $document.unbind('mousemove', self.mouseMove);
                $document.unbind('mouseup', self.mouseUp);
            }

            self.isElementInViewport = function() {
                $scope.$apply(function() {
                    var windowTop = $element[0].offsetTop;
                    var windowLeft = $element[0].offsetLeft;
                    if ((windowTop + 10) >= $scope.viewportCtrl.getViewportDimensions().height ||
                        (windowLeft + 200) >= $scope.viewportCtrl.getViewportDimensions().width) {
                        $scope.window.outOfBounds = true;
                        $scope.window.active = false;
                    } else {
                        $scope.window.outOfBounds = false;
                    };
                })
            }

            $scope.views = [];
            $scope.split = false;

            $scope.activate = function(event) {
                if ($scope.window.maximized || $scope.window.outOfBounds) return;
                $scope.desktopCtrl.clearActive();
                $scope.window.active = true;
                $scope.window.zIndex = $scope.desktopCtrl.getNextMaxZIndex();
            };

            $scope.minimize = function() {
                $scope.window.active = false;
                $scope.window.minimized = true;
            };

            $scope.resetWindowValues = function() {
                $scope.window.top = self.top;
                $scope.window.left = self.left;
                $scope.window.right = self.right;
                $scope.window.bottom = self.bottom;
                $scope.window.height = self.height;
                $scope.window.width = self.width;
            };

            $scope.maximize = function() {
                if ($scope.split) return;
                if ($scope.window.maximized) {
                    $scope.resetWindowValues();
                    $scope.window.maximized = false;
                } else {
                    self.storeWindowValues(
                        $scope.window.top,
                        $scope.window.left,
                        $scope.window.right,
                        $scope.window.bottom,
                        $scope.window.height,
                        $scope.window.width);

                    $scope.window.top = 0;
                    $scope.window.left = 0;
                    $scope.window.right = 0;
                    $scope.window.bottom = 0;
                    $scope.window.height = '100%';
                    $scope.window.width = '100%';

                    $scope.window.maximized = true;
                }
            };

            $scope.close = function() {
                $scope.desktopCtrl.getWindows().splice($scope.index, 1);
            };

            $scope.windowTitleMouseDown = function (event) {
                if ($scope.window.maximized || $scope.window.outOfBounds) return;
                event.preventDefault()
                self.titleBar = angular.element(event.srcElement);
                self.x = $element[0].offsetLeft;
                self.y = $element[0].offsetTop;
                self.startX = event.screenX - self.x
                self.startY = event.screenY - self.y
                $document.on('mousemove', self.mouseMove);
                $document.on('mouseup', self.mouseUp);
            };

            $scope.unlock = function() {
                $scope.split = false;
                $scope.resetWindowValues();
                $scope.desktopCtrl.cascadeWindow($scope.window);
            }

            angular.element($window).bind('resize', function () {
                self.isElementInViewport()
            });
        }]);

    module.directive('mdiDesktopWindow', ['$log', '$document', '$animate', function($log, $document, $animate) {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'src/templates/mdi-desktop-window.html',
            require: ['^mdiDesktop', '^mdiDesktopViewport'],
            controller: 'mdiDesktopWindowController',
            scope: {
                index: '=',
                window: '='
            },
            link: function(scope, element, attrs, ctrls) {
                scope.desktopCtrl = ctrls[0];
                scope.viewportCtrl = ctrls[1];
                scope.desktopCtrl.cascadeWindow(scope.window);
            }
        };
    }]);
})();
