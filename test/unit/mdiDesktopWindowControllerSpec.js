(function() {
    "use strict";
    describe('mdi-desktop window controller', function() {
        var compile, scope, element, ctrl;

        function windows() {
            return element.find('div.desktop-window-container');
        }

        beforeEach(module('mdi.desktop'));

        beforeEach(inject(function ($rootScope, $templateCache, $compile) {
            $templateCache.put('src/templates/mdi-desktop.html', __html__['src/templates/mdi-desktop.html']);
            $templateCache.put('src/templates/mdi-desktop-menubar.html', __html__['src/templates/mdi-desktop-menubar.html']);
            $templateCache.put('src/templates/mdi-desktop-taskbar.html', __html__['src/templates/mdi-desktop-taskbar.html']);
            $templateCache.put('src/templates/mdi-desktop-viewport.html', __html__['src/templates/mdi-desktop-viewport.html']);
            $templateCache.put('src/templates/mdi-desktop-window.html', __html__['src/templates/mdi-desktop-window.html']);

            scope = $rootScope.$new();
            compile = $compile;

            var elm = angular.element('<div mdi-desktop></div>');
            element = compile(elm)(scope);
            scope.$digest();
            ctrl = element.controller('mdiDesktopWindow');
        }));

        describe('mdi-desktop-window', function() {
            it('should close window on click', function() {
                var menuItems = element.find('.menuItem');
                expect(windows().length).toBe(0);
                angular.element(menuItems[0]).triggerHandler('click');
                expect(windows().length).toBe(1);

                var buttons = element.find('.desktop-window-close-button');

                angular.element(buttons[0]).triggerHandler('click');
                expect(windows().length).toBe(0);
            });

            it('should bring window to the front on mouse down', function() {
                var menuItems = element.find('.menuItem');
                expect(windows().length).toBe(0);
                angular.element(menuItems[0]).triggerHandler('click');
                angular.element(menuItems[0]).triggerHandler('click');
                expect(windows().length).toBe(2);

                $(windows()[0]).mousedown();

                var window1ZIndex = $(windows()[0]).css('z-index');
                var window2ZIndex = $(windows()[1]).css('z-index');
                expect(window1ZIndex).toBeGreaterThan(window2ZIndex);
            });

            it('should make window active on mouse down', function() {
                var menuItems = element.find('.menuItem');
                expect(windows().length).toBe(0);
                angular.element(menuItems[0]).triggerHandler('click');
                angular.element(menuItems[0]).triggerHandler('click');
                expect(windows().length).toBe(2);

                $(windows()[0]).mousedown();

                expect(angular.element(windows()[0]).hasClass('active')).toBeTruthy();
                expect(angular.element(windows()[1]).hasClass('active')).toBeFalsy();
            });

            it('should maximize window when maximized is clicked', function() {
                var menuItems = element.find('.menuItem');
                expect(windows().length).toBe(0);
                angular.element(menuItems[0]).triggerHandler('click');
                expect(windows().length).toBe(1);

                angular.element(windows()[0]).css({
                    top: '50px',
                    left: '50px',
                    height: '300px',
                    width: '300px'
                });

                var maximize = element.find('.maximize')[0];
                angular.element(maximize).triggerHandler('click');

                expect(angular.element(windows()[0]).css('top')).toBe('0px');
                expect(angular.element(windows()[0]).css('left')).toBe('0px');
                expect(angular.element(windows()[0]).css('right')).toBe('0px');
                expect(angular.element(windows()[0]).css('bottom')).toBe('0px');
                expect(angular.element(windows()[0]).css('height')).toBe('100%');
                expect(angular.element(windows()[0]).css('width')).toBe('100%');
            });

            it('should restore a maximized window when restore is clicked', function() {
                var menuItems = element.find('.menuItem');
                expect(windows().length).toBe(0);
                angular.element(menuItems[0]).triggerHandler('click');
                expect(windows().length).toBe(1);

                angular.element(windows()[0]).css({
                    top: '50px',
                    left: '50px',
                    height: '300px',
                    width: '300px'
                });

                var maximize = element.find('.maximize')[0];
                angular.element(maximize).triggerHandler('click');

                expect(angular.element(windows()[0]).css('top')).toBe('0px');
                expect(angular.element(windows()[0]).css('left')).toBe('0px');
                expect(angular.element(windows()[0]).css('right')).toBe('0px');
                expect(angular.element(windows()[0]).css('bottom')).toBe('0px');
                expect(angular.element(windows()[0]).css('height')).toBe('100%');
                expect(angular.element(windows()[0]).css('width')).toBe('100%');

                angular.element(maximize).triggerHandler('click');

                expect(angular.element(windows()[0]).css('top')).toBe('50px');
                expect(angular.element(windows()[0]).css('left')).toBe('50px');
                expect(angular.element(windows()[0]).css('right')).toBe('');
                expect(angular.element(windows()[0]).css('bottom')).toBe('');
                expect(angular.element(windows()[0]).css('height')).toBe('300px');
                expect(angular.element(windows()[0]).css('width')).toBe('300px');
            });
        });
    });

})();
