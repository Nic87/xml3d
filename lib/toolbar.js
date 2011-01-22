var Toolbar = function(el) {
    var self = this;

    self.addCube = function() {
        alert("wie sie sehen sehn sie nix");
    }
}

var x3w = {
    init: function() {
        $('#expand').click(function() {
            $('#debug').fadeToggle('fast', function() {
                $('collexp').css('crop', 'rect(0, 15, 15, 0)');
            });
        });
    },
}

var tb = new Toolbar($('#toolbar'));
