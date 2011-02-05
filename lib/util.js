var X3D = X3D ? X3D : new Object();
X3D.log = function() {
    var that = this;
    var el;

    var logger = function(name) {
        this.name = name;

        this.all = function(type, msg) {
            var date = new Date();

            /* hopefully our cpu is fast enough to handle this within
             * milliseconds ;) */
            var month = (date.getMonth() < 10 ? "0" : "")+(date.getMonth()+1);
            var hours = (date.getHours() < 10 ? "0" : "")+date.getHours();
            var minutes = (date.getMinutes() < 10 ? "0" : "")+date.getMinutes();
            var seconds = (date.getSeconds() < 10 ? "0" : "")+date.getSeconds();
            var time = date.getDate()+"/"+month+"/"+(date.getYear()+1900)
                +" "+hours+":"+minutes+":"+seconds;
            msg = time+" "+type+" ("+name+"): "+msg+"\n";
            el.appendChild(document.createTextNode(msg));
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
            el = element
        },

        get: function(name) {
            return new logger(name);
        }
    };
}();

X3D.dom = function() {
    return {
        deleteAllChilds: function(parent) {
            while (parent.hasChildNodes()) {
                document.removeChild(parent.lastChild);
            }
        },
    };
}();
