angular.module("audiogularjs").directive("audiogularjsPlay", audiogularjsPlay);

function audiogularjsPlay() {
    return {
        restrict: "EA",
        scope: {
            "src": "@"
        },
        replace: true,
        require: "audiogularjsPlay",
        template: '<div ng-class="audioPlayCtrl.getUIStateClass()"><div>',
        bindToController: true,
        controller: AudiogularjsServiceController,
        controllerAs: 'audioPlayCtrl',
        link: AudiogularjsServiceLink
    };
}

AudiogularjsServiceController.$inject = ['AudiogularjsService'];
function AudiogularjsServiceController(AudiogularjsService) {
    var self = this;
    self.getUIStateClass = getUIStateClass;
    self.playPause = playPause;

    function getUIStateClass() {
        return AudiogularjsService.getUIStateClass(self.src);
    }

    function playPause() {
        if (AudiogularjsService.isPlaying(self.src)) {
            AudiogularjsService.stopAudio();
        } else {
            AudiogularjsService.stopAudio();
            AudiogularjsService.playAudioBySource(self.src);
        }
    }
}
function AudiogularjsServiceLink(scope, element, attrs, ctrls) {
    element.on("click", function () {
        ctrls.playPause();
        scope.$apply();
    });
    scope.$on('$destroy', function () {
        AudiogularjsService.resetAudio();
    });
}