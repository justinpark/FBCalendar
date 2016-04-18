describe('Data.FBEventTree', function() {
    it('should build two independant nodes', function() {
        /**
         * Nodes shape:
         * ---
         * |0|
         * | |
         * ___
         * ---
         * |1|
         * ---
         */
        var events = [
                {start: 0, end: 100},
                {start: 100, end: 150}
            ],
            model = new FBEventCollection(events);

        var tree = new FBEventTree(720);
        tree.build(model.collection);

        expect(model.collection[0].depth).toBe(0);
        expect(model.collection[0].children.length).toBe(0);
        expect(model.collection[1].depth).toBe(0);
        expect(model.collection[1].children.length).toBe(0);
    });
    it('should build one solid node and two overlap nodes', function() {
        /**
         * ---
         * |0|
         * ---
         * --- ---
         * |1| |2|
         * | | ___
         * ___
         */
        var events = [
                {start: 100, end: 200},
                {start: 0, end: 100},
                {start: 100, end: 150}
            ],
            model = new FBEventCollection(events);

        var tree = new FBEventTree(720);
        tree.build(model.collection);

        expect(model.collection[0].depth).toBe(0);
        expect(model.collection[0].children.length).toBe(0);
        expect(model.collection[1].depth).toBe(0);
        expect(model.collection[1].children.length).toBe(1);
        expect(model.collection[2].depth).toBe(1);
        expect(model.collection[2].children.length).toBe(0);
        expect(model.collection[1].children[0].id).toBe(model.collection[2].id);
    });

    it('should build three overlap nodes', function() {
        /**
         * ---
         * |0| ___
         * --- |1|
         * --- | |
         * |2| ---
         * | |
         * ___
         */
        var events = [
                {start: 100, end: 200},
                {start: 0, end: 100},
                {start: 50, end: 150}
            ],
            model = new FBEventCollection(events);

        var tree = new FBEventTree(720);
        tree.build(model.collection);

        expect(model.collection[0].depth).toBe(0);
        expect(model.collection[0].children.length).toBe(1);
        expect(model.collection[1].depth).toBe(1);
        expect(model.collection[1].children.length).toBe(0);
        expect(model.collection[0].children[0].id).toBe(model.collection[1].id);
        expect(model.collection[2].depth).toBe(0);
        expect(model.collection[2].children.length).toBe(0);
        expect(model.collection[2].maxDepth).toBe(1);
        expect(model.collection[0].maxDepth).toBe(model.collection[2].maxDepth);

        //level links
        expect(tree.levels[0].length).toBe(2);
        expect(tree.levels[1].length).toBe(1);
    });

    it('should build three linked nodes', function() {
        /**
         * ---
         * |0| ___
         * | | |1| ___
         * --- | | | |
         *     --- |2|
         *         ---
         */
        var events = [
                {start: 70, end: 200},
                {start: 0, end: 100},
                {start: 50, end: 150}
            ],
            model = new FBEventCollection(events);

        var tree = new FBEventTree(720);
        tree.build(model.collection);

        expect(model.collection[0].depth).toBe(0);
        expect(model.collection[0].children.length).toBe(1);
        expect(model.collection[1].depth).toBe(1);
        expect(model.collection[1].children.length).toBe(1);
        expect(model.collection[0].children[0].id).toBe(model.collection[1].id);
        expect(model.collection[2].depth).toBe(2);
        expect(model.collection[2].children.length).toBe(0);
        expect(model.collection[2].maxDepth).toBe(2);
        expect(model.collection[0].maxDepth).toBe(model.collection[2].maxDepth);

        //level links
        expect(tree.levels[0].length).toBe(1);
        expect(tree.levels[1].length).toBe(1);
        expect(tree.levels[2].length).toBe(1);
    });

    it('should build one overlap link containing two linked children', function() {
        /**
         * ---
         * |0| --- ---
         * | | |1| |2|
         * | | | | ---
         * | | --- |3|
         * ---     ---
         */
        var events = [
                {start: 50, end: 120},
                {start: 0, end: 200},
                {start: 50, end: 150},
                {start: 130, end: 180}
            ],
            model = new FBEventCollection(events);

        var tree = new FBEventTree(720);
        tree.build(model.collection);
        expect(model.collection[0].depth).toBe(0);
        expect(model.collection[0].children.length).toBe(1);
        expect(model.collection[1].depth).toBe(1);
        expect(model.collection[1].children.length).toBe(2);
        expect(model.collection[0].children[0].id).toBe(model.collection[1].id);
        expect(model.collection[2].depth).toBe(2);
        expect(model.collection[2].children.length).toBe(0);
        expect(model.collection[1].maxDepth).toBe(2);
        expect(model.collection[2].maxDepth).toBe(2);
        expect(model.collection[0].maxDepth).toBe(model.collection[2].maxDepth);

        //level links
        expect(tree.levels[0].length).toBe(1);
        expect(tree.levels[1].length).toBe(1);
        expect(tree.levels[2].length).toBe(2);
    });
});
