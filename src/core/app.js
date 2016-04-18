var FB = {};

FB.App = (function(){
    "use strict";
    return {
        init: function(options) {
            this.tree = new FBEventTree(options.size);
            var $el = $(options.el || 'body'),
                events = options.events || [],
                model = new FBEventCollection(events);
            this.view = new FBCalendarView({
                $el: $el,
                width: options.width,
                height: options.height,
                size: options.size,
                maxWidth: options.maxWidth,
                model: model
            });
        },
        loadView: function(events) {
            this.view.model.add(events);
            this.tree.reset();
            this.tree.build(this.view.model.collection);
            this.view.render();
        }
    };
})();
