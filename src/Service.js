/**
 * This class is responsible for managing the audio,
 *    acts as service in audiogularjs component
 *
 * @author Joseph El Alam <joseph@vinelab.com>
 */
class AudiogularService {

    /**
     * construct the class and
     *    Initialise the audio object using HTML Audio Element Javascript object
     * @var {Audio} the audio object being managed, by default init the Audio
     */
    constructor() {
        this.audio = new AudioWrapper();
        this.state = new State();
    }

    /**
     * Play the audio by source
     *
     * @param {string} src
     */
    playBySource(src) {
        this.setSource(src);
        this.play();
    }

    /**
     * Set the source for the audio object
     *
     * @param {string} src
     */
    setSource(src) {
        this.audio.src = src;
    }

    /**
     * Play the audio
     */
    play() {
        this.audio.play();
    }


    /**
     * Stop tha audio
     */
    stop() {
        this.audio.pause();
    }

    /**
     * Reset the audio
     */
    reset() {
        this.audio.load();
    }

    /**
     * Checks if the src is for the current
     *    playing audio
     *
     * @param {string} src
     * @returns {boolean}
     */
    isPlaying(src) {
        return this.state.getState(this.audio, src) === this.state.STATE_PLAYING;
    }
}


angular.module("audiogularjs").service("AudiogularService", AudiogularService);