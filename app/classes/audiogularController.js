/**
 * This class is responsible for managing the UI,
 * acts as controller of the directive
 * @author Joseph El Alam <joseph@vinelab.com>
 */
class AudiogularController {

    constructor(AudiogularjsService, src) {
        this.AudiogularjsService = AudiogularjsService;
        this.src = src;

        this.CSS_PREFIX = 'audiogularjs';

        this.STATE_MAP = {
            playing: 'is-playing',
            paused: 'is-paused',
            stopped: 'is-stopped'
        };
    }

    /**
     * Get the CSS class name for the current state of the audio.
     * @return {string}
     */
    getCssClass() {
        let state;
        if (this.AudiogularjsService.state.isPlaying(this.src)) {
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
    playStop() {
        if (this.AudiogularjsService.state.isPlaying(this.src)) {
            this.AudiogularjsService.stopAudio();
        } else {
            this.AudiogularjsService.stopAudio();
            this.AudiogularjsService.playAudioBySource(this.src);
        }
    }
}
