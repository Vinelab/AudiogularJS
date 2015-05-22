describe("Audiogular Player", function () {
    it("Should create an instance of AudiogularPlayer", function () {
        var audioPlayer = new AudiogularPlayer();
        expect(audioPlayer.audio).toBeDefined();
        expect(audioPlayer.state).toBeDefined();
    });

    describe("Audiogular Player class methods", function () {
        var audioPlayer = new AudiogularPlayer();
        var src1 = 'http://a570.phobos.apple.com/us/r1000/146/Music1/v4/97/8d/cc/978dcc1c-f6b7-7f4a-d582-c7d33c4357cd/mzaf_8021340011363027806.plus.aac.p.m4a';
        var src2 = 'http://a452.phobos.apple.com/us/r1000/139/Music3/v4/90/6f/7f/906f7f01-9699-d8a1-3376-1b69af11cfb5/mzaf_5217591505439201450.plus.aac.p.m4a';
        it("set source for audiogular audio", function () {
            expect(audioPlayer.audio.src).toBe('');
            audioPlayer.audio.src = src1;
            expect(audioPlayer.audio.src).toBe(src1);
            audioPlayer.audio.src = src2;
            expect(audioPlayer.audio.src).toBe(src2);
        });

        it("Returns CssClass", function(){
            audioPlayer.audio.src = src1;
            expect(audioPlayer.isPlaying(src1)).toBeFalsy();
            audioPlayer.audio.play();
            expect(audioPlayer.isPlaying(src1)).toBeTruthy();
            expect(audioPlayer.isPlaying(src2)).toBeFalsy();
            audioPlayer.audio.pause();
            expect(audioPlayer.isPlaying(src1)).toBeFalsy();
        });


    });
});