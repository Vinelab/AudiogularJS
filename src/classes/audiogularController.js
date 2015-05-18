/**
 * This class is responsible for managing the UI,
 * acts as controller of the directive
 * @author Joseph El Alam <joseph@vinelab.com>
 */
class AudiogularController {

    constructor(AudiogularjsService, src, AudiogularState) {
        this.AudiogularjsService = AudiogularjsService;
        //console.log(AudiogularState);
        console.log(AudiogularjsService.state);
        //console.log(AudiogularjsService);
        //this.state = new AudiogularState();
        this.src = src;

        this.CSS_PREFIX = 'audiogularjs';
        this.STATE_MAP = [];
        this.STATE_MAP[this.AudiogularjsService.state.STATE_PLAYING]= 'is-playing';
        this.STATE_MAP[this.AudiogularjsService.state.STATE_PAUSED]= 'is-paused';
        this.STATE_MAP[this.AudiogularjsService.state.STATE_STOPPED]= 'is-stopped';


    }

    /**
     * Get the CSS class name for the current state of the audio.
     * @return {string}
     */
    getCssClass() {
        let state;
        if (this.AudiogularjsService.isPlaying(this.src)) {
            state = this.getPlayingCssClass();
        } else {
            state = this.getStoppedCssClass();
        }
        return state;
    }

    getPlayingCssClass() {
        return this.getClassForState(this.AudiogularjsService.state.STATE_PLAYING);
    }

    getStoppedCssClass() {
        return this.getClassForState(this.AudiogularjsService.state.STATE_STOPPED);
    }

    getPausedCssClass() {
        return this.getClassForState(this.AudiogularjsService.state.STATE_PAUSED);
    }

    getClassForState(state) {
        return `${ this.CSS_PREFIX }-${ this.STATE_MAP[state] }`;
    }

    /**
     * Play or stop the Audio depending on its state.
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
