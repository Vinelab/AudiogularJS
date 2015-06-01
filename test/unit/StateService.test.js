describe("StateService", function () {
    var audioState;
    var currentAudio;
    var expectedIsPlaying = false;
    var src1 = 'http://a570.phobos.apple.com/us/r1000/146/Music1/v4/97/8d/cc/978dcc1c-f6b7-7f4a-d582-c7d33c4357cd/mzaf_8021340011363027806.plus.aac.p.m4a';
    var src2 = 'http://a452.phobos.apple.com/us/r1000/139/Music3/v4/90/6f/7f/906f7f01-9699-d8a1-3376-1b69af11cfb5/mzaf_5217591505439201450.plus.aac.p.m4a';
    beforeEach(function () {
        module(function ($provide) {
            $provide.service('AudioWrapperMock', function () {
                /**
                 * return the value of expectedIsPlaying set before each call of isPlaying
                 */
                this.isPlaying = jasmine.createSpy('isPlaying').and.callFake(function () {
                    return expectedIsPlaying;

                });
                this.source = jasmine.createSpy('source').and.returnValue(src1);
            });
        });
        module('audiogularjs');
    });
    beforeEach(
        inject(
            function (AudioWrapperMock) {
                currentAudio = AudioWrapperMock;
            }
        )
    );
    beforeEach(function () {
        audioState = new StateService();
    });
    it("Should have the state constants when created", function () {
        expect(audioState.STATE_PLAYING).toBe('playing');
        expect(audioState.STATE_STOPPED).toBe('stopped');
        expect(audioState.STATE_PAUSED).toBe('paused');
    });
    describe("getState", function () {
        it(" use AudioWrapper source and isPlaying methods", function () {
            audioState.getState(currentAudio, src1);
            expect(currentAudio.isPlaying).toHaveBeenCalled();
            expect(currentAudio.source).toHaveBeenCalled();
        });
        it("Returns STATE_STOPPED when current Audio is stopped regardless of the source given", function () {
            /**
             * When isPlaying return false the state is false
             */
            expectedIsPlaying = false;
            expect(audioState.getState(currentAudio, src1)).toBe(audioState.STATE_STOPPED);
            expect(audioState.getState(currentAudio, src2)).toBe(audioState.STATE_STOPPED);
        });

        it("Returns STATE_PLAYING when current Audio is playing and has the same source as given source", function () {
            /**
             * isPlaying return true and source return the same value of provided src
             */
            expectedIsPlaying = true;
            expect(audioState.getState(currentAudio, src1)).toBe(audioState.STATE_PLAYING);
        });
        it("Returns STATE_STOPPED when current Audio is playing but doesn't have the same source as given source", function () {
            /**
             * isPlaying return true but source return different value of provided src
             */
            expectedIsPlaying = true;
            expect(audioState.getState(currentAudio, src2)).toBe(audioState.STATE_STOPPED);
        });
    });
});
