/**
 * This class is responsible of managing the Audio State
 *
 * @author Joseph El Alam <joseph@vinelab.com>
 */
class StateService {


    constructor() {

        /** @const */ this.STATE_PLAYING = 'playing';
        /** @const */ this.STATE_STOPPED = 'stopped';
        /** @const */ this.STATE_PAUSED = 'paused';
    }

    /**
     * Get the state of the audio of the given src
     *    with comparison of the current audio
     *
     * @param {sudiogular} currentAudio
     * @param {string} src
     * @returns {string}
     */
    getState(currentAudio, src) {
        return (currentAudio.source() === src && currentAudio.isPlaying()) ? this.STATE_PLAYING : this.STATE_STOPPED;
    }


}


angular.module("audiogularjs").service("StateService", StateService);