/**
 * This class create a wrapper of the Audio Html Element
 */
class AudioWrapperService {

    constructor($window) {
        this.audio = new $window.Audio();
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    stop() {
        this.audio.pause();
    }

    isPaused() {
        return this.audio.paused;
    }

    isPlaying() {
        return !this.isPaused();
    }

    isStopped() {
        return this.isPaused();
    }

    reset() {
        this.audio.load();
    }

    source() {
        return this.audio.src;
    }

    /**
     * Set the source for the audio
     *
     * @param {string} src
     */
    setSource(src) {
        this.audio.src = src;
    }

}

AudioWrapperService.$inject = ['$window'];

angular.module("audiogularjs").service("AudioWrapperService", AudioWrapperService);