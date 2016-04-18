describe('Data.FBEventCollection', function() {
    it('should initialize the collection with event objects', function() {
        var expectedEvents = [
                {start: 0, end: 100},
                {start: 100, end: 200}
            ],
            model = new FBEventCollection(expectedEvents);

        expect(model.collection.length).toBe(expectedEvents.length);
        _.each(model.collection, function(fbEvent, index){
            var actualStartTime = fbEvent.get('start'),
                actualEndTime = fbEvent.get('end'),
                expectedStartTime = expectedEvents[index].start,
                expectedEndTime = expectedEvents[index].end;

            expect(actualStartTime).toBe(expectedStartTime);
            expect(actualEndTime).toBe(expectedEndTime);
        });
    });

    it('should be able to append to the existing set', function() {
        var events = [
                {start: 0, end: 100},
                {start: 100, end: 200}
            ],
            model = new FBEventCollection(events);

        var expectedEvent = {
            start: 300,
            end: 400
        };
        model.add(expectedEvent);
        var addedEvent = _.last(model.collection),
            actualStartTime = addedEvent.get('start'),
            actualEndTime = addedEvent.get('end'),
            expectedStartTime = expectedEvent.start,
            expectedEndTime = expectedEvent.end;

        expect(actualStartTime).toBe(expectedStartTime);
        expect(actualEndTime).toBe(expectedEndTime);
    });

    it('should filter out the invalid event objects', function() {
        var invalidEvents = [
                {start: -10, end: 200},
                {start: 100, end: 100},
                {start: 100, end: 50}
            ],
            model = new FBEventCollection(invalidEvents);
        expect(model.collection.length).toBe(0);
    });

    it('should keep the collection in order', function() {
        var events = [
                {start: 100, end: 200},
                {start: 0, end: 100},
                {start: 100, end: 150}
            ],
            model = new FBEventCollection(events);

        _.each(model.collection, function(event, index){
            if(index > 0) {
                var prevEvent = model.collection[index - 1],
                    //order by start time ascend, and length of the time descend
                    isSorted = event.get('start') > prevEvent.get('start') ||
                        (event.get('start') == prevEvent.get('start') && event.length() <= prevEvent.length());
                expect(isSorted).toBe(true);
            }
        });
    });
});
