(function(){
    "use strict";
    if (typeof _ !== 'function') {
        return;
    }
    var core = this;
    var FBEvent = core.FBEvent = function(attrs) {
            this.id = _.uniqueId('e');
            this.attributes = attrs || {};
            this.parent = null;
            this.children = [];
            return this;
        };
    _.extend(FBEvent.prototype, {
        get: function(attr) {
            return this.attributes[attr];
        },
        overlaps: function(other) {
            if (this.get('start') <= other.get('start') && other.get('start') < this.get('end')) {
                return true;
            } else if (other.get('start') <= this.get('start') && this.get('start') < other.get('end')) {
                return true;
            } else if (this.get('start') === other.get('start') || this.get('end') === other.get('end')) {
                return true;
            }
            return false;
        },
        length: function() {
            if (_.isUndefined(this.get('start')) || _.isUndefined(this.get('end'))) {
                return 0;
            }
            return this.get('end') - this.get('start');
        }
    });
}).call(this);
