var _     = require('underscore'),
    Class = require('evo-elements').Class,
    
    Collector = require('./Collector');

/** Collector merges data from multiple sources
 *
 * The sequence of data is decided according to the time
 * it arrives.
 */
var MuxCollector = Class(Collector, {
    constructor: function (collectors) {
        this._collectors = [];
        this.add(collectors);
    },
    
    add: function (collectors) {
        if (collectors instanceof Collector) {
            collectors = [collectors];
        }
        if (Array.isArray(collectors)) {
            collectors.forEach(function (collector) {
                if (collector instanceof Collector) {
                    this._collectors.push(
                        collector
                            .on('data', this.data.bind(this))
                            .on('flush', this.flush.bind(this))
                    );
                }
            }, this);
        }
        return this;
    }
});

module.exports = MuxCollector;