/**
 * This class is responsible for managing the UI,
 *    acts as controller of the directive
 *
 * @author Joseph El Alam <joseph@vinelab.com>
 */
class DirectiveController {

    constructor(AudiogularService, StateService, src) {
        this.AudiogularService = AudiogularService;
        this.state = StateService;

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
        return (this.AudiogularService.isPlaying(this.src)) ? this.getPlayingCssClass() : this.getStoppedCssClass();
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

        /**
         * save the state of current audio cause when we call stop
         *    it will be always stopped in the next line
         */
        let isStopped = this.AudiogularService.isStopped(this.src);

        /**
         * stop the playing audio in all cases
         */
        this.AudiogularService.stop();

        /**
         * If given source is not for the playing audio or the audio is stopped
         * play the audio of the given source
         */
        if(isStopped){
            this.AudiogularService.playBySource(this.src);
        }
    }
}


/**
 * Inject AudiogularjsService to be used in
 *    the controller class
 */
DirectiveController.$inject = ['AudiogularService', 'StateService'];
