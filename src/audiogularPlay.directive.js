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
 * @param {$scope} scope
 * @param {DOMElement} element
 * @param {$get.Attributes} attrs
 * @param {$controller} controller
 */
function AudiogularPlayLink(scope, element, attrs, controller) {
    element.on("click", function () {
        controller.playOrStop();
        scope.$apply();
    });
    scope.$on('$destroy', function () {
        AudiogularService.reset();
    });
}



angular.module("audiogularjs").directive("audiogularPlay", audiogularPlay);