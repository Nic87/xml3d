var X3D = X3D ? X3D : new Object();
X3D.tb = function() {
    var that = this;
    var log, logname = "lib/toolbar.js";

    return {
        init: function() {
            log = X3D.log.get(logname);
            log.info("foo");
        },
        addCube: function() {
            alert("wie sie sehen sehn sie nix");
        },
    };
}();
