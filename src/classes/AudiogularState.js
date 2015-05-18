/**
 * This class is responsible of managing the Audio State
 * @author Joseph El Alam <joseph@vinelab.com>
 */
class AudiogularState {


    constructor() {

        this.STATE_PLAYING = 'playing';
        this.STATE_STOPPED = 'stopped';
        this.STATE_PAUSED = 'paused';
    }

    /**
     * Get the state of the audio of the given src
     * with comparison of the current audio
     *
     * @param currentAudio
     * @param src
     * @returns {string}
     */
    getState(currentAudio, src) {
        return (currentAudio.src === src && !currentAudio.paused) ? this.STATE_PLAYING : this.STATE_STOPPED;
    }


}