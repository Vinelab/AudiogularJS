describe('test the demo', function () {
    var audiogular1;
    var audiogular2;
    var audiogular1Element;
    var audiogular2Element;


    beforeEach(function(){
        browser.get('http://localhost:9000/demo/index.html');

        audiogular1 = element.all(by.css('[ng-class="audioPlayCtrl.getCssClass()"]')).get(0);
        audiogular2 = element.all(by.css('[ng-class="audioPlayCtrl.getCssClass()"]')).get(1);
        audiogular1Element = audiogular1.getWebElement();
        audiogular2Element = audiogular2.getWebElement();
    });
    it("test if the element are in the page", function(){
        expect(audiogular1.isPresent()).toBe(true);
        expect(audiogular2.isPresent()).toBe(true);
    });
    it("test play stop of a single audio", function () {

        expect(audiogular1Element.getAttribute('class')).toContain("stopped");

        audiogular1Element.click();
        expect(audiogular1Element.getAttribute('class')).toContain("playing");

        audiogular1Element.click();
        expect(audiogular1Element.getAttribute('class')).toContain("stopped");

    });

    it("test play stop of a single audio", function () {
        expect(audiogular1Element.getAttribute('class')).toContain("stopped");
        expect(audiogular2Element.getAttribute('class')).toContain("stopped");

        expect(audiogular1.isPresent()).toBe(true);
        expect(audiogular1Element.getAttribute('class')).toContain("stopped");


        audiogular2Element.click();
        expect(audiogular2Element.getAttribute('class')).toContain("playing");
        expect(audiogular1Element.getAttribute('class')).toContain("stopped");

        audiogular2Element.click();
        expect(audiogular2Element.getAttribute('class')).toContain("stopped");
        expect(audiogular1Element.getAttribute('class')).toContain("stopped");

    });
});