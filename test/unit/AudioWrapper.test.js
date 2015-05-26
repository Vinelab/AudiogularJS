describe("Audio wrapper", function () {
    it("Should create an instance of Audio wrapper", function () {
        var audio1 = new AudioWrapper();
        expect(audio1).toBeDefined();
        expect(audio1.tagName.toLowerCase()).toBe('audio');
    });

});