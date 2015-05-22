describe('AudiogularController', function () {
    var scope, ctrl, audioService;
    var src1 = 'http://a570.phobos.apple.com/us/r1000/146/Music1/v4/97/8d/cc/978dcc1c-f6b7-7f4a-d582-c7d33c4357cd/mzaf_8021340011363027806.plus.aac.p.m4a';
    var src2 = 'http://a452.phobos.apple.com/us/r1000/139/Music3/v4/90/6f/7f/906f7f01-9699-d8a1-3376-1b69af11cfb5/mzaf_5217591505439201450.plus.aac.p.m4a';

    beforeEach(module("audiogularjs"));

    beforeEach(
        inject(
            function ($controller, $rootScope, AudiogularService) {
                ctrl = $controller(AudiogularController, {
                    src: src1, AudiogularService: AudiogularService
                });
            }
        )
    );


    it('get Css Class', function () {

        expect(ctrl.getCssClass()).toBe("audiogularjs-is-stopped");
        ctrl.AudiogularService.playBySource(src2);
        ctrl.src = src1;
        expect(ctrl.getCssClass()).toBe("audiogularjs-is-stopped");

        ctrl.src = src2;
        expect(ctrl.getCssClass()).toBe("audiogularjs-is-playing");

        ctrl.AudiogularService.stop();
        expect(ctrl.getCssClass()).toBe("audiogularjs-is-stopped");
    });

    it('play Or Stop', function () {

        ctrl.AudiogularService.playBySource(src2);
        ctrl.src = src1;
        expect(ctrl.getCssClass()).toBe("audiogularjs-is-stopped");
        ctrl.playOrStop();
        expect(ctrl.getCssClass()).toBe("audiogularjs-is-playing");
        ctrl.playOrStop();
        expect(ctrl.getCssClass()).toBe("audiogularjs-is-stopped");
    });

});