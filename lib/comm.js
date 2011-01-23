var X3D = X3D ? X3D : new Object();
X3D.ws = function() {
    var that = this;
    var wsuri = "ws://localhost:1337/";
    var ws, log, logname = "lib/comm.js";

    return {
        init: function() {
            ws = new WebSocket(wsuri);
            ws.onopen = function (event) { onOpen(event); };
            ws.onclose = function (event) { onClose(event); };
            ws.onmessage = function (event) { onMessage(event); }
            ws.onerror = function (event) { onError(event); };
            log = X3D.log.get(logname);
            log.info("initialized");
        },

        onOpen: function(event) {
            log.info("connection created");
        },

        onClose: function(event) {
            log.info("connection closed");
        },

        onMessage: function(event) {
            log.info("received msg "+event.data);
        },

        onError: function(event) {
            log.error(event.data);
        },

        doSend: function(data) {
            ws.send(data);
            log.info("sent "+data);
        }
    };
}();
