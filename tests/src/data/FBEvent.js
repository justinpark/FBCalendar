describe('Data.FBEvent', function() {
    it('should initialize default variables', function() {
        var expectedAttributes = {
                foo: 'boo',
                blah: 'lalala2'
            },
            model = new FBEvent(expectedAttributes);

        _.each(expectedAttributes, function(value, key) {
            var actual = model.get(key);
            expect(value).toBe(actual);
        });
    });

    it('should contain unique id', function() {
        var model1 = new FBEvent({start: 0, end: 100}),
            model2 = new FBEvent({start: 100, end: 200});

        expect(model1.id).not.toBe(model2.id);
    });

    describe('collision test', function() {
        it('should not overlap the following cases', function() {
            //start time has been passed the previous event end time.
            var model1 = new FBEvent({start: 0, end: 100}),
                model2 = new FBEvent({start: 100, end: 200});

            expect(model1.overlaps(model2)).toBe(false);

            //vice versa
            var model3 = new FBEvent({start: 50, end: 100}),
                model4 = new FBEvent({start: 20, end: 50});

            expect(model3.overlaps(model4)).toBe(false);
        });

        it('should inform the collision in the following cases', function() {
            var model1 = new FBEvent({start: 0, end: 100}),
                model2 = new FBEvent({start: 50, end: 200});

            expect(model1.overlaps(model2)).toBe(true);

            var model3 = new FBEvent({start: 50, end: 100}),
                model4 = new FBEvent({start: 20, end: 60});

            expect(model3.overlaps(model4)).toBe(true);

            var model5 = new FBEvent({start: 50, end: 100}),
                model6 = new FBEvent({start: 20, end: 120});

            expect(model5.overlaps(model6)).toBe(true);

            var model7 = new FBEvent({start: 50, end: 100}),
                model8 = new FBEvent({start: 20, end: 100});

            expect(model7.overlaps(model8)).toBe(true);

            var model9 = new FBEvent({start: 50, end: 300}),
                model10 = new FBEvent({start: 50, end: 100});

            expect(model9.overlaps(model10)).toBe(true);
        });
    });
});
