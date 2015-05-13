"use strict";

(function () {
    "use strict";
    angular.module("audiogularjs", []);
    angular.module("audiogularjs").factory("AudiogularjsFactory", AudiogularjsFactory);
    angular.module("audiogularjs").directive("audioPlay", audioPlay);
    function AudiogularjsFactory() {
        var data = {
            audioObj: createAudio(),
            playAudio: playAudio,
            pauseAudio: pauseAudio,
            resetAudio: resetAudio
        };
        return data;
        function createAudio() {
            return new Audio();
        }
        function playAudio(url) {
            this.audioObj.src = url;
            this.audioObj.play();
        }
        function pauseAudio() {
            this.audioObj.pause();
        }
        function resetAudio() {
            this.audioObj.load();
        }
    }
    audioPlay.$inject = ["AudiogularjsFactory"];
    function audioPlay(AudiogularjsFactory) {
        return {
            restrict: "EA",
            scope: {
                "src": "@"
            },
            replace: true,
            require: "audioPlay",
            template: "<div ng-class=\"audioPlayCtrl.isPlayed()\"><div>",
            bindToController: true,
            controller: function controller() {
                var self = this;
                self.isPlayed = isPlayed;
                self.playPause = playPause;
                function isPlayed() {
                    if (AudiogularjsFactory.audioObj.src === self.src && !AudiogularjsFactory.audioObj.paused) {
                        return "stopMe";
                    } else {
                        return "playMe";
                    }
                }
                function playPause() {
                    if (AudiogularjsFactory.audioObj.src === self.src && !AudiogularjsFactory.audioObj.paused) {
                        AudiogularjsFactory.pauseAudio();
                    } else {
                        AudiogularjsFactory.pauseAudio();
                        AudiogularjsFactory.playAudio(self.src);
                    }
                }
            },
            controllerAs: "audioPlayCtrl",
            link: function link(scope, element, attrs, ctrls) {
                element.on("click", function () {
                    ctrls.playPause();
                    scope.$apply();
                });
                scope.$on("$destroy", function () {
                    AudiogularjsFactory.resetAudio();
                });
            }
        };
    }
})();
//# sourceMappingURL=audiogularjs.js.map