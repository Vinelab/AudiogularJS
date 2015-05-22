describe("Audiogular", function () {
    it("Should create an instance of Audiogular", function () {
        var audio1 = new Audiogular();
        expect(audio1).toBeDefined();
        expect(audio1.tagName.toLowerCase()).toBe('audio');
    });

});