var X3D = X3D ? X3D : new Object();
X3D.ws = function() {
    var that = this;
    var wsuri = "ws://localhost:1337/";
    var ws, log, logname = "lib/comm.js";
    var p = {}, status = -1;

    // this was taken from
    // http://dev.w3.org/html5/websockets/#the-websocket-interface
    const CONNECTING = 0;
    const OPEN = 1;
    const CLOSING = 2;
    const CLOSED = 3;

    var timer;

    this.init = function() {
        log = X3D.log.get(logname);
        log.info("initialized");
        connect();
   }

    this.connect = function () {
        ws = new WebSocket(wsuri);
        
        // we do not want this method for each try
        if (!timer) log.info("connecting to "+wsuri);

        status = CONNECTING;
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

    // XXX: STILL BUGGY, need to have a look ASAP
    this.toggle = function() {
        if (status == OPEN) {
            ws.close();
            timer = "notnull";
        } else if ((status == CLOSED || status == CONNECTING) && timer != null) {
            log.info("shutting down connection on purpose");
            clearTimeout(timer);
            timer = null;
            ws.close();
        } else {
            connect();
        }
    }

    p.onOpen = function(event) {
        log.info("connection created");
        X3D.em.connected(true);
        status = OPEN;

        clearTimeout(timer);
        timer = null;
    }

    // BUGGY
    p.onClose = function(event) {
        // if we set this, we cannot know whether
        status = CLOSED;

        if (!timer) {
            log.warn("connection closed, retrying")
            timer = setTimeout(connect, 2000);
        } else timer = null;

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
