class AudiogularController {

    constructor(AudiogularjsService, src) {
        this.AudiogularjsService = AudiogularjsService;
        this.src = src;
    }

    getCssClass() {
        return this.AudiogularjsService.state.getUIStateClass(this.src);
    }

    playPause() {
        if (this.AudiogularjsService.state.isPlaying(this.src)) {
            this.AudiogularjsService.stopAudio();
        } else {
            this.AudiogularjsService.stopAudio();
            this.AudiogularjsService.playAudioBySource(this.src);
        }
    }
}
