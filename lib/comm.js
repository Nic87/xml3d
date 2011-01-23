var X3D = X3D ? X3D : new Object();
X3D.ws = function() {
    var that = this;
    var wsuri = "ws://localhost:1337/";
    var ws, log, logname = "lib/comm.js";
    var p = {};

    this.init = function() {
        connect();
        log = X3D.log.get(logname);
        log.info("initialized");
   }

    this.connect = function () {
        ws = new WebSocket(wsuri);
        ws.onopen = function (event) { p.onOpen(event); };
        ws.onclose = function (event) { p.onClose(event); };
        ws.onmessage = function (event) { p.onMessage(event); }
        ws.onerror = function (event) { p.onError(event); };
    }

    this.reconnect = function() {
        log.info("reconnect");
        ws.close();
        connect();
    }

    p.onOpen = function(event) {
        log.info("connection created");
        X3D.em.connected(true);
    }

    p.onClose = function(event) {
        log.info("connection closed");
        X3D.em.connected(false);
    }

    p.onMessage = function(event) {
        log.info("received msg "+event.data);
    }

    p.onError = function(event) {
        log.error(event.data);
    }

    p.doSend = function(data) {
        ws.send(data);
        log.info("sent "+data);
    }
    
    return this;
}();
