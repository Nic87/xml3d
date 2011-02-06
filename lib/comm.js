var X3D = X3D ? X3D : new Object();
X3D.ws = function() {
    var wsuri = "ws://localhost:1337/";
    var ws, log, logname = "lib/comm.js";
    var p = {}, status = -1;
    var reconnect = true;
    var timer = null

    /* This was taken from the standards specification. We don't use CLOSING
     * http://dev.w3.org/html5/websockets/#the-websocket-interface */
    const CONNECTING = 0;
    const OPEN       = 1;
    const CLOSING    = 2;
    const CLOSED     = 3;

    const RECONNECT_INTERVAL = 500;

    this.init = function() {
        log = X3D.log.get(logname);
        log.info("initialized");
        this.connect();
    }

    this.connect = function () {
        ws = new WebSocket(wsuri);
        
        if (!timer) log.info("connecting to "+wsuri);

        status = CONNECTING;
        ws.onopen = function (event) { p.onOpen(event); };
        ws.onclose = function (event) { p.onClose(event); };
        ws.onmessage = function (event) { p.onMessage(event); }
        ws.onerror = function (event) { p.onError(event); };
    }

    this.toggle = function() {
        if (status == OPEN) {
            log.info("disconnecting on purpose");
            reconnect = false;
            ws.close();
        } else if (status == CLOSED) {
            reconnect = true;
            connect();
        }
    }

    p.onOpen = function(event) {
        status = OPEN;
        timer = null;
        X3D.em.publish("connected", true);
        log.info("connection created");
    }

    p.onClose = function(event) {
        status = CLOSED;
        X3D.em.publish("connected", false);

        if (!timer) log.warn("connection closed");

        if (reconnect) {
            if (!timer) log.info("trying to reconnect");
            timer = setTimeout(connect, RECONNECT_INTERVAL);
        }
    }

    p.onMessage = function(event) {
        X3D.em.publish("data", event.data);
        log.info("received msg "+event.data);
    }

    p.onError = function(event) {
        X3D.em.publish("error", event.data);
        log.error(event.data);
    }

    p.doSend = function(data) {
        ws.send(data);
        X3D.em.publish("sent", data);
        log.info("sent "+data);
    }
    
    return this;
}();
