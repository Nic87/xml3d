var X3D = X3D ? X3D : new Object();
X3D.ws = function() {
    //var wsuri = "ws://localhost:1337/";
    //var wsuri = "ws://134.155.248.99:8181/websession";
    var wsuri = "ws://127.0.0.1:8181/websession";
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
        var obj = JSON.parse(event.data);
        log.debug("xml3d lib: "+org.xml3d);

        switch (obj.actionType) {
            case 'update':
                org.xml3d.setParameter(obj.elementId, obj.fieldName, obj.value);
                break;
            case 'creation':
                log.debug("creation stub");

                // generic element
                var newElement = X3D.main.createElementFromGeneric(obj.groupId, obj.genericId, 0, 0, 0);
                var transformerName = "#posTransformer"+newElement;

                // transformer
                org.xml3d.setParameter(transformerName, 'translation', obj.translation);
                org.xml3d.setParameter(transformerName, 'rotation', obj.rotation);
                org.xml3d.setParameter(transformerName, 'scale', obj.scale);

                log.debug("obj created");

                break;
            case 'delete':
                X3D.main.killElementWithFamily(obj.elementId);
                break;
        }
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
