var X3D = X3D ? X3D : new Object();
X3D.tb = function() {
    var that = this;
    var log, logname = "lib/toolbar.js";
	var selection;
    return {
        init: function() {
            log = X3D.log.get(logname);
            log.info("initialized");
        },
        addCube: function() {
            alert("wie sie sehen sehn sie nix");
        },
		deleteAllChilds: function(element){
			if ( element.hasChildNodes() )
					{
						while ( element.childNodes.length >= 1 )
						{
							element.removeChild( element.firstChild );       
						} 
					}
		},
		addShadersToList: function(){
			var shaders = X3D.main.getElementsOfType('shader');
			var selectList = document.getElementById('selectable');
			this.deleteAllChilds(selectList);
			for(var i =0;i<shaders.length;i++){
				var ele = this.createOption(shaders[i].getAttribute('id'));
				selectList.appendChild(ele);
			}
		},
		createOption : function(option){
			var optionElem = document.createElement('li');
			optionElem.setAttribute('class','ui-widget-content');
			optionElem.setAttribute('id',option);
			var text = document.createTextNode(option);
			optionElem.appendChild(text);
			return optionElem;
		},
		setSelection : function(element){
			selection = element;
		},
		getSelection : function(){
			return selection;
		},
		
    };
}();