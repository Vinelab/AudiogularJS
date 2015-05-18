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
        if (this.AudiogularjsService.state.isPlaying(src)) {
            state = this.getPlayingUIStateClass();
        } else {
            state = this.getStoppedUIStateClass();
        }
        return state;
    }

    getPlayingUIStateClass() {
        return this.getClassForState(this.AudiogularjsService.state.STATE_PLAYING);
    }

    getStoppedUIStateClass() {
        return this.getClassForState(this.AudiogularjsService.state.STATE_STOPPED);
    }

    getClassForState(state) {
        return `${ this.CSS_PREFIX }-${ this.STATE_MAP[state] }`;
    }

    //return this.AudiogularjsService.state.getUIStateClass(this.src);

    playPause() {
        if (this.AudiogularjsService.state.isPlaying(this.src)) {
            this.AudiogularjsService.stopAudio();
        } else {
            this.AudiogularjsService.stopAudio();
            this.AudiogularjsService.playAudioBySource(this.src);
        }
    }
}
