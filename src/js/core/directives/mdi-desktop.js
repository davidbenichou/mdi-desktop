(function () {
    'use strict';

    var module = angular.module('mdi.desktop', ['ngAnimate', 'mdi.desktop.menubar', 'mdi.desktop.viewport', 'mdi.desktop.taskbar', 'mdi.desktop.window', 'mdi.draggable', 'mdi.resizable']);

    module.constant('mdiDesktopConstants', {
        // copied from http://www.lsauer.com/2011/08/javascript-keymap-keycodes-in-json.html
        keymap: {
            TAB: 9,
            STRG: 17,
            CTRL: 17,
            CTRLRIGHT: 18,
            CTRLR: 18,
            SHIFT: 16,
            RETURN: 13,
            ENTER: 13,
            BACKSPACE: 8,
            BCKSP: 8,
            ALT: 18,
            ALTR: 17,
            ALTRIGHT: 17,
            SPACE: 32,
            WIN: 91,
            MAC: 91,
            FN: null,
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39,
            ESC: 27,
            DEL: 46,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123
        }
    });

    module.service('desktopClassFactory',
        function () {

            var service = {
                /**
                 * @ngdoc method
                 * @name createDesktop
                 * @methodOf mdi.desktop.service:desktopClassFactory
                 * @description Creates a new desktop instance.
                 * @returns {Desktop} desktop
                 */
                createDesktop : function() {
                    var desktop = new Desktop();
                    return desktop;
                }
            }

            /**
             * @ngdoc function
             * @name mdi.desktop.class:Desktop
             * @description Desktop defines a logical desktop.  Any non-dom properties and elements needed by the desktop should
             *              be defined in this class
             */
            var Desktop = function () {
                this.options = new DesktopOptions();
            };

            /**
             * @ngdoc function
             * @name mdi.desktop.class:DesktopOptions
             * @description Default DesktopOptions class.  DesktopOptions are defined by the application developer and overlaid
             * over this object.
             */
            function DesktopOptions() {
                this.showMenubar = true;
                this.menubarHeight = 32;
                this.viewportTop = this.showMenubar ? this.menubarHeight : 0;
            }

            return service;
        });

    module.controller('mdiDesktopController', ['$scope', 'mdiDesktopConstants', 'desktopClassFactory',
        function ($scope, mdiDesktopConstants, desktopClassFactory) {
            var self = this;

            self.allMinimized = false,
            self.desktop = desktopClassFactory.createDesktop();

            $scope.options = self.desktop.options;
            $scope.windows = [];

            self.getOptions = function() {
                return $scope.options;
            }

            self.getWindows = function() {
                return $scope.windows;
            }

            self.getNextMaxZIndex = function() {
                var max = 0;
                var tmp;
                for (var i= $scope.windows.length - 1; i >= 0; i--) {
                    tmp = $scope.windows[i].zIndex;
                    if (tmp > max) max = tmp;
                }
                return max + 1;
            }

            self.clearActive = function() {
                angular.forEach($scope.windows, function(window){
                    window.active = false;
                });
            }

            self.hideShowAll = function() {
                self.allMinimized = !self.allMinimized
                angular.forEach($scope.windows, function(window){
                    window.active = false;
                    window.minimized = self.allMinimized;
                });
            }
        }]);

    module.directive('mdiDesktop',
        ['$compile',
            function($compile) {
                return {
                    restrict: 'A',
                    templateUrl: 'src/templates/mdi-desktop.html',
                    scope: {
                        mdiDesktop: '='
                    },
                    replace: true,
                    controller: 'mdiDesktopController'
                };
            }
        ]);
})();