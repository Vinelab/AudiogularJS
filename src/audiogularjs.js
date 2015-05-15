'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

angular.module('audiogularjs', []);
/**
 * This class is responsible for managing the audio,
 * acts as service in audiogularjs component
 * @author Joseph El Alam <joseph@vinelab.com>
 */

var Audiogularjs = (function () {

    /**
     * construct the class and
     * Initialise the audio object using HTML Audio Element Javascript object
     * @var {Audio} the audio object being managed, by default init the Audio
     */

    function Audiogularjs(audio) {
        _classCallCheck(this, Audiogularjs);

        this.audio = new Audio();
    }

    _createClass(Audiogularjs, [{
        key: 'playAudioBySource',

        /**
         * Play the audio by source
         * @param src
         */
        value: function playAudioBySource(src) {
            this.setAudio(src);
            this.playAudio();
        }
    }, {
        key: 'setAudio',

        /**
         * Set the source for the audio object
         */
        value: function setAudio(src) {
            this.audio.src = src;
        }
    }, {
        key: 'playAudio',

        /**
         * Play the audio
         */
        value: function playAudio() {
            this.audio.play();
        }
    }, {
        key: 'stopAudio',

        /**
         * Stop tha audio
         */
        value: function stopAudio() {
            this.audio.pause();
        }
    }, {
        key: 'resetAudio',

        /**
         * Reset the audio
         */
        value: function resetAudio() {
            this.audio.load();
        }
    }]);

    return Audiogularjs;
})();

/**
 * This class is responsible of managing the Audio State
 * @author Joseph El Alam <joseph@vinelab.com>
 */

var AudioStates = (function (_Audiogularjs) {
    function AudioStates() {
        _classCallCheck(this, AudioStates);

        _get(Object.getPrototypeOf(AudioStates.prototype), 'constructor', this).call(this);
        this.audio = new Audio();

        this.STATE_PLAYING = 'playing';
        this.STATE_STOPPED = 'stopped';

        this.CSS_PREFIX = 'audiogularjs';

        this.STATE_MAP = {
            playing: 'is-playing',
            paused: 'is-paused',
            stopped: 'is-stopped'
        };
    }

    _inherits(AudioStates, _Audiogularjs);

    _createClass(AudioStates, [{
        key: 'isPlaying',

        /**
         * Determine whether the giving src is for
         * an audio currently playing
         * @return {Boolean}
         * @param src of the audio
         * @returns {boolean}
         */
        value: function isPlaying(src) {
            var isPlaying = false;
            if (this.audio.src === src && !this.audio.paused) {
                isPlaying = true;
            }
            return isPlaying;
        }
    }, {
        key: 'isStopped',

        /**
         * Determine whether the giving src is not for
         * an audio currently playing
         * @return {Boolean}
         * @param src of the audio
         * @returns {boolean}
         */
        value: function isStopped(src) {
            return !this.isPlaying(src);
        }
    }, {
        key: 'getUIStateClass',

        /**
         * Get the CSS class name for the current state of the audio.
         * @return {string}
         */
        value: function getUIStateClass(src) {
            var state = undefined;
            if (this.isPlaying(src)) {
                state = this.getPlayingUIStateClass();
            } else {
                state = this.getStoppedUIStateClass();
            }
            return state;
        }
    }, {
        key: 'getPlayingUIStateClass',
        value: function getPlayingUIStateClass() {
            return this.getClassForState(this.STATE_PLAYING);
        }
    }, {
        key: 'getStoppedUIStateClass',
        value: function getStoppedUIStateClass() {
            return this.getClassForState(this.STATE_STOPPED);
        }
    }, {
        key: 'getClassForState',
        value: function getClassForState(state) {
            return '' + this.CSS_PREFIX + '-' + this.STATE_MAP[state];
        }
    }]);

    return AudioStates;
})(Audiogularjs);

angular.module('audiogularjs').directive('audiogularjsPlay', audiogularjsPlay);

audiogularjsPlay.$inject = ['AudiogularjsService'];
function audiogularjsPlay(AudiogularjsService) {
    return {
        restrict: 'EA',
        scope: {
            'src': '@'
        },
        replace: true,
        require: 'audiogularjsPlay',
        template: '<div ng-class="audioPlayCtrl.getUIStateClass()"><div>',
        bindToController: true,
        controller: function controller() {
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
        },
        controllerAs: 'audioPlayCtrl',
        link: function link(scope, element, attrs, ctrls) {
            element.on('click', function () {
                ctrls.playPause();
                scope.$apply();
            });
            scope.$on('$destroy', function () {
                AudiogularjsService.resetAudio();
            });
        }
    };
}
angular.module('audiogularjs').service('AudiogularjsService', AudioStates);
//# sourceMappingURL=audiogularjs.js.map