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
		addShadersToList: function(itemList){
			var shaders = X3D.main.getElementsOfType('shader');
			var selectList = itemList;
			this.deleteAllChilds(selectList);
			for(var i =0;i<shaders.length;i++){
				var ele = this.createOption(shaders[i].getAttribute('id'));
				selectList.appendChild(ele);
			}
		},
		changeShaderDialog : function(){
			if(X3D.main.elementsAreSelected()){
				var items = document.getElementById('items');
				this.addShadersToList(items);
				X3D.dia.getDialog(null);
			}
		},
		createOption : function(option){
			var optionElem = document.createElement('li');
			var optButton = document.createElement('button');
			optButton.setAttribute('id',option);
			var text = document.createTextNode(option);
			optButton.appendChild(text);
			optButton.setAttribute('onclick','X3D.main.changeShader("'+option+'");X3D.dia.hm("box");');
			optionElem.appendChild(optButton);
			
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