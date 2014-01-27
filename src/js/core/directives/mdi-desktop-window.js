(function(){
    'use strict';

    var module = angular.module('mdi.desktop.window', []);

    module.controller('mdiDesktopWindowController', ['$scope', '$element', '$document', '$timeout',
        function ($scope, $element, $document, $timeout) {
            var self = this;

            self.top,
            self.left,
            self.right,
            self.bottom,
            self.height,
            self.width,
            self.x = $element[0].offsetLeft,
            self.y = $element[0].offsetTop,
            self.startX = 0,
            self.startY = 0;

            $scope.maximized = false;

            $scope.close = function() {
                $scope.desktopCtrl.getWindows().splice($scope.index, 1);
            };

            $scope.activate = function() {
                $scope.desktopCtrl.clearActive();
                $scope.window.active =  true;
                $scope.window.zIndex = $scope.desktopCtrl.getNextMaxZIndex();
            };

            $scope.maximize = function() {
                if ($scope.maximized) {
                    $element.css({
                        top: self.top,
                        left: self.left,
                        right: self.right,
                        bottom: self.bottom,
                        height: self.height,
                        width: self.height
                    });

                    $scope.maximized = false;
                } else {
                    self.top = $element.css('top');
                    self.left = $element.css('left');
                    self.right = $element.css('right');
                    self.bottom = $element.css('bottom');
                    self.height = $element.css('height');
                    self.width = $element.css('width');

                    $element.css({
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: '100%',
                        width: '100%'
                    });

                    $scope.maximized = true;
                }
            };

            $scope.setPosition = function(event) {
                if ($scope.maximized) return;
                event.preventDefault()
                self.startX = event.screenX - self.x
                self.startY = event.screenY - self.y
                $document.on('mousemove', self.mouseMove);
                $document.on('mouseup', self.mouseUp);

            }

            self.mouseMove = function(event) {
                self.x = event.screenX - self.startX
                self.y = event.screenY - self.startY
                $element.css({
                    top: self.y + 'px',
                    left:  self.x + 'px'
                });
            }

            self.mouseUp = function() {
                $document.unbind('mousemove', self.mouseMove);
                $document.unbind('mouseup', self.mouseUp);
            }
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

//                var startX = 0, startY = 0, x = 0, y = 0;
//
//                element.on('mousedown', function(event) {
//                    // Prevent default dragging of selected content
//                    event.preventDefault();
//                    startX = event.pageX - x;
//                    startY = event.pageY - y;
//                    $document.on('mousemove', mousemove);
//                    $document.on('mouseup', mouseup);
//                });
//
//                function mousemove(event) {
//                    y = event.pageY - startY;
//                    x = event.pageX - startX;
//                    element.css({
//                        top: y + 'px',
//                        left:  x + 'px'
//                    });
//                }
//
//                function mouseup() {
//                    $document.unbind('mousemove', mousemove);
//                    $document.unbind('mouseup', mouseup);
//                }
            }
        };
    }]);
})();
