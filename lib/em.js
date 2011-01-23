var X3D = X3D ? X3D : new Object();
X3D.em = new function() {
    var statusel, instance;
    var log, logname = "lib/em.js";

    this.init = function(statuselement) {
        statusel = statuselement;
        log = X3D.log.get(logname);
    };

    this.connected = function(state) {
        //log.info("connected: "+state);
        if (state != null) {
            connected = state;
            statusel.css('background-color', state ? '#00ff00' : '#ff0000');
        }

        return connected;
    };

    return this;
}();
