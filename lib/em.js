var X3D = X3D ? X3D : new Object();
X3D.em = new function() {
    var statusel;
    var instance;

    this.init = function(statuselement) {
        statusel = statuselement;
    };

    this.connected = function(state) {
        if (state != null) {
            connected = state;
            statusel.css('background-color', state ? '#00ff00' : '#ff0000');
        }

        return connected;
    };

    return this;
}();
