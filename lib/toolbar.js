var X3D = X3D ? X3D : new Object();
X3D.tb = function() {
    var that = this;
    var log, logname = "lib/toolbar.js";

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
			var newdiv = document.createElement('div');
			var olEle = document.createElement('ol');
			for(var i =0;i<shaders.length;i++){
				var ele = this.createOption(shaders[i].getAttribute('id'));
				olEle.appendChild(ele);
			}
			newdiv.appendChild(olEle);
			itemList.appendChild(newdiv);
		},
		changeShaderDialog : function(){
			if(X3D.main.elementsAreSelected()){
				var items = document.getElementById('items');
				var content = document.getElementById('dialogContent');
				this.deleteAllChilds(content);
				this.addShadersToList(items);
				X3D.dia.getDialog();
			}
		},
		createBoxDialog : function(){
			var content = document.getElementById('dialogContent');
			this.deleteAllChilds(content);
			//alert(content.childNodes.length);
			var items = document.getElementById('items');
			this.deleteAllChilds(items);
			var label = document.createTextNode('Enter Name: ');
			var inputField = document.createElement('input');
			inputField.setAttribute('id','inp1');
			var inputField2 = document.createElement('input');
			inputField2.setAttribute('id','inp2');
			var inputField3 = document.createElement('input');
			inputField3.setAttribute('id','inp3');
			var inputField4 = document.createElement('input');
			inputField4.setAttribute('id','inp4');
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
			var button = document.getElementById('submitButton');
			var onclicktext = button.getAttribute('onclick');
			onclicktext.replace('X3D.tb.submitCreateBoxDialog();','');
			onclicktext = 'X3D.tb.submitCreateBoxDialog();'+onclicktext;
			button.setAttribute('onclick',onclicktext);
			X3D.dia.getDialog();
		},
		isNumeric:function (elem){
			var numericExpression = /^[0-9]+$/;
			if(elem.value.match(numericExpression)){
				return true;
			}else{
				elem.focus();
				return false;
			}
		},
		submitCreateBoxDialog : function(){
			var name = document.getElementById('inp1');
			var x = document.getElementById('inp2');
			var y = document.getElementById('inp3');
			var z = document.getElementById('inp4');
			if(this.isNumeric(x) && this.isNumeric(y) && this.isNumeric(x) && name.value.length >3){
				if(document.getElementById(name)){
				} else {
					X3D.main.createBox(name.value,x.value,y.value,z.value);
				}
			} else {
				alert('Please insert numbers');
			}
		},
		createOption : function(option){
			var optionElem = document.createElementNS('http://www.w3.org/1999/xhtml','li');
			var optButton = document.createElementNS('http://www.w3.org/1999/xhtml','button');
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
