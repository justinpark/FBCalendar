(function(){
    "use strict";
    if (typeof _ !== 'function') {
        return;
    }
    var core = this,
        FBEventTree = core.FBEventTree = function(size) {
            this.root = null;
            this.levels = {};
            this.size = size || 0;
            this.collection = null;
            return this;
        };
    _.extend(FBEventTree.prototype, {
        build: function(list) {
            this.collection = list;
            this.root = new core.FBEvent({
                start: 0,
                end: this.size
            });
            this.root.depth = -1;
            _.each(list, function(item){
                this.traverse(this.root, item, -1);
            }, this);
            this._setMaxDepth(list);
        },
        /**
         * Using BFT in order to build the tree in level order.
         */
        traverse: function(node, item, depth) {
            if (node.overlaps(item)) {
                //BFT (levels)
                var nextDepth = depth + 1;
                if(_.some(this.levels[nextDepth], function(subItem) {
                        return this.traverse(subItem, item, nextDepth);
                    }, this)) {
                    return true;
                }

                this.append(node, item, depth);
                return true;
            }
            return false;
        },
        /**
         * Append the item against the node
         */
        append: function(node, item, depth) {
            item.depth = depth + 1;

            //add item to level depth
            this.levels[item.depth] = this.levels[item.depth] || [];
            this.levels[item.depth].push(item);

            //add to nodes children
            node.children.push(item);

            //set parent.
            item.parent = node;
        },
        _setMaxDepth: function(list) {
            var roots = {};
            _.each(list, function(node) {
                if (node.children.length > 0) {
                    return;
                }
                var maxDepth = 0;
                while(node.parent) {
                    maxDepth = _.max([maxDepth, node.depth, node.maxDepth || 0]);
                    if(node.parent.depth == -1) {
                        node.maxDepth = maxDepth;
                        roots[node.id] = node;
                    }
                    node = node.parent;
                }
            }, this);
            _.each(roots, function(node) {
                this._setChildrenMaxDepth(node, node.maxDepth);
            }, this);

            //test collision among the next level levels
            //set maxDepth with collision node's maxDepth
            _.each(list, function(node) {
                var nextDepth = node.maxDepth + 1,
                    levels = this.levels[nextDepth];
                while(levels && levels.length > 0) {
                    _.each(levels, function(sibling) {
                        if (sibling.overlaps(node)) {
                            node.maxDepth = _.max([node.maxDepth, sibling.maxDepth]);
                        }
                    }, this);
                    levels = this.levels[++nextDepth];
                }
            }, this);
        },
        _setChildrenMaxDepth: function(node, depth) {
            node.maxDepth = depth;
            _.each(node.children, function(child) {
                this._setChildrenMaxDepth(child, depth);
            }, this);
        },
        reset: function() {
            this.root = null;
            this.levels = {};
            _.each(this.collection, function(node) {
                node.parent = null;
                node.maxDepth = null;
                node.depth = 0;
            }, this);
            this.collection = null;
        }
    });
}).call(this);

