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
        addDataToList : function(items){
            var datas = X3D.main.getElementsOfType('group');
            X3D.util.deleteAllChilds(items);
            for(var i =0;i<datas.length;i++){
                var ele = this.createOption(datas[i]);
                items.appendChild(ele);
            }
        },
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
                        rotation: "null",
                        scale: "null"
                    });
                }
            } else {
                alert('please insert numbers');
            }
            selection = null;
            X3D.dia.hm('box');
        },
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
        submitChangeShader : function(){
            X3D.main.changeTexture(selection);
            selection = null;
            X3D.dia.hm('box');
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
        createRoom : function(){
            var a = document.getElementById('inpa').value;
            var b = document.getElementById('inpb').value;
            var h = document.getElementById('inph').value;
            if( a < 1 || b < 1 || h < 1 || parseInt(a) - a != 0 || parseInt(b) - b != 0 || parseInt(h) - h != 0){
                 //X3D.tb.createRoomDialog();
                 alert("Nur natuerliche Zahlen erlaubt!");
            }else{
            
            //console.log('h: ' + h);
            //console.log('a: ' + a);
                if(a <= b){
                    //console.log('t');
                    if(h > 1){
                        var id_1 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, h-a, 0);
                        var id_3 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, h-a, 2*b);
                        var id_4 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 1*a, h-a, 1*b);
                        var id_5 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", -1*a, h-a, 1*b);
                    }
                    //else if(h == 1)
                    else{
                        var id_1 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, 1-a, 0);
                        var id_3 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, 1-a, 2*b);
                        var id_4 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 1*a, 1-a, 1*b);
                        var id_5 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", -1*a, 1-a, 1*b);
                    }
                    var transform = document.getElementById(document.getElementById(id_1).getAttribute('transform').substring(1));
                    transform.scale.x = a;
                    transform.scale.y = h;

                    var id_2 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, -1*a, 1*b);
                    transform = document.getElementById(document.getElementById(id_2).getAttribute('transform').substring(1));
                    transform.scale.x = a;
                    transform.scale.y = b;
                    X3D.tb.doRotation('x', transform);
                    
                    transform = document.getElementById(document.getElementById(id_3).getAttribute('transform').substring(1));
                    transform.scale.x = a;
                    transform.scale.y = h;
                    
                    transform = document.getElementById(document.getElementById(id_4).getAttribute('transform').substring(1));
                    transform.scale.x = b;
                    transform.scale.y = h;
                    X3D.tb.doRotation('y', transform);
                    
                    transform = document.getElementById(document.getElementById(id_5).getAttribute('transform').substring(1));
                    transform.scale.x = b;
                    transform.scale.y = h;
                    X3D.tb.doRotation('y', transform);
                }
                else{
                    if(h > 1){
                        var id_1 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, h-b, 0);
                        X3D.main.on('click',function(){
                        //Look for the elements with the Id example2,example3, example4 and add the class 'boxesOnChange'
                            X3D.main.getById(id_1).selectElement();
                        });
                        var id_3 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, h-b, 2*b);
                        var id_4 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 1*a, h-b, 1*b);
                        var id_5 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", -1*a, h-b, 1*b);
                    }
                    //else if(h == 1)
                    else{
                        var id_1 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, 1-b, 0);
                        var id_3 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, 1-b, 2*b);
                        var id_4 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 1*a, 1-b, 1*b);
                        var id_5 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", -1*a, 1-b, 1*b);
                    }
                    
                    var transform = document.getElementById(document.getElementById(id_1).getAttribute('transform').substring(1));
                    transform.scale.x = a;
                    transform.scale.y = h;

                    var id_2 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, -1*b, b);
                    transform = document.getElementById(document.getElementById(id_2).getAttribute('transform').substring(1));
                    transform.scale.x = a;
                    transform.scale.y = b;
                    X3D.tb.doRotation('x', transform);

                    transform = document.getElementById(document.getElementById(id_3).getAttribute('transform').substring(1));
                    transform.scale.x = a;
                    transform.scale.y = h;

                    transform = document.getElementById(document.getElementById(id_4).getAttribute('transform').substring(1));
                    transform.scale.x = b;
                    transform.scale.y = h;
                    X3D.tb.doRotation('y', transform);

                    transform = document.getElementById(document.getElementById(id_5).getAttribute('transform').substring(1));
                    transform.scale.x = b;
                    transform.scale.y = h;
                    X3D.tb.doRotation('y', transform);
                }
                
                //wall.translation.z = 10;
                //log.info(wall);
                 X3D.dia.hm('box');
				 log.info('dialog closed');
                 X3D.main.resetXml3D();
            }
        },
        
    };
}();
