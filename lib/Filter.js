var Class = require('js-class'),

    Collector = require('./Collector');
    
/** Filter is a down-stream collector
 *
 * It is usually for converting data
 */
var Filter = Class(Collector, {
    constructor: function (upStreamCollector) {
        this.source = upStreamCollector
            .on('data', this.onData.bind(this))
            .on('flush', this.onFlush.bind(this));
    },
    
    onData: function () {
        this.data.apply(this, arguments);
    },
    
    onFlush: function () {
        this.flush.apply(this, arguments);
    }
});

module.exports = Filter;