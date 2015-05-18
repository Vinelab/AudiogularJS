/**
 * This class is responsible of managing the Audio State
 * @author Joseph El Alam <joseph@vinelab.com>
 */
class AudiogularState {


    constructor(audio) {

        this.audio = audio;

        this.STATE_PLAYING = 'playing';
        this.STATE_STOPPED = 'stopped';
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



}