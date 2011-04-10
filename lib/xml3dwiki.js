var X3D = X3D ? X3D : new Object();
X3D.main = function() {
    var that = this;
    var elems = [];
    var mode =  'plane';
    var planeModus = 'plane';
    var rotateModus = 'rotate';
    var roomModus = 'room';
    var rotateRoomModus = 'rotateRoom';
    var allModes=[];
    var modeIndex =0;
    var pos = 0; // Aktuelle Position von Lukas
    //Array to save all the elements found by the functions getById, getByC
    var selectedElems = [];
    var removeRoute = function(textValue){
        var transformerId = textValue.substring(1,textValue.length);
        return transformerId;
    }
    var log, logname = "lib/xml3dwiki.js";
    var xRotate,yRotate,zRotate;
    const NS_XML3D = 'http://www.xml3d.org/2009/xml3d';
    const transformerPrefix = 'transe:';
    const shaderPrefix = 'shader:';
    return {
		getShaderPrefix:function(){
			return shaderPrefix;
		},
		getTransformerPrefix : function(){
			return transformerPrefix;
		},
		init: function() {
                log = X3D.log.get(logname);
                var scene = document.getElementById("MyXml3d");
                if(scene && scene.setOptionValue) {
                    scene.setOptionValue("accumulatepixels", true);
                    scene.setOptionValue("oversampling", 1);
                }
                        //Look for the element with the Id myButtonBox and attach an onclick element
                if(navigator.appName!= "Mozilla"){document.onkeydown=X3D.main.capturekey}
                else{document.addEventListener("keypress",X3D.main.capturekey, false); }

                log.info("Main Javascript has now been initialized");
                X3D.main.initRotates();
                X3D.main.initModes();
        },
        initModes : function(){
            allModes.push(planeModus);
            allModes.push(roomModus);
            allModes.push(rotateModus);
            //allModes.push(rotateRoomModus);
        },
        //Get all elements by Idt gen    
        //It could take more than one parameter
        getById:function(){
            var tempElems = []; //temp Array to save the elements found
            for(var i = 0;i<arguments.length;i++){
                if(typeof arguments[i] === 'string'){ //Verify if the parameter is an string
                    tempElems.push(document.getElementById(arguments[i])); //Add the element to tempElems
                }
            }
            elems = tempElems; //All the elements are copied to the property named elems
            return this; //Return this in order to chain
        },
        initRotates : function(){
            var root = document.getElementById('MyXml3d');
            var rect = root.createXML3DVec3();
            rect.x=0;
            rect.y=0;
            rect.z=1;
            zRotate = root.createXML3DRotation();
            zRotate.setAxisAngle(rect,0.785); // In Radian ungefaehr 45 Grad
            rect.z=0;
            rect.x=1;
            xRotate=root.createXML3DRotation();
            xRotate.setAxisAngle(rect,0.785);
            rect.x=0;
            rect.y=1;
            yRotate=root.createXML3DRotation();
            yRotate.setAxisAngle(rect,0.785);
        },
        getMode : function(){
            return mode;
        },
        toggleMode : function(){
            if(modeIndex>=allModes.length-1){
                modeIndex=0;
                mode = allModes[0];
            } else {
                modeIndex+=1;
                mode = allModes[modeIndex];
            }
            X3D.em.publish("toggleMode", mode);
            log.info('You are now in the '+mode+' mode.');
        },
        /*createRoomDialog : function(){
            //log.info(12);
            var content = document.getElementById('dialogContent');
            X3D.util.deleteAllChilds(content);
            var items = document.getElementById('items');
            X3D.util.deleteAllChilds(items);
            this.addDataToList(items);
            var inputField_a = document.createElement('input');
            inputField2.setAttribute('id','inpa');
            var inputField_b = document.createElement('input');
            inputField2.setAttribute('id','inpb');
            var inputField_h = document.createElement('input');
            inputField2.setAttribute('id','inph');
            var label_t = document.createTextNode('Cubic measures');
            var label_a = document.createTextNode('Enter a:');
            var label_b = document.createTextNode('Enter b:');
            var label_h = document.createTextNode('Enter height:');
            var brs = document.createElement('br');
            var brs2 = document.createElement('br');
            var brs3 = document.createElement('br');
            content.appendChild(brs);
            content.appendChild(label_t);
            content.appendChild(label_a);
            content.appendChild(inputField_a);
            content.appendChild(brs2);
            content.appendChild(label_b);
            content.appendChild(inputField_b);
            content.appendChild(brs3);
            content.appendChild(label_h);
            content.appendChild(inputField_h);
            var button = document.getElementById('submitButton');
            var onclicktext = button.getAttribute('onclick');
            //onclicktext.replace('X3D.tb.submitCreateBoxDialog();','');
            onclicktext = 'X3D.main.createRoom();'+onclicktext;
            button.setAttribute('onclick',onclicktext);
            X3D.dia.getDialog();
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

            var id_1 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, 0, 0);
            var id_2 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, -1, 1);
            X3D.main.doRotation('x', document.getElementById(document.getElementById(id_2).getAttribute('transform').substring(1)));
            var id_3 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 0, 0, 2);
            var id_4 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", 1, 0, 1);
            X3D.main.doRotation('y', document.getElementById(document.getElementById(id_4).getAttribute('transform').substring(1)));
            var id_5 = X3D.main.createElementFromGeneric(X3D.gen.getGUID(),"default","Wand", -1, 0, 1);
            X3D.main.doRotation('y', document.getElementById(document.getElementById(id_5).getAttribute('transform').substring(1)));
            
            
            //wall.translation.z = 10;
            //log.info(wall);
            
            this.resetXml3D();
        },*/
        showPosition : function(tmp){
            console.log('Position x: ' + tmp.position.x);
            console.log('Position y: ' + tmp.position.y);
            console.log('Position z: ' + tmp.position.z);
        },
        createViewDialog : function(){            
            var tmp = document.getElementById('defaultView');
            var xml3dObj = document.getElementById('MyXml3d');
            //X3D.main.showPosition(tmp);
            var v = xml3dObj.createXML3DVec3();
            var Rotation = xml3dObj.createXML3DRotation();
            if(pos == 0){
                xml3dObj.setAttribute('activeView', '#defaultView_2');
                console.log(0);    
                pos = 1;
            }
            else if(pos == 1){
                console.log(1);    
                xml3dObj.setAttribute('activeView', '#defaultView');
                pos = 0;
            }
            // Sicht von oben
            /*if(pos == 0){
                v.x = 1;
                v.y = 0;
                v.z = 0;
                Rotation.setAxisAngle(v, -1.570796);
                tmp.orientation = tmp.orientation.multiply(Rotation);
                
                pos = 1;
                
                tmp.position.x += 0;
                tmp.position.y += 20; 
                tmp.position.z += -23;
            }
            // Sicht von der Seite
            else if(pos == 1){
                pos = 2;
                                
                v.x = 1;
                v.y = 0;
                v.z = 0;
                
                Rotation.setAxisAngle(v, 1.570796);
                tmp.orientation = tmp.orientation.multiply(Rotation);
                
                tmp.position.x += 0;
                tmp.position.y += -20; 
                tmp.position.z += 23;
                
                v.x = 0;
                v.y = 1;
                v.z = 0;
                
                Rotation.setAxisAngle(v, 0.785398);
                tmp.orientation = tmp.orientation.multiply(Rotation);    
                
                tmp.position.x += 15;
                tmp.position.y += 0; 
                tmp.position.z += -10;
            }
            // Standard Sicht
            else if(pos == 2){
                pos = 0;
                                
                v.x = 0;
                v.y = 1;
                v.z = 0;
                
                Rotation.setAxisAngle(v, -0.785398);
                tmp.orientation = tmp.orientation.multiply(Rotation);
                
                tmp.position.x += -15;
                tmp.position.y += 0; 
                tmp.position.z += 10;
            }*/

            this.resetXml3D();
        },
        getElementsOfType:function(type){
            return this.getElementsOfTypeGeneric(type);
        },
        getElementsOfTypeGeneric:function(type){
            return X3D.gen.getElementsOfType(type);
        },
        //Add a new class to the elements
        //This does not delete the old class, it just add a new one
        addClass:function(name){
            for(var i = 0;i<elems.length;i++){
                        elems[i].className += ' ' + name; //Here is where we add the new class
                    }
                    return this; //Return this in order to chain
        },
            
                
        //Add an Event to the elements found by the methods: getById and getByClass
        //--Action is the event type like 'click','mouseover','mouseout',etc
        //--Callback is the function to run when the event is triggered
         on: function(action, callback){
           if(elems[0].addEventListener){
                for(var i = 0;i<elems.length;i++){
                    elems[i].addEventListener(action,callback,false);//Adding the event by the W3C for Firefox, Safari, Opera...   
                }
            }
           else if(elems[0].attachEvent){
                    for(var i = 0;i<elems.length;i++){
                        elems[i].attachEvent('on'+action,callback);//Adding the event to Internet Exploder :(
                    }
            }
            return this;//Return this in order to chain
        },
                
        //Append Text into the elements
        //Text is the string to insert
        appendText:function(text){
            text = document.createTextNode(text); //Create a new Text Node with the string supplied
            for(var i = 0;i<elems.length;i++){
            elems[i].appendChild(text);//Append the text into the element
            }
            return this;//Return this in order to chain
        },
        moveMesh:function(id){
             var transform = document.getElementById(id);
             transform.translation.x += 0.1;
             this.resetXml3D();
             return this;
         },
        createElement:function(x, y, z, data){
            var box = document.createElementNS(NS_XML3D,'group');

            // find free id
            var id;
            do {
                id = (int)(Math.rand()*10000);
            } while (document.getElementById("box"+id));
            
            box.setAttribute('id',"box"+id);
            box.setAttribute('shader','#blueShader');
            var transformerName = transformerPrefix+id;
            this.createTransformerAtPos(transformerName,x,y,z);
            box.setAttribute('transform','#'+transformerName);
            var newmesh = document.createElementNS(NS_XML3D,'mesh');
            newmesh.setAttribute('type','triangles');
            newmesh.setAttribute('src','#'+data);
            box.appendChild(newmesh);
            document.getElementById('MyXml3d').appendChild(box);
            this.getById(id).on('click',function(){
                        //Look for the elements with the Id example2,example3, example4 and add the class 'boxesOnChange'
                        X3D.main.getById(id).selectElement();
                    });
            this.resetXml3D();
            log.info("A new object with the id: "+id+" was created");
            return this;
        },
        createElementFromGeneric:function(name, prefix, genericID, x, y, z){
            log.info('Prefix:'+prefix+':genericID:'+genericID+' X:'+x+' y:'+y+' z: '+z);
            var newElement = X3D.gen.insertGenericGroup(name, prefix, genericID);
            var newTransformerID=this.testPositionTransformer(newElement);
            var transformer = document.getElementById(newTransformerID);
            var newShaderID=this.testShader(newElement);
            var Shader = document.getElementById(newShaderID);
            log.info('Test Shader complete: '+newShaderID);
            log.info('Adjusting Translation');
            this.changeTransformerTranslationX(transformer,x);
            this.changeTransformerTranslationY(transformer,y);
            this.changeTransformerTranslationZ(transformer,z); /* !%&/$ ... */
            return newElement.id;
        },
        /* Deletes a selected element.
         * TODO: also delete shader, transformer, etc. if unused */
        deleteElement: function() {
            for(var i = 0;i<selectedElems.length;i++) {
                X3D.em.publish("data", {
                    actionType: "delete", 
                    elementId: selectedElems[i].getAttribute("id")
                });
                selectedElems[i].parentNode.removeChild(selectedElems[i]);
            }
            selectedElems = [];
        },
        
        /* TODO: deletes a selected element with all its relations / dependencies */
        killElementWithFamily: function(elementId) {
            var element = document.getElementById(elementId);
            element.parentNode.removeChild(element);
        },
        
        /* checks if a given transformer exists and creates a new one if not */
        testPositionTransformer:function(element){
                log.info("element: "+element);
                var transform = element.getAttribute('transform');
                var elemId = element.getAttribute('id');
                var transformerName = transformerPrefix+elemId;
                if(transform === '#'+transformerName){    
                
                } else if(transform != null && transform.length>0){
                    log.info('Copying Transformer');
                    this.copyTransformer(transformerName,removeRoute(transform));
                    element.setAttribute('transform','#'+transformerName);
                    this.resetXml3D();
                } else{
                    log.info('Creating Transformer');
                    this.createTransformer(transformerName);
                    element.setAttribute('transform','#'+transformerName);
                    this.resetXml3D();
                }
                return transformerName;
        },

        testShader:function(element){
            log.info("element: "+element);
            var shader = element.getAttribute('shader');
            var oldShader = element.getAttribute('oldShader');
            var elemId = element.getAttribute('id');
            var shaderName = shaderPrefix+elemId;
            if(shader === '#'+shaderName){    
            
            } else if(oldShader === '#'+shaderName){
            
            } else if(oldShader != null && shader.length>0){
                log.info('Copying Old Shader');
                this.copyShader(shaderName,removeRoute(oldShader));
                element.setAttribute('oldShader','#'+shaderName);
                this.resetXml3D();
            } else if(shader != null && shader.length>0){
                log.info('Copying Shader');
                this.copyShader(shaderName,removeRoute(shader));
                element.setAttribute('shader','#'+shaderName);
                this.resetXml3D();
            } else{
                log.info('Creating Shader');
                this.createShader(shaderName);
                element.setAttribute('shader','#'+shaderName);
                this.resetXml3D();
            }
            return shaderName;
        },

        /* returns true if sarray contains ele, false otherwise */
        contains: function (sarray, ele){
            for (var i = 0; i < sarray.length; i++){
                if(sarray[i] === ele) return true;
            }
            return false;
        },
        
        /* returns the index of ele within sarray, -1 otherwise */
        indexOfEle: function (sarray, ele){
            for (var i = 0; i < sarray.length; i++){
                if(sarray[i] === ele) return i;
            }
            return -1;
        },

        changeShader2:function(eleID,fieldname,value){
            log.info(this.testShader(document.getElementById(eleID))+' id: '+shaderPrefix+eleID);
            var shader = document.getElementById(shaderPrefix+eleID);
            log.debug('Shader: '+shader.getAttribute('id'));

            /* shader example:
             *
             * <shader id="Material.001" script="urn:xml3d:shader:phong">
             *   <float name="ambientIntensity">0.0</float>
             *   <float3 name="diffuseColor">1.000000 1.000000 0.800000</float3>
             *   <float3 name="specularColor">0.500000 0.500000 0.500000</float3>
             *   <float name="shininess">0.0978473581213</float>
             * </shader>
             */

            /* the synchronisation does not quite work yet, because our JSON
             * data format does not support adding such nodes: we do not have
             * the possibility to set the "name" attribute when updating using
             * mode 2 (which is, updating child nodes). this needs to be fixed!
             *
             * fixing it might turn out to be quite easy by adding another
             * field, but we might also go for another JSON format (I would
             * rather opt for that.)
             *
             * also, we might need another message type like "updateOrCreate",
             * since i am not sure whether all clients will have the required
             * data nodes that will be updated.
             *
             * --simon
             */
            switch(fieldname){
                case 'diffuseColor':
                case 'specularColor':
                case 'emissionColor':
                case 'ambientColor':
                case 'reflectionColor':
                this.addFieldShader(shader,fieldname,'float3',value);
                X3D.em.publish("data", {
                    actionType: "update",
                    isAttribute: false,
                    elementId: eleId,
                    fieldName: "float3",
                    value: value
                });
                break;
                case 'ambientIntensity':
                case 'shininess':
                case 'transparency':
                this.addFieldShader(shader,fieldname,'float',value);
                X3D.em.publish("data", {
                    actionType: "update",
                    isAttribute: false,
                    elementId: eleId,
                    fieldName: "float",
                    value: value
                });
                break;
                case 'texture':
                this.addNewTexture(shader,value);
                X3D.em.publish("data", {
                    actionType: "update",
                    isAttribute: false,
                    elementId: eleId,
                    fieldName: fieldname,
                    value: value
                });
                break;
                case 'castShadow':
                this.addFieldShader(shader,fieldname,'int',value);
                X3D.em.publish("data", {
                    actionType: "update",
                    isAttribute: false,
                    elementId: eleId,
                    fieldName: fieldname,
                    value: value
                });
                break
            }
        },
        addFieldShader:function(shader,fieldname,fieldtype,value){
            log.debug('adding folowing to shade'+shader.getAttribute('id')+' fieldname: '+fieldname+' fieldtype: '+fieldtype+' value: '+value);
            var field = document.createElementNS(NS_XML3D,fieldtype);
            field.setAttribute('name',fieldname);
            var textNode = document.createTextNode(value);
            field.appendChild(textNode);
            var elements = shader.getElementsByTagName(fieldtype);
            for(var i =0;i<elements.length;i++){
                if(elements[i].getAttribute('name')===fieldname){
                    shader.removeChild(elements[i]);
                    break;
                } 
            }
            shader.appendChild(field);
        },
        addNewTexture:function(shader,value){
            var texture =shader.getElementsByTagName('texture');
            log.info('Length: '+texture.length);
            var text = value.split(':');
            var origTexture = X3D.gen.searchElement(text[0],text[1]);
            var newTexture = X3D.gen.copyElement(origTexture);
            newTexture.removeAttribute('id');
            
            for(var i =0;i<texture.length;i++){
                shader.removeChild(texture[i]);
            }
            shader.appendChild(newTexture);
            this.resetXml3D();
        },
        changeTexture:function(textureID){
            for(var i = 0;i<selectedElems.length;i++){
                this.changeShader2(selectedElems[i].getAttribute('id'),'texture',textureID);
                log.info('Changing Textire of:'+selectedElems[i].getAttribute('id')+' Texture: '+textureID);
            }
        },
        changeColorValue:function(transparency,r,g,b){
            for(var i = 0;i<selectedElems.length;i++){
                log.info('Changing color by value of '+selectedElems[i].getAttribute('id'));
                this.changeShader2(selectedElems[i].getAttribute('id'),'transparency', transparency);
                this.changeShader2(selectedElems[i].getAttribute('id'),'diffuseColor', X3D.util.convertRgbToFloat(r,g,b));
            }
        },
        changeColor:function(colorId){    
            var text = colorId.split(':');
            var origElem = X3D.gen.searchElement(text[0],text[1]);
            var colorElem = X3D.gen.copyElement(origElem);
            log.info('ColorElem: '+colorElem+ ' NodeType: '+colorElem.nodeTyoe);
            for(var i = 0;i<selectedElems.length;i++){
                var children = colorElem.getElementsByTagName('*');
                for(var j =0;j<children.length;j++){
                    log.info('node: '+children[j].tagName+' nodeType: '+children[j].nodeType);
                    if(children[j].nodeType === 1){
                        log.info(children[j].getAttribute('name'));
                        this.changeShader2(selectedElems[i].getAttribute('id'),children[j].getAttribute('name'),children[j].firstChild.nodeValue);
                    }
                }
            }
        },
        elementsAreSelected : function(){
            if(selectedElems.length>0)return true;
                else return false;
        },
        lengthSelectedElems : function(){
            return selectedElems.length;
        },
        findShader:function(pos){
            if(pos<selectedElems.length){
                var shaderId = shaderPrefix+selectedElems[pos].getAttribute('id');
                return document.getElementById(shaderId);
            }
        },
        
        /* changes the shader of the selected elements to the given one */
        changeShader: function (shaderID){
            log.info('Changing Shader of selected Elements');
            var texts = shaderID.split(':');
            var shader = document.getElementById(texts[0]+texts[1]);
            if(!shader) {
                X3D.gen.importGenericDependant(texts[0],texts[1]);
                shader = document.getElementById(texts[0]+texts[1]);
            } else {
                for(var i = 0;i<selectedElems.length;i++){
                    selectedElems[i].setAttribute('oldShader','#'+texts[0]+texts[1]);
                    log.debug('Changing Shader of;'+selectedElems[i].getAttribute('id')+' with shader: '+texts[0]+texts[1]);
                }
            }
            this.resetXml3D();
        },

        /* returns true if elements are selected, false otherwise */
        elementsAreSelected : function(){
            return (selectedElems.length > 0);
        },
        
        /* highlights selected elements with a red shader or restores the old one */
        selectElement: function(){
            for (var i = 0; i < elems.length; i++){
                var element = elems[i];
                if(this.contains(selectedElems, element)){
                    var elemAttr = element.getAttribute('oldShader');
                    element.setAttribute('shader',elemAttr);
                    element.removeAttribute('oldShader');
                    selectedElems.splice(this.indexOfEle(selectedElems,element),1);
                    this.resetXml3D();
                } else {
                    var redShader = '#redShader'
                    var elemAttr = element.getAttribute('shader');
                    element.setAttribute('shader',redShader);
                    element.setAttribute('oldShader',elemAttr);
                    selectedElems.push(element);
                    this.resetXml3D();
                }
            }
            return this;
        },
        
        /* creates temporary elements to visualize the position of lights */
        toggleLights: function() {
            var lights = document.getElementsByTagName("light");
            log.debug("found lightshader: "+lights.length);
            for (var i = 0; i < lights.length; i++) {
                var l = lights[i];
                var t = l.parentNode.getAttribute("transform").substr(1); // seriously, wtf
                log.debug("light "+i+" has transformer "+t);
                var v = l.getAttribute("visualizer");
                if (v) log.debug("light is visualized");
                var p = this.getTransformerPosition(t);
                log.debug("translation of light: "+p);
                p = p.split(" "); // or t.translation.{x,y,z}
                log.debug("position "+p[0]+", "+p[1]+", "+p[2]);
                if (v == null) {
                    var v = X3D.main.createElementFromGeneric("default", "Quadrat", p[0], p[1], p[2]);
                    l.setAttribute("visualizer", v);
                } else {
                    // TODO: Also delete transformer
                    var n = document.getElementById(v);
                    n.parentNode.removeChild(n);
                    l.removeAttribute("visualizer");
                }
            }
        },
        
        getTransformerPosition: function(transf) {
            var t = document.getElementById(transf);
            log.debug("trans "+t);
            if (!t) return null;
            else return t.getAttribute("translation");
        },
        
        //Show and Hide the elements found
        resetXml3D: function(){
            var xml3dobj = document.getElementById('MyXml3d');
            xml3dobj.update();
        },
        toggleHide:function(){
            for(var i = 0;i<elems.length;i++){
            elems[i].style['display'] = (elems[i].style['display']==='none' || '') ?'block':'none'; //Check the status of the element to know if it could be displayed or hided
            
            }
            return this;//Return this in order to chain
        },
        capturekey:function(e){
            var key=(typeof event!='undefined')?window.event.keyCode:e.keyCode;
            if(key == 81){
                if(mode == rotateRoomModus)
                    mode = allModes[modeIndex];
                else 
                    mode = rotateRoomModus;
                log.info('Mode: '+mode);
            }
            
            if(selectedElems.length===0){
                
            } else{
                var keyNumber = parseInt(key);
                if(key < 41 && key >36){
                    X3D.main.moveSelectedObject(keyNumber);
                    return false;
                    // return false to prevent this event from bubbling further up

                } else if (key == 46) {
                    X3D.main.deleteElement();
                    return false;
                }
            }
            X3D.listener.handleKeyEvent(e);
            console.log(X3D.listener.getStatus());
            
        },
        moveSelectedObject:function(keyNumber){
            for(var i = 0;i<selectedElems.length;i++){
                this.testPositionTransformer(selectedElems[i]);
                var element = selectedElems[i];
                var transformerIdRaw = element.getAttribute('transform').toString();
                var transformerId = transformerIdRaw.substring(1,transformerIdRaw.length);
                var transformer = document.getElementById(transformerId);
                switch(parseInt(keyNumber)){
                    case 37:{
                        //transformer.translation.x -= 0.1;
                        if(mode===planeModus||mode===planeModus)this.changeTransformerTranslationX(transformer,-0.1);
                        else this.rotateY(transformer,1.57);
                        break;
                    }
                    case 38:{
                        if(mode===planeModus)this.changeTransformerTranslationY(transformer,0.1);//transformer.translation.y += 0.1;
                        else if (mode===roomModus)this.changeTransformerTranslationZ(transformer,0.1);//transformer.translation.z += 0.1;
                        else this.rotateX(transformer,1.57);
                        break;
                    }
                    case 39:{
                        //transformer.translation.x += 0.1;
                        if(mode===planeModus||mode===planeModus)this.changeTransformerTranslationX(transformer,0.1);
                        else this.rotateY(transformer,1.57);
                        break;
                    }
                    case 40:{
                        if(mode===planeModus)this.changeTransformerTranslationY(transformer,-0.1);//transformer.translation.y -= 0.1;
                        else if (mode===roomModus)this.changeTransformerTranslationZ(transformer,-0.1);//transformer.translation.z -= 0.1;
                        else this.rotateX(transformer,1.57);
                        break;
                    }
                }
                
            }
            this.resetXml3D();
        },
        changeTransformerTranslationX:function(transformer,value){
            transformer.translation.x +=value;
            
        },
        changeTransformerTranslationY:function(transformer,value){
            transformer.translation.y +=value;
        },
        changeTransformerTranslationZ:function(transformer,value){
            transformer.translation.z +=value;
        },
        rotateZ : function(transformer,radian){
            transformer.rotation = transformer.rotation.multiply(zRotate);
        },
        rotateX : function(transformer,radian){
            transformer.rotation = transformer.rotation.multiply(xRotate);
        },
        rotateY : function(transformer,radian){
            transformer.rotation = transformer.rotation.multiply(yRotate);
        },
        createShader:function(name){
            if(document.getElementById(name)){
            } else {
                var shader = document.createElementNS(NS_XML3D,'shader');
                shader.setAttribute('id',name);
                shader.setAttribute('script','urn:xml3d:shader:phong');
                var floatEle = document.createElementNS(NS_XML3D,'float3');
                floatEle.setAttribute('name','diffuseColor');
                var floatText = document.createTextNode("0.0 0.0 1.0");
                floatEle.appendChild(floatText);
                var floatEle2 = document.createElementNS(NS_XML3D,'float');
                floatText = document.createTextNode("1.0");
                floatEle2.setAttribute('name','ambientIntensity');
                floatEle2.appendChild(floatText);
                shader.appendChild(floatEle);
                shader.appendChild(floatEle2);
                this.resetXml3D();
                log.info('Shader Created: '+document.getElementById(name).getAttribute('id'));
            }
        },
        createTransformer:function(name){
            if(document.getElementById(name)){
            } else {
                this.createTransformerAtPos(name, 0,0,0);
            }
        },
        createTransformerAtPos:function(name, x, y, z){
            if(document.getElementById(name)){
            } else {
                var transformer = document.createElementNS(NS_XML3D,'transform');
                transformer.setAttribute('id',name);
                transformer.setAttribute('translation',x+' '+y+' '+z);
                transformer.setAttribute('scale',1+' '+1+' '+1);
                transformer.setAttribute('rotation',0+' '+0+' '+0+' '+0);
                document.getElementById('3dDefs').appendChild(transformer);
                this.resetXml3D();                
                log.info('Transformer Created: '+document.getElementById(name).getAttribute('id'));
            }
        },
        copyTransformer:function(newTransformer,oldTransformer){
            oldTransformer = document.getElementById(oldTransformer);
            var transformer = X3D.gen.copyElement(oldTransformer);
            transformer.setAttribute('id',newTransformer);
            document.getElementById('3dDefs').appendChild(transformer);
            return transformer;
        },
        copyShader:function(newShader,oldShader){
            oldShader = document.getElementById(oldShader);
            var shader = X3D.gen.copyElement(oldShader);
            shader.setAttribute('id',newShader);
            document.getElementById('3dDefs').appendChild(shader);
            return shader;
        },
        addSelectListener:function(element){
            log.info('Adding listener to '+element.getAttribute('id'));
            this.getById(element.getAttribute('id')).on('click',function(){
                        //Look for the elements with the Id example2,example3, example4 and add the class 'boxesOnChange'
                        X3D.main.getById(element.getAttribute('id')).selectElement();
                    });
        }
        
    }
        

}();
