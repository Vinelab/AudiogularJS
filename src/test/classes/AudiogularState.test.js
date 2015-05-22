describe("AudiogularState", function () {
    it("Should create an instance of AudiogularState", function () {
        var audioState = new AudiogularState();
        expect(audioState.STATE_PLAYING).toBe('playing');
        expect(audioState.STATE_STOPPED).toBe('stopped');
        expect(audioState.STATE_PAUSED).toBe('paused');
    });

    describe("getState", function () {
        var audioState = new AudiogularState();
        var currentAudio = new Audiogular();
        beforeEach(function () {
            currentAudio.src = 'http://a570.phobos.apple.com/us/r1000/146/Music1/v4/97/8d/cc/978dcc1c-f6b7-7f4a-d582-c7d33c4357cd/mzaf_8021340011363027806.plus.aac.p.m4a';
        });


        it("Returns STATE_PLAYING when current Audio is playing and has the same source as given source", function () {
            var src = 'http://a570.phobos.apple.com/us/r1000/146/Music1/v4/97/8d/cc/978dcc1c-f6b7-7f4a-d582-c7d33c4357cd/mzaf_8021340011363027806.plus.aac.p.m4a';
            currentAudio.play();
            expect(audioState.getState(currentAudio, src)).toBe(audioState.STATE_PLAYING);

        });

        it("Returns STATE_STOPPED when current Audio is playing and doesn't have the same source as given source", function () {
            var src = 'http://a452.phobos.apple.com/us/r1000/139/Music3/v4/90/6f/7f/906f7f01-9699-d8a1-3376-1b69af11cfb5/mzaf_5217591505439201450.plus.aac.p.m4a';
            currentAudio.play();
            expect(audioState.getState(currentAudio, src)).toBe(audioState.STATE_STOPPED);

        });

        it("Returns STATE_STOPPED when current Audio is stopped regardless of the source given", function () {
            var src1 = 'http://a570.phobos.apple.com/us/r1000/146/Music1/v4/97/8d/cc/978dcc1c-f6b7-7f4a-d582-c7d33c4357cd/mzaf_8021340011363027806.plus.aac.p.m4a';
            var src2 = 'http://a452.phobos.apple.com/us/r1000/139/Music3/v4/90/6f/7f/906f7f01-9699-d8a1-3376-1b69af11cfb5/mzaf_5217591505439201450.plus.aac.p.m4a';
            currentAudio.pause();
            expect(audioState.getState(currentAudio, src1)).toBe(audioState.STATE_STOPPED);
            expect(audioState.getState(currentAudio, src2)).toBe(audioState.STATE_STOPPED);

        });

    });
});