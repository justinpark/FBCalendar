(function(){
    "use strict";
    if (typeof _ !== 'function') {
        return;
    }
    var core = this;
    var FBCalendarView = core.FBCalendarView = function(options) {
        this.initialize(options);
        return this;
    };
    _.extend(FBCalendarView.prototype, {
        $el: null,
        initialize: function(options) {
            this.model = options.model;
            this.$el = options.$el;
            this.size = options.size || 0;
            this.width = options['width'] || this.$el.width();
            this.height = options['height'] || this.$el.height();
            this.maxWidth = options.maxWidth || this.width;
            this.render();
        },
        render: function() {
            this.$el.children().remove();
            _.each(this.model.collection, function(fbEvent){
                var width = _.min([(this.width / (fbEvent.maxDepth + 1)), this.maxWidth]),
                    minToPixel = (this.height / this.size),
                    top = fbEvent.get('start') * minToPixel,
                    left = width * fbEvent.depth,
                    height = fbEvent.length() * minToPixel,
                    title = fbEvent.get('title') || 'Sample Item',
                    description = fbEvent.get('location') || 'Sample Location',
                    event = $('<div></div>').css({
                        position: 'absolute',
                        top: top,
                        height: height,
                        left: left,
                        width: width
                    })
                    .addClass('event')
                    .html('<dl><dt>' + title + '</dt><dd>' + description + '</dd></dl>');
                this.$el.append(event);
            }, this);
        },
        setMaxWidth: function(maxWidth) {
            if (maxWidth < 0 || maxWidth > this.width) {
                return;
            }
            this.maxWidth = maxWidth;
            this.render();
        }
    });
}).call(this);
