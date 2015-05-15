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
        template: '<div ng-class="audioPlayCtrl.getUIStateClass()"><div>',
        bindToController: true,
        controller: function () {
            var self = this;
            self.getUIStateClass = getUIStateClass;
            self.playPause = playPause;

            function getUIStateClass(){
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