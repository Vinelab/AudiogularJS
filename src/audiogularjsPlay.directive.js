angular.module("audiogularjs").directive("audiogularPlay", audiogularPlay);

/**
 * The audiogularPlay directive function
 *
 * @returns {{restrict: string, scope: {src: string}, replace: boolean,
  *    require: string, template: string, bindToController: boolean,
  *   controller: AudiogularController, controllerAs: string,
  *   link: AudiogularPlayLink}}
 */
function audiogularPlay() {
    return {
        restrict: "EA",
        scope: {
            "src": "@"
        },
        replace: true,
        require: "audiogularPlay",
        template: '<div ng-class="audioPlayCtrl.getCssClass()"><div>',
        bindToController: true,
        controller: AudiogularController,
        controllerAs: 'audioPlayCtrl',
        link: AudiogularPlayLink
    };
}

/**
 * Inject AudiogularjsService to be used in
 *    the controller class
 */
AudiogularController.$inject = ['AudiogularService'];

/**
 * The link function of audiogularPlay directive
 *
 * @param scope
 * @param element
 * @param attrs
 * @param ctrls
 */
function AudiogularPlayLink(scope, element, attrs, ctrls) {
    element.on("click", function () {
        ctrls.playOrStop();
        scope.$apply();
    });
    scope.$on('$destroy', function () {
        AudiogularService.reset();
    });
}