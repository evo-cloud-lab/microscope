var Class     = require('evo-elements').Class,

    Filter = require('./Filter');
    
/** Converts raw data into lines
 *
 * The 'data' event will report with a String argument as a line.
 */
var LineSplitter = Class(Filter, {
    constructor: function (source) {
        Filter.prototype.constructor.call(this, source);
        this._line = '';
    },
    
    onData: function (chunk) {
        if (Buffer.isBuffer(chunk)) {
            chunk = chunk.toString();
        }
        if (typeof(chunk) != 'string') {
            return;
        }
        
        var lines = chunk.split('\n');
        for (var i = 0; i < lines.length; i ++) {
            this._line += lines[i];
            if (i + 1 < lines.length) {
                this.onFlush();
            }
        }
    },
    
    onFlush: function () {
        if (this._line.length > 0) {
            var line = this._line;
            this._line = '';
            this.data(line);
        }
    }
});

module.exports = Filter;