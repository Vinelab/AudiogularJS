/**
 * Inject AudiogularjsServiceto be used in
 *    the controller class
 */
AudiogularController.$inject = ['AudiogularjsService'];
/**
 * This class is responsible for managing the UI,
 *    acts as controller of the directive
 *
 * @author Joseph El Alam <joseph@vinelab.com>
 */
class AudiogularController {

    constructor(AudiogularjsService, src) {
        this.AudiogularjsService = AudiogularjsService;
        this.state = new AudiogularState();

        /**
         * The src attribute directive value
         */
        this.src = src;

        /** @const */ this.CSS_PREFIX = 'audiogularjs';

        /** @const */ this.STATE_MAP = [];
        /** @const */ this.STATE_MAP[this.state.STATE_PLAYING] = 'is-playing';
        /** @const */ this.STATE_MAP[this.state.STATE_PAUSED] = 'is-paused';
        /** @const */ this.STATE_MAP[this.state.STATE_STOPPED] = 'is-stopped';


    }

    /**
     * Get the CSS class name for the current
     *    state of the audio.
     *
     * @return {string}
     */
    getCssClass() {
        return (this.AudiogularjsService.isPlaying(this.src))?
            this.getPlayingCssClass():
            this.getStoppedCssClass();
        //let state;
        //if (this.AudiogularjsService.isPlaying(this.src)) {
        //    state = this.getPlayingCssClass();
        //} else {
        //    state = this.getStoppedCssClass();
        //}
        //return state;
    }

    getPlayingCssClass() {
        return this.getClassForState(this.state.STATE_PLAYING);
    }

    getStoppedCssClass() {
        return this.getClassForState(this.state.STATE_STOPPED);
    }

    getPausedCssClass() {
        return this.getClassForState(this.state.STATE_PAUSED);
    }

    getClassForState(state) {
        return `${ this.CSS_PREFIX }-${ this.STATE_MAP[state] }`;
    }

    /**
     * Play or stop the Audio depending on its state.
     *
     * @return {string}
     */
    playOrStop() {
        if (this.AudiogularjsService.isPlaying(this.src)) {
            this.AudiogularjsService.stop();
        } else {
            this.AudiogularjsService.stop();
            this.AudiogularjsService.playBySource(this.src);
        }
    }
}
