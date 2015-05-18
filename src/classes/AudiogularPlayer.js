/**
 * This class is responsible for managing the audio,
 * acts as service in audiogularjs component
 * @author Joseph El Alam <joseph@vinelab.com>
 */
class AudiogularPlayer {

    /**
     * construct the class and
     * Initialise the audio object using HTML Audio Element Javascript object
     * @var {Audio} the audio object being managed, by default init the Audio
     */
    constructor() {
        this.audio = new Audio();
        this.state = new AudiogularState(this.audio);
    }

    /**
     * Play the audio by source
     * @param src
     */
    playBySource(src) {
        this.setAudio(src);
        this.playAudio();
    }

    /**
     * Set the source for the audio object
     */
    setSource(src) {
        this.audio.src = src;
    }

    /**
     * Play the audio
     */
    play() {
        this.audio.play();
    }


    /**
     * Stop tha audio
     */
    stop() {
        this.audio.pause();
    }

    /**
     * Reset the audio
     */
    reset() {
        this.audio.load();
    }

}