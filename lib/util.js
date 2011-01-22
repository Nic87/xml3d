var X3D = X3D ? X3D : new Object();
X3D.log = function() {
    var that = this;

    return {
        init: function(element) {
            that.el = element;
        },

        all: function(type, msg) {
            msg = (new Date()).toLocaleString()+" "+type+": "+msg+"\n";
            that.el.appendChild(document.createTextNode(msg));
            that.el.scrollTop = that.el.scrollHeight;
        },

        info: function (msg) {
            that.all("INFO", msg);
        },
    
        warn: function (msg) {
            that.all("WARN", msg);
        },
        
        error: function (msg) {
            that.all("ERR", msg);
        },

        debug: function (msg) {
            that.all("DEBUG", msg);
        }
    };
}();
