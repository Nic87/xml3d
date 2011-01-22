var X3D = X3D ? X3D : new Object();
X3D.log = function() {
    var that = this;
    var el;

    var logger = function(name) {
        this.name = name;

        this.all = function(type, msg) {
            msg = (new Date()).toLocaleString()+" "+type+" ("+name+"): "+msg+"\n";
            el.append(document.createTextNode(msg));
            el.scrollTop = el.scrollHeight;
        }

        this.info = function (msg) {
            this.all("INFO", msg);
        };
    
        this.warn = function (msg) {
            this.all("WARN", msg);
        };
        
        this.error = function (msg) {
            this.all("ERR", msg);
        };

        this.debug = function (msg) {
            this.all("DEBUG", msg);
        };
    };

    return {
        init: function(element) {
            this.el = element
        },

        get: function(name) {
            return new logger(name);
        }
    };
}();
