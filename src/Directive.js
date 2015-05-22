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
        controller: DirectiveController,
        controllerAs: 'audioPlayCtrl',
        link: AudiogularPlayLink
    };
}



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



angular.module("audiogularjs").directive("audiogularPlay", audiogularPlay);