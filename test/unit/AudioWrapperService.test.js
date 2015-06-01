describe("Audio wrapper", function () {

    var window = {};
    var wrapper;
    var src = 'http://a570.phobos.apple.com/us/r1000/146/Music1/v4/97/8d/cc/978dcc1c-f6b7-7f4a-d582-c7d33c4357cd/mzaf_8021340011363027806.plus.aac.p.m4a';

    beforeEach(function () {
        module(function ($provide) {
            $provide.service('$window', function () {
                this.Audio = jasmine.createSpy('Audio');
            });
        });
        module('audiogularjs');
    });
    beforeEach(
        inject(
            function ($window) {
                window = $window;
            }
        )
    );


    it("creates an instance of Audio", function () {
        wrapper = new AudioWrapperService(window);
        expect(wrapper.audio instanceof window.Audio).toBeTruthy();
    });
    describe("check if all methods run on Audio Html Element", function () {


        beforeEach(function () {
                wrapper = new AudioWrapperService(window);

                wrapper.audio.play = jasmine.createSpy('play');
                wrapper.audio.pause = jasmine.createSpy('pause');
                wrapper.audio.paused = jasmine.createSpy('paused');
                wrapper.audio.load = jasmine.createSpy('load');
            }
        );

        it("call play of HtmlElement when we call play in the class", function () {
            wrapper.play();
            expect(wrapper.audio.play).toHaveBeenCalled();
        });
        it("call pause of HtmlElement when we call pause in the class", function () {
            wrapper.pause();
            expect(wrapper.audio.pause).toHaveBeenCalled();
        });
        it("call pause of HtmlElement  when we call stop in the class", function () {
            wrapper.stop();
            expect(wrapper.audio.pause).toHaveBeenCalled();
        });
        it("call load of HtmlElement  when we call reset in the class", function () {
            wrapper.reset();
            expect(wrapper.audio.load).toHaveBeenCalled();
        });
        it(" set source of audio property", function () {
            wrapper.setSource(src);
            expect(wrapper.audio.src).toBe(src);
        });
        it(" return the source value when call source()", function () {
            wrapper.setSource(src);
            expect(wrapper.source()).toBe(src);
        });
        it(" return audio.paused", function () {
            expect(wrapper.audio.paused).toBe(wrapper.isPaused());
        });
        it("isStopped call isPaused ", function () {
            spyOn(wrapper, "isPaused");
            wrapper.isStopped();
            expect(wrapper.isPaused).toHaveBeenCalled();
        });
        it("isPlaying is not isPaused ", function () {
            spyOn(wrapper, "isPaused");
            var state = wrapper.isPlaying();
            expect(wrapper.isPaused).toHaveBeenCalled();
            expect(state).not.toBe(wrapper.isPaused());
        });
    });

});