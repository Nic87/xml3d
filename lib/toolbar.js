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
				X3D.dia.getDialog();
			}
		},
		createBoxDialog : function(){
			var content = document.getElementById('dialogContent');
			var label = document.createTextNode('Enter Name: ');
			var inputField = document.createElement('input');
			var inputField2 = document.createElement('input');
			var inputField3 = document.createElement('input');
			var inputField4 = document.createElement('input');
			var label2 = document.createTextNode('Enter X:');
			var label3 = document.createTextNode('Enter Y:');
			var label4 = document.createTextNode('Enter Z:');
			var brs = document.createElement('br');
			var brs2 = document.createElement('br');
			var brs3 = document.createElement('br');
			var brs4 = document.createElement('br');
			content.appendChild(label);
			content.appendChild(inputField);
			content.appendChild(brs);
			content.appendChild(label2);
			content.appendChild(inputField2);
			content.appendChild(brs2);
			content.appendChild(label3);
			content.appendChild(inputField3);
			content.appendChild(brs3);
			content.appendChild(label4);
			content.appendChild(inputField4);
			X3D.dia.getDialog();
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