var X3D = X3D ? X3D : new Object();
X3D.log = function() {
    var that = this;
    var el;

    return {
        init: function(element) {
            el = element;
        },

        all: function(type, msg) {
            msg = (new Date()).toLocaleString()+" "+type+": "+msg+"\n";
            el.append(document.createTextNode(msg));
            el.scrollTop = el.scrollHeight;
        },

        info: function (msg) {
            this.all("INFO", msg);
        },
    
        warn: function (msg) {
            this.all("WARN", msg);
        },
        
        error: function (msg) {
            this.all("ERR", msg);
        },

        debug: function (msg) {
            this.all("DEBUG", msg);
        }
    };
}();
