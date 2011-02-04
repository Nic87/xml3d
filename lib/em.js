var X3D = X3D ? X3D : new Object();
X3D.em = new function() {
    var log, logname = "lib/em.js";
    var events = new Array();

    this.init = function(statuselement) {
        log = X3D.log.get(logname);
    };

    /* simple pubsub */
    this.subscribe = function(event, cb) {
        if (events[event] == null)
            events[event] = [cb];
        else events[event] += cb;
        console.log(events[event]);
    };

    this.publish = function(event, data) {
        for (var i in events[event]) {
            events[event][i](data);
        }
    };

    return this;
}();
