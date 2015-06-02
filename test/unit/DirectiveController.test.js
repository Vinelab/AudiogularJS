describe('DirectiveController', function () {
    var ctrl;
    var src1 = 'http://a570.phobos.apple.com/us/r1000/146/Music1/v4/97/8d/cc/978dcc1c-f6b7-7f4a-d582-c7d33c4357cd/mzaf_8021340011363027806.plus.aac.p.m4a';
    var src2 = 'http://a452.phobos.apple.com/us/r1000/139/Music3/v4/90/6f/7f/906f7f01-9699-d8a1-3376-1b69af11cfb5/mzaf_5217591505439201450.plus.aac.p.m4a';
    var expectedIsPlaying = true;

    beforeEach(function () {
        module(function ($provide) {
            $provide.service('AudiogularMock', function () {
                this.playBySource = jasmine.createSpy('playBySource');
                this.stop = jasmine.createSpy('stop');
                this.play = jasmine.createSpy('play');
                this.isPlaying = jasmine.createSpy('isPlaying').and.callFake(function () {
                    return expectedIsPlaying;
                });
                this.isStopped = jasmine.createSpy('isPlaying').and.callFake(function () {
                    return !expectedIsPlaying;
                });
            });
            $provide.service('StateMock', function () {

                /** @const */ this.STATE_PLAYING = 'playing';
                /** @const */ this.STATE_STOPPED = 'stopped';
                /** @const */ this.STATE_PAUSED = 'paused';
                this.getState = jasmine.createSpy('getState');
            });
        });
        module('audiogularjs');
    });

    beforeEach(
        inject(
            function ($controller, AudiogularMock, StateMock) {
                ctrl = $controller(DirectiveController, {
                    AudiogularService: AudiogularMock,  StateService: StateMock, src: src1
                });
            }
        )
    );


    it('getClassForState return Css depending on given state', function () {
        expect(ctrl.getClassForState(ctrl.state.STATE_PLAYING)).toBe(ctrl.CSS_PREFIX + '-' + ctrl.STATE_MAP[ctrl.state.STATE_PLAYING]);
        expect(ctrl.getClassForState(ctrl.state.STATE_PAUSED)).toBe(ctrl.CSS_PREFIX + '-' + ctrl.STATE_MAP[ctrl.state.STATE_PAUSED]);
        expect(ctrl.getClassForState(ctrl.state.STATE_STOPPED)).toBe(ctrl.CSS_PREFIX + '-' + ctrl.STATE_MAP[ctrl.state.STATE_STOPPED]);
    });

    describe("check if getClassForState is called", function () {
        beforeEach(function () {
            spyOn(ctrl, "getClassForState");
        });
        it('getPlayingCssClass use getClassForState with playing state', function () {
            ctrl.getPlayingCssClass();
            expect(ctrl.getClassForState).toHaveBeenCalled();
            expect(ctrl.getClassForState).toHaveBeenCalledWith(ctrl.state.STATE_PLAYING);
        });

        it('getStoppedCssClass use getClassForState with stopped state', function () {
            ctrl.getStoppedCssClass();
            expect(ctrl.getClassForState).toHaveBeenCalled();
            expect(ctrl.getClassForState).toHaveBeenCalledWith(ctrl.state.STATE_STOPPED);
        });

        it('getPausedCssClass use getClassForState with paused state', function () {
            ctrl.getPausedCssClass();
            expect(ctrl.getClassForState).toHaveBeenCalled();
            expect(ctrl.getClassForState).toHaveBeenCalledWith(ctrl.state.STATE_PAUSED);
        });

    });

    it("getCssClass returns class depending on the state", function(){
        expectedIsPlaying = true;
        expect(ctrl.getCssClass()).toBe(ctrl.CSS_PREFIX + '-' + ctrl.STATE_MAP[ctrl.state.STATE_PLAYING]);

        expectedIsPlaying = false;
        expect(ctrl.getCssClass()).toBe(ctrl.CSS_PREFIX + '-' + ctrl.STATE_MAP[ctrl.state.STATE_STOPPED]);
    });

    it("play or stop", function(){
        expectedIsPlaying = true;
        ctrl.playOrStop();
        expect(ctrl.AudiogularService.playBySource).not.toHaveBeenCalled();

        expectedIsPlaying = false;
        ctrl.playOrStop();
        expect(ctrl.AudiogularService.playBySource).toHaveBeenCalled();
    });
});