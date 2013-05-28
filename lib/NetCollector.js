var net   = require('net'),
    Class = require('evo-elements').Class,
    
    Collector = require('./Collector');

/** Collector using TCP/Unix socket as source */
var NetCollector = Class(Collector, {
    constructor: function (server) {
        this.server = server
            .on('connection', this.onConnection.bind(this));
    },
    
    onConnection: function (connection) {
        connection
            .on('data', this.data.bind(this))
            .on('end', function () { this.flush(); }.bind(this))
            .on('close', function () { this.flush(); }.bind(this));
    }
}, {
    statics: {
        /** Factory function
         *
         * If any arguments are provided, they follow the same signature
         * as net.Server.listen. Otherwise the collector is created with
         * a net.Server instance never listens.
         */
        create: function () {
            var collector = new NetCollector(new net.createServer());
            if (arguments.length > 0) {
                collector.server.listen.apply(collector.server, arguments);
            }
            return collector;
        }
    }
});

module.exports = NetCollector;