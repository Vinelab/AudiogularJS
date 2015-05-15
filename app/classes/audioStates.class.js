/**
 * This class is responsible of managing the Audio State
 *
 * @author Joseph El Alam <joseph@vinelab.com>
 */
class AudioStates extends Audiogularjs {


    constructor(audio) {
        const STATE_PLAYING = 'playing';
        const STATE_STOPPED = 'paused';

        const CSS_PREFIX = 'audiogularjs';

        const STATE_MAP = {
            playing: 'is-playing',
            paused: 'is-paused',
            stopped: 'is-stopped'
        };

        super(audio);
    }

    /**
     * Determine whether the giving src is for
     * an audio currently playing
     * @return {Boolean}
     * @param src of the audio
     * @returns {boolean}
     */
    isPlaying(src) {
        let isPlaying = false;
        if(this.audio.src === src && !this.audio.paused){
            isPlaying = true;
        }
        return isPlaying;
    }

    /**
     * Determine whether the giving src is not for
     * an audio currently playing
     * @return {Boolean}
     * @param src of the audio
     * @returns {boolean}
     */
    isStopped(src) {
        return !this.isPlaying(src);
    }

    /**
     * Get the CSS class name for the current state of the audio.
     * @return {string}
     */
    getUIStateClass(src) {
        let state;
        if (this.isPlaying(src)) {
            state = this.getPlayingUIStateClass();
        } else {
            state = this.getStoppedUIStateClass();
        }

        return state;
    }

    getPlayingUIStateClass() {
        return this.getClassForState(STATE_PLAYING);
    }

    getStoppedUIStateClass() {
        return this.getClassForState(STATE_STOPPED);
    }

    getClassForState(state) {
        return `${ this.CSS_PREFIX }-${ this.STATE_MAP[state] }`;
    }

}