angular.module("audiogularjs").directive("audiogularjsPlay", audiogularjsPlay);

function audiogularjsPlay() {
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

AudiogularController.$inject = ['AudiogularjsService'];
function AudiogularjsServiceLink(scope, element, attrs, ctrls) {
    element.on("click", function () {
        ctrls.playStop();
        scope.$apply();
    });
    scope.$on('$destroy', function () {
        AudiogularjsService.resetAudio();
    });
}