(function() {
    "use strict";
    describe('mdi-desktop controller', function() {

        var compile, scope, element, ctrl;

        beforeEach(module('mdi.desktop'));

        beforeEach(inject(function ($rootScope, $templateCache, $compile) {
            $templateCache.put('src/templates/mdi-desktop.html', __html__['src/templates/mdi-desktop.html']);
            $templateCache.put('src/templates/mdi-desktop-menubar.html', __html__['src/templates/mdi-desktop-menubar.html']);
            $templateCache.put('src/templates/mdi-desktop-taskbar.html', __html__['src/templates/mdi-desktop-taskbar.html']);
            $templateCache.put('src/templates/mdi-desktop-viewport.html', __html__['src/templates/mdi-desktop-viewport.html']);
            $templateCache.put('src/templates/mdi-desktop-window.html', __html__['src/templates/mdi-desktop-window.html']);

            scope = $rootScope.$new();
            compile = $compile;
        }));

        function createElement() {
            var elem, compiledElem;
            elem = angular.element('<div mdi-desktop></div>');
            compiledElem = compile(elem)(scope);
            scope.$digest();

            ctrl = compiledElem.controller('mdiDesktop');

            return compiledElem;
        }

        describe('mdi-desktop init', function() {
            it('should have the correct init values', function() {
                var el = createElement();
                expect(el.isolateScope().windows.length).toBe(0);
            });
        });
    });

})();