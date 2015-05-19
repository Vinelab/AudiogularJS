angular.module("audiogularjs").directive("audiogularPlay", audiogularPlay);
/**
 * The audiogularPlay directive function
 *
 * @returns {{restrict: string, scope: {src: string}, replace: boolean,
  *    require: string, template: string, bindToController: boolean,
  *   controller: AudiogularController, controllerAs: string,
  *   link: AudiogularjsServiceLink}}
 */
function audiogularPlay() {
    return {
        restrict: "EA",
        scope: {
            "src": "@"
        },
        replace: true,
        require: "audiogularjsPlay",
        template: '<div ng-class="audioPlayCtrl.getCssClass()"><div>',
        bindToController: true,
        controller: AudiogularController,
        controllerAs: 'audioPlayCtrl',
        link: AudiogularjsServiceLink
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
function AudiogularjsServiceLink(scope, element, attrs, ctrls) {
    element.on("click", function () {
        ctrls.playOrStop();
        scope.$apply();
    });
    scope.$on('$destroy', function () {
        AudiogularjsService.reset();
    });
}