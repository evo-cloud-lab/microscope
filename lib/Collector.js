var Class = require('evo-elements').Class;

/** Abstract Collector
 *
 * A Collector is a EventEmitter which simply
 * emits 'data' when a chunk of log data is available.
 * It provides a internal (protected) method used by
 * subclasses which implements the collector for notifying
 * when log data arrives.
 */
var Collector = Class(process.EventEmitter, {
    
    /** Notify when log data is available
     *
     * @param {Buffer} chunk the bytes of log data, null/undefined for flush
     */
    data: function (chunk) {
        this.emit('data', chunk);
    },
    
    /** Flush data when used with cache */
    flush: function () {
        this.emit('flush');
    }
});

module.exports = Collector;