/*
	Script: toolbar.js
	Author: Simon, Holger, Lukas
	Description: This script is responsible for handling interaction 
	with the toolbar in the user interace.  Until now it also includes the Dialog
	Instances such as create element, create room, change color, change texture.
*/
var X3D = X3D ? X3D : new Object();
X3D.tb = function() {
    var that = this;
    var log, logname = "lib/toolbar.js";
    var selection='';
	var a = 0;
    var b = 0;
    var h = 0;
	var id_1;
	var id_2;
	var id_3;
	var id_4;
	var id_5;
	var status_1;
	var status_2;
	var status_3;
	var status_4;
	var status_5;
    return {
        init: function(statusel) {
            log = X3D.log.get(logname);
            log.info("initialized");
            X3D.em.subscribe("connected", function(state) {
                statusel.css('background-color', state ? '#00ff00' : '#ff0000');
            });
 
        },
		/*
			This method inserts the possible shaders into 
			the itemList of the dialog. It also automatically creates an onclick 
			on the option thus selecting this option.
		*/
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
		/*
			This method adds the texture Options to the itemList of the diaglog.
			They are taken from generics
		*/
        addTexturesToList: function(itemList){
            var textures = X3D.main.getElementsOfType('texture');
            X3D.util.deleteAllChilds(itemList);
            //var newdiv = document.createElement('div');
            //var olEle = document.createElement('ol');
            //olEle.setAttribute('id','shaders');
            for(var i =0;i<textures.length;i++){
                var ele = this.createOption(textures[i]);
                itemList.appendChild(ele);
            }
        },
		/*
			This method adds the predefined Colors Options to the itemList of the diaglog. 
			They are taken from generics.
		*/
        addColorsToList: function(itemList){
            var colors = X3D.main.getElementsOfType('color');
            X3D.util.deleteAllChilds(itemList);
            //var newdiv = document.createElement('div');
            //var olEle = document.createElement('ol');
            //olEle.setAttribute('id','shaders');
            for(var i =0;i<colors.length;i++){
                var ele = this.createOption(colors[i]);
                itemList.appendChild(ele);
            }
        },
		/*
			This method gets the possible XML3D template Objects 
			and adds the options to the itemsList which are displayed in the
			dialog.
		*/
        addDataToList : function(items){
            var datas = X3D.main.getElementsOfType('group');
            X3D.util.deleteAllChilds(items);
            for(var i =0;i<datas.length;i++){
                var ele = this.createOption(datas[i]);
                items.appendChild(ele);
            }
        },
		/*
			This method creates the change texture dialog
			and then displays it.  It always deletes the current dialog.
		*/
        changeTextureDialog : function(){
            if(X3D.main.elementsAreSelected()){
                var items = document.getElementById('items');
                var content = document.getElementById('dialogContent');
                X3D.util.deleteAllChilds(content);
                X3D.util.deleteAllChilds(items);
                this.addTexturesToList(items);
                var button = document.getElementById('submitButton');
                //var onclicktext = button.getAttribute('onclick');
                //onclicktext.replace('X3D.tb.submitChangeShader();','');
                //onclicktext = 'X3D.tb.submitChangeShader();'+onclicktext;
                button.setAttribute('onclick','X3D.tb.submitChangeShader();');
                X3D.dia.showDialog();
            }
        },
		/*
			This method creates the change color dialog and displays it to the user. 
			The current dialog is deleted.
		*/
        changeColorDialog : function(){
            if(X3D.main.elementsAreSelected()){
                var items = document.getElementById('items');
                var content = document.getElementById('dialogContent');

                X3D.util.deleteAllChilds(content);
                X3D.util.deleteAllChilds(items);

                var label = document.createTextNode("- or -");
                content.appendChild(label);
                this.addColorsToList(items);

                //adding input fields
                var inputField2 = document.createElement('input');
                inputField2.setAttribute('id','inp2');
                inputField2.defaultValue='0.0';
                var inputField3 = document.createElement('input');
                inputField3.setAttribute('id','inp3');
                inputField3.defaultValue='0';
                var inputField4 = document.createElement('input');
                inputField4.setAttribute('id','inp4');
                inputField4.defaultValue='0';
                var inputField5 = document.createElement('input');
                inputField5.setAttribute('id','inp5');
                inputField5.defaultValue='0';
                if(X3D.main.lengthSelectedElems()===1){
                    var shader = X3D.main.findShader(0);
                    var children = shader.getElementsByTagName('*');
                    for(var i=0;i<children.length;i++){
                        if(children[i].getAttribute('name')==='diffuseColor'){
                            var texts = children[i].firstChild.nodeValue.split(' ');
                            inputField3.defaultValue = Math.round(texts[0]*255);
                            inputField4.defaultValue = Math.round(texts[1]*255);
                            inputField5.defaultValue = Math.round(texts[2]*255);
                        }
                        if(children[i].getAttribute('name')==='transparency'){
                            var text= children[i].firstChild.nodeValue;
                            inputField2.defaultValue = text;
                        }
                    }
                }
                var label2 = document.createTextNode('T:');
                var label3 = document.createTextNode('R:');
                var label4 = document.createTextNode('G:');
                var label5 = document.createTextNode('B:');
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
                content.appendChild(brs4);
                content.appendChild(label5);
                content.appendChild(inputField5);
                var button = document.getElementById('submitButton');
                /*button.onclick = function() {
                    X3D.main.submitChangeColor();
                    X3D.dia.hm('box');
                };*/
                button.setAttribute('onclick','X3D.tb.submitChangeColor();');
                X3D.dia.showDialog();
            }
        },
		/*
			This method creates the add new xml3d object dialog.  It 
			deletes the current one.
		*/
        createBoxDialog : function(){
            var content = document.getElementById('dialogContent');
            X3D.util.deleteAllChilds(content);
            var items = document.getElementById('items');
            X3D.util.deleteAllChilds(items);
            this.addDataToList(items);
            var inputField2 = document.createElement('input');
            inputField2.setAttribute('id','inp2');
            inputField2.defaultValue ='0';
            var inputField3 = document.createElement('input');
            inputField3.setAttribute('id','inp3');
            inputField3.defaultValue ='0';
            var inputField4 = document.createElement('input');
            inputField4.setAttribute('id','inp4');
            inputField4.defaultValue ='0';
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
            /*var onclicktext = button.getAttribute('onclick');
            onclicktext.replace('X3D.tb.submitCreateBoxDialog();','');
            onclicktext = 'X3D.tb.submitCreateBoxDialog();'+onclicktext;*/
            button.setAttribute('onclick','X3D.tb.submitCreateBoxDialog();');
            X3D.dia.showDialog();
        },
		/*
			Handels the events from the add new xml3d object dialog.
		*/
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
                    
                    var guid = X3D.gen.getGUID();
                    log.info("Paramter: "+guid+' '+texts[0]+' '+texts[1]+' '+ x+' '+ y+' '+ z);
                    X3D.main.createElementFromGeneric(guid,texts[0],texts[1], x, y, z);
                    X3D.em.publish("data", {
                        actionType: "creation",
                        elementId: guid,
                        groupId: texts[0],
                        genericId: texts[1],
                        translation: x+" "+y+" "+z,
                        rotation: "",
                        scale: ""
                    });
                }
            } else {
                alert('please insert numbers');
            }
            selection = null;
            X3D.dia.hm('box');
        },
		
		/*
			This method handels the events of the change color dialog.
		*/
        submitChangeColor : function(){
            var transparency = document.getElementById('inp2').value;
            var r = document.getElementById('inp3').value;
            var g = document.getElementById('inp4').value;
            var b = document.getElementById('inp5').value;
            if(selection != null){
                log.info('Changing Color by Selection');
                X3D.main.changeColor(selection);
            } else if(X3D.util.isNumeric(transparency) && X3D.util.isNumeric(r) && 
            X3D.util.isNumeric(g) && X3D.util.isNumeric(b)){
                log.info('Changing color by Value');
                X3D.main.changeColorValue(transparency,r,g,b);
            } else {
                alert('please check input');
            }
            selection = null;
            X3D.dia.hm('box');
        },
		/*
			Handels the events of the change texture dialog
		*/
        submitChangeShader : function(){
            X3D.main.changeTexture(selection);
            selection = null;
            X3D.dia.hm('box');
        },
		/*
			This is a utility method allowing the creation of a clickable option.  
			They are displayed in a dialog.  When pressed, their id is stored, so that
			this selection is used for further steps.
		*/	
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
		/*
			Used by the Options to store their id.
		*/
        setSelection : function(element){
            selection = element;
        },
		/*
			Method is used to get the selected options id.
		*/
        getSelection : function(){
            return selection;
        },
		/*Dialog for room creation*/
        createRoomDialog : function(){
            //log.info(12);
            var content = document.getElementById('dialogContent');
            X3D.util.deleteAllChilds(content);
            var items = document.getElementById('items');
            X3D.util.deleteAllChilds(items);
            //this.addDataToList(items);
            var inputField_a = document.createElement('input');
            inputField_a.setAttribute('id','inpa');
            var inputField_b = document.createElement('input');
            inputField_b.setAttribute('id','inpb');
            var inputField_h = document.createElement('input');
            inputField_h.setAttribute('id','inph');
            var label_t = document.createTextNode('Cubic measures');
            var label_a = document.createTextNode('Enter a:');
            var label_b = document.createTextNode('Enter b:');
            var label_h = document.createTextNode('Enter h:');
            var brs = document.createElement('br');
            var brs2 = document.createElement('br');
            var brs3 = document.createElement('br');
            content.appendChild(label_t);
            content.appendChild(brs);
            content.appendChild(label_a);
            content.appendChild(inputField_a);
            content.appendChild(brs2);
            content.appendChild(label_b);
            content.appendChild(inputField_b);
            content.appendChild(brs3);
            content.appendChild(label_h);
            content.appendChild(inputField_h);
            var button = document.getElementById('submitButton');
            //var onclicktext = button.getAttribute('onclick');
            //onclicktext.replace('X3D.tb.submitCreateBoxDialog();','');
            //onclicktext = 'X3D.tb.createRoom();'+onclicktext;
            button.setAttribute('onclick','X3D.tb.createRoom();');
            X3D.dia.showDialog();
        },
		/*Rotation method needed for the room creation*/
        doRotation : function(axis, transformer){
            var xml3dObj = document.getElementById('MyXml3d');
            var v = xml3dObj.createXML3DVec3();
            var Rotation = xml3dObj.createXML3DRotation();
            if(axis == 'x'){
                v.x = 1;
                v.y = 0;
                v.z = 0;
            } else {
                v.x = 0;
                v.y = 1;
                v.z = 0;
            }            
            Rotation.setAxisAngle(v, 1.570796);    
            transformer.rotation = transformer.rotation.multiply(Rotation);
        },
		/*Help methods needed for the default views creation*/
        geta : function(){
			return a;
		},
		getb : function(){
			return b;
		},
		geth : function(){
			return h;
		},
		getId_1 : function(){
			return id_1;
		},
		getId_2 : function(){
			return id_2;
		},
		getId_3 : function(){
			return id_3;
		},
		getId_4 : function(){
			return id_4;
		},
		getId_5 : function(){
			return id_5;
		},
		getStatus_1 : function(){
			return status_1;
		},
		getStatus_2 : function(){
			return status_2;
		},
		getStatus_3 : function(){
			return status_3;
		},
		getStatus_4 : function(){
			return status_4;
		},
		getStatus_5 : function(){
			return status_5;
		},
		setStatus_1 : function(status){
			status_1 = status;
		},
		setStatus_2 : function(status){
			status_2 = status;
		},
		setStatus_3 : function(status){
			status_3 = status;
		},
		setStatus_4 : function(status){
			status_4 = status;
		},
		setStatus_5 : function(status){
			status_5 = status;
		},
		/*scaleWall_f : function(transform){
			transform.scale.x = a;
			transform.scale.y = h;
		},
		scaleRotateWall_g : function(transform){
			//transform.scale.x = a;
			//transform.scale.y = b;
			X3D.tb.doRotation('x', transform);
		},
		scaleRotateWall_s : function(transform){
			transform.scale.x = b;
			transform.scale.y = h;
			X3D.tb.doRotation('y', transform);
		},*/
		//createSingleWall : function(transform)
		updateModeDisplay:function(mode){
			var display=document.getElementById('currentMode');
			display.setAttribute('value',mode);
			
		},
		/*Creates room depending on side a, side b and height h*/
		createRoom : function(){
			a = parseInt(document.getElementById('inpa').value);
            b = parseInt(document.getElementById('inpb').value);
            h = parseInt(document.getElementById('inph').value);
			if( a < 1 || b < 1 || h < 1 || parseInt(a) - a != 0 || parseInt(b) - b != 0 || parseInt(h) - h != 0){
				 //X3D.tb.createRoomDialog();
				 alert("Nur natuerliche Zahlen erlaubt!");
			}else{
				

				id_1 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, -b, h); // vorne
				id_2 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", -a, 0, h);  // links 
				id_3 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, 0, 0); // Boden
				id_4 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", a, 0, h); // rechts
				id_5 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, b, h); // hinten


				
				var transform = document.getElementById(document.getElementById(id_1).getAttribute('transform').substring(1));
				//X3D.tb.scaleRotateWall_g(transform);
				
				transform.scale.x = a;
				transform.scale.y = h;
				X3D.tb.doRotation('x', transform);
					
				transform = document.getElementById(document.getElementById(id_2).getAttribute('transform').substring(1));
				//X3D.tb.scaleRotateWall_g(transform);
				transform.scale.x = h;
				transform.scale.y = b;
				X3D.tb.doRotation('y', transform);
					
			    transform = document.getElementById(document.getElementById(id_3).getAttribute('transform').substring(1));
				//X3D.tb.scaleWall_f(transform);
				transform.scale.x = a;
				transform.scale.y = b;
					
				transform = document.getElementById(document.getElementById(id_4).getAttribute('transform').substring(1));
				//X3D.tb.scaleRotateWall_s(transform);
				transform.scale.x = h;
				transform.scale.y = b;
				X3D.tb.doRotation('y', transform);
					
				transform = document.getElementById(document.getElementById(id_5).getAttribute('transform').substring(1));	
				//X3D.tb.scaleRotateWall_s(transform);
				transform.scale.x = a;
				transform.scale.y = h;
				X3D.tb.doRotation('x', transform);
				
				
				
				/*status_1 = true;
				status_2 = true;
				status_3 = true;
				status_4 = true;
				status_5 = true;*/
				
				//wall.translation.z = 10;
				//log.info(wall);
				 X3D.main.createViewDialog();
				 X3D.dia.hm('box');				 
				 X3D.main.resetXml3D();
			}
		},

        
    };
}();
