var X3D = X3D ? X3D : new Object();
X3D.log = function() {
    var that = this;
    var el;

    var logger = function(name) {
        this.name = name;

        this.all = function(type, msg) {
            var date = new Date();
            var month = date.getMonth()+1;
            var time = date.getDate()+"/"+(month < 10 ? "0" : "")+month+"/"+(date.getYear()+1900)
                +" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
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
