/**
 * This class is responsible for managing the audio,
 * acts as service in audiogularjs component
 *
 * @author Joseph El Alam <joseph@vinelab.com>
 */
class Audiogularjs {

    /**
     * construct the class
     *
     * @var {Audio} the audio object being managed, by default init the Audio
     */
    constructor(audio = initAudio()) {
        this.audio = audio;
    }

    /**
     * Initialise the audio object using HTML Audio Element Javascript object
     *
     * @returns {HTMLAudioElement}
     */
    initAudio() {
        return new Audio();
    }

    /**
     * Play the audio by source
     *
     * @param src
     */
    playAudioBySource(src) {
        setAudio(src);
        playAudio();
    }

    /**
     * Set the source for the audio object
     */
    setAudio(src) {
        this.audio.src = src;
    }

    /**
     * Play the audio
     */
    playAudio() {
        this.audio.play();
    }


    /**
     * Stop tha audio
     */
    stopAudio() {
        this.audio.pause();
    }

    /**
     * Reset the audio
     */
    resetAudio() {
        this.audio.load();
    }

}