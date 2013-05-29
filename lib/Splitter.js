var _     = require('underscore'),
    Class = require('js-class'),
    
    Filter = require('./Filter');

/** Collector pushes data to multiple next-level collectors
 */
var Splitter = Class(Filter, {
    constructor: function (source, collectors) {
        Filter.prototype.constructor.call(this, source);
        this._collectors = [];
        this.add(collectors);
    },
    
    add: function (collectors) {
        if (collectors instanceof Collector) {
            this._collectors.push(collectors);
        } else if (Array.isArray(collectors)) {
            collectors.forEach(function (collector) {
                if (collector instanceof Collector) {
                    this._collectors.push(collector);
                }
            }, this);
        }
        return this;
    },
    
    onData: function () {
        var args = arguments;
        this._collectors.forEach(function (collector) {
            collector.data.apply(collector, args);
        });
    },
    
    onFlush: function () {
        var args = arguments;
        this._collectors.forEach(function (collector) {
            collector.flush.apply(collector, args);
        });
    }
});

module.exports = Splitter;