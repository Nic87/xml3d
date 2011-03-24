var X3D = X3D ? X3D : new Object();
X3D.tb = function() {
    var that = this;
    var log, logname = "lib/toolbar.js";
	var selection='';
    return {
        init: function(statusel) {
            log = X3D.log.get(logname);
            log.info("initialized");
            X3D.em.subscribe("connected", function(state) {
                statusel.css('background-color', state ? '#00ff00' : '#ff0000');
            });
 
        },
        addShadersToList: function(itemList){
            var shaders = X3D.main.getElementsOfType('shader');
            X3D.util.deleteAllChilds(itemList);
            //var newdiv = document.createElement('div');
            //var olEle = document.createElement('ol');
            //olEle.setAttribute('id','shaders');
            for(var i =0;i<shaders.length;i++){
                var ele = this.createOption(shaders[i]);
                itemList.appendChild(ele);
            }
        },
        addDataToList : function(items){
            var datas = X3D.main.getElementsOfType('group');
            X3D.util.deleteAllChilds(items);
            for(var i =0;i<datas.length;i++){
                var ele = this.createOption(datas[i]);
                items.appendChild(ele);
            }
        },
        changeShaderDialog : function(){
            if(X3D.main.elementsAreSelected()){
                var items = document.getElementById('items');
                var content = document.getElementById('dialogContent');
                X3D.util.deleteAllChilds(content);
                X3D.util.deleteAllChilds(items);
                this.addShadersToList(items);
                var button = document.getElementById('submitButton');
                var onclicktext = button.getAttribute('onclick');
                onclicktext.replace('X3D.tb.submitChangeShader();','');
                onclicktext = 'X3D.tb.submitChangeShader();'+onclicktext;
                button.setAttribute('onclick',onclicktext);
                X3D.dia.getDialog();
            }
        },
        createBoxDialog : function(){
            var content = document.getElementById('dialogContent');
            X3D.util.deleteAllChilds(content);
            var items = document.getElementById('items');
            X3D.util.deleteAllChilds(items);
            this.addDataToList(items);
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
        submitCreateBoxDialog : function(){
            var x = document.getElementById('inp2').value;
            var y = document.getElementById('inp3').value;
            var z = document.getElementById('inp4').value;
            if(X3D.util.isNumeric(x) && X3D.util.isNumeric(y) && X3D.util.isNumeric(z) && selection != null){
                if(document.getElementById(name)){
                } else {
                    //X3D.main.createElement(name.value,x.value,y.value,z.value, selection);
					log.info('Selection: '+selection);
					var texts = selection.split(':');
					if(texts.length!=2)log.error('Text array not correct');
					X3D.main.createElementFromGeneric(X3D.gen.getGUID(),texts[0],texts[1], x, y, z);
                }
            } else {
                alert('please insert numbers');
            }
            selection = null;
        },
        submitChangeShader : function(){
			//var texts = selection.split(':');
            X3D.main.changeShader(selection);
            selection = null;
        },
        createOption : function(option){
            var optionElem = document.createElementNS('http://www.w3.org/1999/xhtml','li');
            var optButton = document.createElementNS('http://www.w3.org/1999/xhtml','button');
            //optButton.setAttribute('id',option);
            var text = document.createTextNode(option);
            optButton.appendChild(text);
            optButton.setAttribute('onclick','X3D.tb.setSelection("'+option+'");')
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
