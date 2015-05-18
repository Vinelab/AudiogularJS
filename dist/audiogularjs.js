'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

angular.module('audiogularjs', []);
/**
 * This class is responsible of managing the Audio State
 * @author Joseph El Alam <joseph@vinelab.com>
 */

var AudiogularState = (function () {
    function AudiogularState() {
        _classCallCheck(this, AudiogularState);

        this.STATE_PLAYING = 'playing';
        this.STATE_STOPPED = 'stopped';
        this.STATE_PAUSED = 'paused';
    }

    _createClass(AudiogularState, [{
        key: 'getState',

        /**
         * Get the state of the audio of the given src
         * with comparison of the current audio
         *
         * @param currentAudio
         * @param src
         * @returns {string}
         */
        value: function getState(currentAudio, src) {
            return currentAudio.src === src && !currentAudio.paused ? this.STATE_PLAYING : this.STATE_STOPPED;
        }
    }]);

    return AudiogularState;
})();

var Audiogular = function Audiogular() {
    _classCallCheck(this, Audiogular);

    this.audio = new Audio();
    return this.audio;
};

/**
 * This class is responsible for managing the UI,
 * acts as controller of the directive
 * @author Joseph El Alam <joseph@vinelab.com>
 */

var AudiogularController = (function () {
    function AudiogularController(AudiogularjsService, src, AudiogularState) {
        _classCallCheck(this, AudiogularController);

        this.AudiogularjsService = AudiogularjsService;
        //console.log(AudiogularState);
        console.log(AudiogularjsService.state);
        //console.log(AudiogularjsService);
        //this.state = new AudiogularState();
        this.src = src;

        this.CSS_PREFIX = 'audiogularjs';
        this.STATE_MAP = [];
        this.STATE_MAP[this.AudiogularjsService.state.STATE_PLAYING] = 'is-playing';
        this.STATE_MAP[this.AudiogularjsService.state.STATE_PAUSED] = 'is-paused';
        this.STATE_MAP[this.AudiogularjsService.state.STATE_STOPPED] = 'is-stopped';
    }

    _createClass(AudiogularController, [{
        key: 'getCssClass',

        /**
         * Get the CSS class name for the current state of the audio.
         * @return {string}
         */
        value: function getCssClass() {
            var state = undefined;
            if (this.AudiogularjsService.isPlaying(this.src)) {
                state = this.getPlayingCssClass();
            } else {
                state = this.getStoppedCssClass();
            }
            return state;
        }
    }, {
        key: 'getPlayingCssClass',
        value: function getPlayingCssClass() {
            return this.getClassForState(this.AudiogularjsService.state.STATE_PLAYING);
        }
    }, {
        key: 'getStoppedCssClass',
        value: function getStoppedCssClass() {
            return this.getClassForState(this.AudiogularjsService.state.STATE_STOPPED);
        }
    }, {
        key: 'getPausedCssClass',
        value: function getPausedCssClass() {
            return this.getClassForState(this.AudiogularjsService.state.STATE_PAUSED);
        }
    }, {
        key: 'getClassForState',
        value: function getClassForState(state) {
            return '' + this.CSS_PREFIX + '-' + this.STATE_MAP[state];
        }
    }, {
        key: 'playOrStop',

        /**
         * Play or stop the Audio depending on its state.
         * @return {string}
         */
        value: function playOrStop() {
            if (this.AudiogularjsService.isPlaying(this.src)) {
                this.AudiogularjsService.stop();
            } else {
                this.AudiogularjsService.stop();
                this.AudiogularjsService.playBySource(this.src);
            }
        }
    }]);

    return AudiogularController;
})();

/**
 * This class is responsible for managing the audio,
 * acts as service in audiogularjs component
 * @author Joseph El Alam <joseph@vinelab.com>
 */

var AudiogularPlayer = (function () {

    /**
     * construct the class and
     * Initialise the audio object using HTML Audio Element Javascript object
     * @var {Audio} the audio object being managed, by default init the Audio
     */

    function AudiogularPlayer() {
        _classCallCheck(this, AudiogularPlayer);

        this.audio = new Audiogular();
        this.state = new AudiogularState();
    }

    _createClass(AudiogularPlayer, [{
        key: 'playBySource',

        /**
         * Play the audio by source
         * @param src
         */
        value: function playBySource(src) {
            this.setSource(src);
            this.play();
        }
    }, {
        key: 'setSource',

        /**
         * Set the source for the audio object
         */
        value: function setSource(src) {
            this.audio.src = src;
        }
    }, {
        key: 'play',

        /**
         * Play the audio
         */
        value: function play() {
            this.audio.play();
        }
    }, {
        key: 'stop',

        /**
         * Stop tha audio
         */
        value: function stop() {
            this.audio.pause();
        }
    }, {
        key: 'reset',

        /**
         * Reset the audio
         */
        value: function reset() {
            this.audio.load();
        }
    }, {
        key: 'isPlaying',
        value: function isPlaying(src) {
            return this.state.getState(this.audio, src) === this.state.STATE_PLAYING;
        }
    }]);

    return AudiogularPlayer;
})();

angular.module('audiogularjs').directive('audiogularjsPlay', audiogularjsPlay);

function audiogularjsPlay() {
    return {
        restrict: 'EA',
        scope: {
            'src': '@'
        },
        replace: true,
        require: 'audiogularjsPlay',
        template: '<div ng-class="audioPlayCtrl.getCssClass()"><div>',
        bindToController: true,
        controller: AudiogularController,
        controllerAs: 'audioPlayCtrl',
        link: AudiogularjsServiceLink
    };
}

AudiogularController.$inject = ['AudiogularjsService'];
function AudiogularjsServiceLink(scope, element, attrs, ctrls) {
    element.on('click', function () {
        ctrls.playOrStop();
        scope.$apply();
    });
    scope.$on('$destroy', function () {
        AudiogularjsService.reset();
    });
}
angular.module('audiogularjs').service('AudiogularjsService', AudiogularPlayer);
//# sourceMappingURL=audiogularjs.js.map