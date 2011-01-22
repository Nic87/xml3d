var X3D = X3D ? X3D : new Object();
X3D.tb = function() {
    var that = this;

    return {
        init: function() { X3D.log.get("toolbar").info("foo"); },
        addCube: function() {
            alert("wie sie sehen sehn sie nix");
        },
    };
}();
