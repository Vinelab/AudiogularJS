angular.module("audiogularjs").directive("audiogularjsPlay", audiogularjsPlay);


audiogularjsPlay.$inject = ['AudiogularjsService'];
function audiogularjsPlay(AudiogularjsService) {
    return {
        restrict: "EA",
        scope: {
            "src": "@"
        },
        replace: true,
        require: "audiogularjsPlay",
        template: '<div ng-class="audioPlayCtrl.isPlayed()"><div>',
        bindToController: true,
        controller: function () {
            var self = this;
            self.isPlaying = AudiogularjsService.getUIStateClass;
            self.playPause = playPause;

            function playPause() {
                if (AudiogularjsService.isPlaying()) {
                    AudiogularjsService.stopAudio();
                } else {
                    AudiogularjsService.stopAudio();
                    AudiogularjsService.playAudioBySource(self.src);
                }
            }

        },
        controllerAs: 'audioPlayCtrl',
        link: function (scope, element, attrs, ctrls) {
            element.on("click", function () {
                ctrls.playPause();
                scope.$apply();
            });
            scope.$on('$destroy', function () {
                AudiogularjsService.resetAudio();
            });
        }
    };
}