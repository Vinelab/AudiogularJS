'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

angular.module('audiogularjs', []);
/**
 * This class is responsible of managing the Audio State
 *
 * @author Joseph El Alam <joseph@vinelab.com>
 */

var AudiogularState = (function () {
    function AudiogularState() {
        _classCallCheck(this, AudiogularState);

        /** @const */this.STATE_PLAYING = 'playing';
        /** @const */this.STATE_STOPPED = 'stopped';
        /** @const */this.STATE_PAUSED = 'paused';
    }

    _createClass(AudiogularState, [{
        key: 'getState',

        /**
         * Get the state of the audio of the given src
         *    with comparison of the current audio
         *
         * @param {sudiogular} currentAudio
         * @param {string} src
         * @returns {string}
         */
        value: function getState(currentAudio, src) {
            return currentAudio.src === src && !currentAudio.paused ? this.STATE_PLAYING : this.STATE_STOPPED;
        }
    }]);

    return AudiogularState;
})();

/**
 * This class create a wrapper of the Audio Html Element
 */

var Audiogular = function Audiogular() {
    _classCallCheck(this, Audiogular);

    this.audio = new Audio();
    return this.audio;
};

/**
 * This class is responsible for managing the UI,
 *    acts as controller of the directive
 *
 * @author Joseph El Alam <joseph@vinelab.com>
 */

var AudiogularController = (function () {
    function AudiogularController(AudiogularService, src) {
        _classCallCheck(this, AudiogularController);

        this.AudiogularService = AudiogularService;
        this.state = new AudiogularState();

        /**
         * The src attribute directive value
         */
        this.src = src;

        /** @const */this.CSS_PREFIX = 'audiogularjs';

        /** @const */this.STATE_MAP = [];
        /** @const */this.STATE_MAP[this.state.STATE_PLAYING] = 'is-playing';
        /** @const */this.STATE_MAP[this.state.STATE_PAUSED] = 'is-paused';
        /** @const */this.STATE_MAP[this.state.STATE_STOPPED] = 'is-stopped';
    }

    _createClass(AudiogularController, [{
        key: 'getCssClass',

        /**
         * Get the CSS class name for the current
         *    state of the audio.
         *
         * @return {string}
         */
        value: function getCssClass() {
            //return (this.AudiogularService.isPlaying(this.src))?
            //    this.getPlayingCssClass():
            //    this.getStoppedCssClass();
            var state = undefined;
            if (this.AudiogularService.isPlaying(this.src)) {
                state = this.getPlayingCssClass();
            } else {
                state = this.getStoppedCssClass();
            }
            return state;
        }
    }, {
        key: 'getPlayingCssClass',
        value: function getPlayingCssClass() {
            return this.getClassForState(this.state.STATE_PLAYING);
        }
    }, {
        key: 'getStoppedCssClass',
        value: function getStoppedCssClass() {
            return this.getClassForState(this.state.STATE_STOPPED);
        }
    }, {
        key: 'getPausedCssClass',
        value: function getPausedCssClass() {
            return this.getClassForState(this.state.STATE_PAUSED);
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
         *
         * @return {string}
         */
        value: function playOrStop() {
            if (this.AudiogularService.isPlaying(this.src)) {
                this.AudiogularService.stop();
            } else {
                this.AudiogularService.stop();
                this.AudiogularService.playBySource(this.src);
            }
        }
    }]);

    return AudiogularController;
})();

/**
 * This class is responsible for managing the audio,
 *    acts as service in audiogularjs component
 *
 * @author Joseph El Alam <joseph@vinelab.com>
 */

var AudiogularPlayer = (function () {

    /**
     * construct the class and
     *    Initialise the audio object using HTML Audio Element Javascript object
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
         *
         * @param {string} src
         */
        value: function playBySource(src) {
            this.setSource(src);
            this.play();
        }
    }, {
        key: 'setSource',

        /**
         * Set the source for the audio object
         *
         * @param {string} src
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

        /**
         * Checks if the src is for the current
         *    playing audio
         *
         * @param {string} src
         * @returns {boolean}
         */
        value: function isPlaying(src) {
            return this.state.getState(this.audio, src) === this.state.STATE_PLAYING;
        }
    }]);

    return AudiogularPlayer;
})();

angular.module('audiogularjs').directive('audiogularPlay', audiogularPlay);

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
        link: AudiogularPlayLink
    };
}

/**
 * Inject AudiogularjsServiceto be used in
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
    element.on('click', function () {
        ctrls.playOrStop();
        scope.$apply();
    });
    scope.$on('$destroy', function () {
        AudiogularjsService.reset();
    });
}
angular.module('audiogularjs').service('AudiogularService', AudiogularPlayer);
//# sourceMappingURL=audiogularjs.js.map