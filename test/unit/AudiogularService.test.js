describe("Audiogular Service", function () {

    /** @const */ var STATE_PLAYING = 'playing';
    /** @const */ var STATE_STOPPED = 'stopped';
    /** @const */ var STATE_PAUSED = 'paused';

    var audioWrapperService;
    var stateService;
    var audiogular;
    var expectedState = STATE_PLAYING;
    var src = 'http://a570.phobos.apple.com/us/r1000/146/Music1/v4/97/8d/cc/978dcc1c-f6b7-7f4a-d582-c7d33c4357cd/mzaf_8021340011363027806.plus.aac.p.m4a';

    beforeEach(function () {
        module(function ($provide) {
            $provide.service('AudioWrapperMock', function () {
                this.audio = jasmine.createSpy('audio');
                this.play = jasmine.createSpy('play');
                this.stop = jasmine.createSpy('stop');
                this.reset = jasmine.createSpy('reset');
                this.setSource = jasmine.createSpy('setSource');
            });
            $provide.service('StateMock', function () {
                this.STATE_PLAYING = STATE_PLAYING;
                this.STATE_STOPPED = STATE_STOPPED;
                this.STATE_PAUSED = STATE_PAUSED;
                this.getState = jasmine.createSpy('getState').and.callFake(function () {
                    return expectedState;
                });
            });
        });
        module('audiogularjs');
    });

    beforeEach(
        inject(
            function (AudioWrapperMock, StateMock) {
                audioWrapperService = AudioWrapperMock;
                stateService = StateMock;
            }
        )
    );
    beforeEach(function () {
        audiogular = new AudiogularService(audioWrapperService, stateService);
    });

    it("play call wrapper play", function () {
        audiogular.play();
        expect(audioWrapperService.play).toHaveBeenCalled();
    });

    it("stop call wrapper stop", function () {
        audiogular.stop();
        expect(audioWrapperService.stop).toHaveBeenCalled();
    });

    it("reset call wrapper reset", function () {
        audiogular.reset();
        expect(audioWrapperService.reset).toHaveBeenCalled();
    });

    it("setSource call wrapper setSource", function () {
        audiogular.setSource(src);
        expect(audioWrapperService.setSource).toHaveBeenCalled();
        expect(audioWrapperService.setSource).toHaveBeenCalledWith(src);
    });

    it("playBySource call setSource than play", function () {
        audiogular.playBySource(src);
        expect(audioWrapperService.setSource).toHaveBeenCalled();
        expect(audioWrapperService.setSource).toHaveBeenCalledWith(src);
        expect(audioWrapperService.play).toHaveBeenCalled();
    });

    it("isPlaying use getState of StateService", function () {
        audiogular.playBySource(src);
        var isPlaying = audiogular.isPlaying(src);
        expect(stateService.getState).toHaveBeenCalled();
        expect(stateService.getState).toHaveBeenCalledWith(audioWrapperService,src);

    });
    it("isStopped use getState of StateService ", function () {
        var isStopped = audiogular.isStopped(src);
        expect(stateService.getState).toHaveBeenCalled();
        expect(stateService.getState).toHaveBeenCalledWith(audioWrapperService,src);
    });

    it("isStopped is opposite of isPlaying", function () {
        expect(audiogular.isStopped(src)).not.toBe(audiogular.isPlaying(src));
    });

    it("isPlaying returns true when getState of Stateservice return STATE_PLAYING", function () {
        expectedState = STATE_PLAYING;
        expect(audiogular.isPlaying(src)).toBeTruthy();
    });

    it("isPlaying returns false when getState of Stateservice return STATE_STOPPED", function () {
        expectedState = STATE_STOPPED;
        expect(audiogular.isPlaying(src)).toBeFalsy();
    });

});