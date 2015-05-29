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
    constructor(AudioWrapperService, StateService) {
        this.AudioWrapperService = AudioWrapperService;
        this.StateService = StateService;
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
        this.AudioWrapperService.setSource(src);
    }

    /**
     * Play the audio
     */
    play() {
        this.AudioWrapperService.play();
    }


    /**
     * Stop tha audio
     */
    stop() {
        this.AudioWrapperService.stop();
    }

    /**
     * Reset the audio
     */
    reset() {
        this.AudioWrapperService.reset();
    }

    /**
     * Checks if the src is for the current
     *    playing audio
     *
     * @param {string} src
     * @returns {boolean}
     */
    isPlaying(src) {
        return this.StateService.getState(this.AudioWrapperService, src) === this.StateService.STATE_PLAYING;
    }

    isStopped(src){
        return !this.isPlaying(src);
    }
}

/**
 * Inject AudiogularjsService to be used in
 *    the controller class
 */
AudiogularService.$inject = ['AudioWrapperService', 'StateService'];

angular.module("audiogularjs").service("AudiogularService", AudiogularService);