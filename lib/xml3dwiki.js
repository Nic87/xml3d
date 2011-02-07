var X3D = X3D ? X3D : new Object();
X3D.main = function() {
    var that = this;
    var elems = [];
    var mode =  'plane';
    var planeModus = 'plane';
    var roomModus = 'room';
    //Array to save all the elements found by the functions getById, getByC
    var selectedElems = [];
    var removeRoute = function(textValue){
        var transformerId = textValue.substring(1,textValue.length);
        return transformerId;
    }
    var log, logname = "lib/xml3dwiki.js";
    
    return {        
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
        getMode : function(){
            return mode;
        },
        toggleMode : function(){
            if(mode===planeModus)mode=roomModus; 
            else mode = planeModus;
            X3D.em.publish("toggleMode", mode);
            log.info('You are now in the '+mode+' mode.');
        },
        getElementsOfType:function(type){
            var shaders = document.getElementsByTagNameNS('http://www.xml3d.org/2009/xml3d',type);
            return shaders;
        },

        //Add a new class to the elements
        //This does not delete the all class, it just add a new one
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
                        elems[i].attachEvent('on'+action,callback);//Adding the event to Internet Explorer :(
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
        createElement:function(id, x, y, z, data){
            var box = document.createElementNS('http://www.xml3d.org/2009/xml3d','group');
            box.setAttribute('id',id);
            box.setAttribute('shader','#blueShader');
            var transformerName = 'posTransformer'+id;
            this.createTransformerAtPos(transformerName,x,y,z);
            box.setAttribute('transform','#'+transformerName);
            var newmesh = document.createElementNS('http://www.xml3d.org/2009/xml3d','mesh');
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
        testPositionTransformer:function(element){
                var transform = element.getAttribute('transform');
                var elemId = element.getAttribute('id');
                var transformerName = 'posTransformer'+elemId;
                if(transform === '#'+transformerName){
                
                } else if(transform != null && transform.length>0){
                    this.copyTransformer(transformerName,removeRoute(transform));
                    element.setAttribute('transform','#'+transformerName);
                    this.resetXml3D();
                } else{
                    this.createTransformer('posTransformer'+elemId);
                    element.setAttribute('transform','#'+transformerName);
                    this.resetXml3D();
                }
                return transformerName;
        },
        contains:function(sarray, ele){
            for(var i = 0;i<sarray.length;i++){
                if(sarray[i]===ele)return true;
            }
            return false;
        },
        indexOfEle:function(sarray,ele){
            for(var i = 0;i<sarray.length;i++){
                if(sarray[i]===ele){
                return i;
                }
            }
            return -1;
        },
        changeShader:function(shaderID){
                    log.info('Changing Shader of selected Elements');
                    for(var i = 0;i<selectedElems.length;i++){
                    selectedElems[i].setAttribute('oldShader','#'+shaderID);
                    log.info('Changing Shader of;'+selectedElems[i].getAttribute('id')+' with shader: '+shaderID);
                }
                this.resetXml3D();
        },

        elementsAreSelected : function(){
                if(selectedElems.length>0)return true;
                    else return false;
            }, 
        selectElement:function(){
            for(var i = 0;i<elems.length;i++){
                var element = elems[i];
                if(this.contains(selectedElems,element)){
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
        //Show and Hide the elements found
        resetXml3D:function(){
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
            if(selectedElems.length===0){
                
            } else{
                var keyNumber = parseInt(key);
                if(key < 41 && key >36){
                    X3D.main.moveSelectedObject(keyNumber);

                    // return false to prevent this event from bubbling further up
                    return false;
                }
            }
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
                        transformer.translation.x -= 0.1;
                        break;
                    }
                    case 38:{
                        if(mode===planeModus)transformer.translation.y += 0.1;
                        else if (mode===roomModus)transformer.translation.z += 0.1;
                        break;
                    }
                    case 39:{
                        transformer.translation.x += 0.1;
                        break;
                    }
                    case 40:{
                        if(mode===planeModus)transformer.translation.y -= 0.1;
                        else if (mode===roomModus)transformer.translation.z -= 0.1;
                        break;
                    }
                }
                
            }
            this.resetXml3D();
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
            var transformer = document.createElementNS('http://www.xml3d.org/2009/xml3d','transform');
            transformer.setAttribute('id',name);
            transformer.setAttribute('translation',x+' '+y+' '+z);
            document.getElementById('3dDefs').appendChild(transformer);
            this.resetXml3D();                
            log.info('Transformer Created: '+document.getElementById(name).getAttribute('id'));
            }
        },
        copyTransformer:function(newTransformer,oldTransformer){
            var oldNode = document.getElementById(oldTransformer);
            var transformer = document.createElementNS('http://www.xml3d.org/2009/xml3d','transform');
            transformer.setAttribute('translation',oldNode.getAttribute('translation'));
            transformer.setAttribute('id',newTransformer);
            document.getElementById('3dDefs').appendChild(transformer);
            this.resetXml3D();                
            log.info('Transformer copied: '+document.getElementById(newTransformer).getAttribute('id'));
        },
		addSelectListener:function(element){
			this.getById(element.getAttribute('id')).on('click',function(){
                        //Look for the elements with the Id example2,example3, example4 and add the class 'boxesOnChange'
                        this.getById(element.getAttribute('id')).selectElement();
                    });
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
                else{document.addEventListener("keypress",X3D.main.capturekey,true);}
                
                X3D.main.getById('box1');
                X3D.main.on('click',function(){
                        //Look for the elements with the Id example2,example3, example4 and add the class 'boxesOnChange'
                        X3D.main.getById('box1').selectElement();
                    });
                X3D.main.getById('box2');
                X3D.main.on('click',function(){
                        //Look for the elements with the Id example2,example3, example4 and add the class 'boxesOnChange'
                        X3D.main.getById('box2').selectElement();
                    });
                log.info("Main Javascript has now been initialized");
                
        }
                    
    }
        

}();
