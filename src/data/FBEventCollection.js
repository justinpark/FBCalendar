(function(){
    "use strict";
    if (typeof _ !== 'function') {
        return;
    }
    var core = this;
    var FBEventCollection = core.FBEventCollection = function(events) {
        this.collection = [];
        this.add(events);
        return this;
    };;
    _.extend(FBEventCollection.prototype, {
        add: function(models) {
            if (!models) {
                return;
            }
            models = _.isArray(models) ? models : [models];
            _.each(models, function(model) {
                var fbEvent = new core.FBEvent(model);
                this._add(fbEvent);
            }, this);
            this._filterAndSort();
        },
        reset: function(models) {
            this.collection = [];
            this.add(models);
        },
        _add: function(fbEvent) {
            this.collection.push(fbEvent);
        },
        _filterAndSort: function() {
            this.collection = _.chain(this.collection)
                .filter(function(event) {
                    var startTime = event.get('start'),
                        length = event.length();
                    return startTime >= 0 && length > 0;
                }).sortBy(function(event) {
                    return event.get('start') * 1000 + (1000 - event.get('end'));
                }).value();
        }
    });
}).call(this);
