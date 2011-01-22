var X3D = X3D ? X3D : new Object();
X3D.ws = function() {
    var that = this;
    var wsuri = "ws://localhost:1337/";
    var ws;

    return {
        init: function() {
            ws = new WebSocket(wsuri);
            ws.onopen = function (event) { onOpen(event); };
            ws.onclose = function (event) { onClose(event); };
            ws.onmessage = function (event) { onMessage(event); }
            ws.onerror = function (event) { onError(event); };
        },

        onOpen: function(event) {
            X3D.log.info("connection created");
        },

        onClose: function(event) {
            X3D.log.info("connection closed");
        },

        onMessage: function(event) {
            X3D.log.info("received msg "+event.data);
        },

        onError: function(event) {
            X3D.log.error(event.data);
        },

        doSend: function(data) {
            X3D.log.info("sent "+data);
            ws.send(data);
        }
    };
}();
